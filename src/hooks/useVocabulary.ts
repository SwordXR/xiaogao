import React, { useEffect, useState } from 'react';
import { WordItem } from '../types';
import { initialWords } from '../data';

export function useVocabulary() {
  const loadInitialState = () => {
    const saved = localStorage.getItem('ielts-words');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const sanitizeWord = (w: string) => w.replace(/\d+$/, '');
        const sanitizedWords = parsed.map((w: WordItem) => ({...w, word: sanitizeWord(w.word)}));
        const parsedIds = new Set(sanitizedWords.map((w: WordItem) => w.id));
        const missingInitialWords = initialWords.filter(w => !parsedIds.has(w.id));
        return [...sanitizedWords, ...missingInitialWords];
      } catch (e) {
        return initialWords;
      }
    }
    return initialWords;
  };

  const [words, setWordsState] = useState<WordItem[]>(loadInitialState);

  const syncVocabulary = async () => {
    try {
      const res = await fetch('/words.json');
      const data: WordItem[] = await res.json();
      
      setWordsState(prev => {
        const allSourceWords = [...initialWords, ...data];
        const sourceMap = new Map(allSourceWords.map(w => [w.id, w]));
        const currentIds = new Set(prev.map(w => w.id));

        // 1. Update text fields for existing words
        let hasUpdates = false;
        const updatedWords = prev.map(w => {
          const sourceWord = sourceMap.get(w.id);
          if (sourceWord) {
            // Check if any syncable field has changed
            const isDifferent = 
              w.word !== sourceWord.word ||
              w.phonetic !== sourceWord.phonetic ||
              w.translation !== sourceWord.translation ||
              w.definition !== sourceWord.definition ||
              w.example !== sourceWord.example;

            if (isDifferent) {
              hasUpdates = true;
              return {
                ...w,
                word: sourceWord.word,
                phonetic: sourceWord.phonetic,
                partOfSpeech: sourceWord.partOfSpeech,
                definition: sourceWord.definition,
                definitionTranslation: sourceWord.definitionTranslation,
                translation: sourceWord.translation,
                example: sourceWord.example,
                exampleTranslation: sourceWord.exampleTranslation,
                morphology: sourceWord.morphology,
                morphologyTranslation: sourceWord.morphologyTranslation,
              };
            }
          }
          return w;
        });

        // 2. Append new words found in sources
        const newWords = allSourceWords.filter(w => !currentIds.has(w.id)).map(w => ({
          ...w,
          nextReview: Date.now()
        }));

        if (newWords.length > 0 || hasUpdates) {
            return [...updatedWords, ...newWords];
        }
        
        return prev;
      });
    } catch (err) {
      // silently fail if words.json is unavailable
    }
  };

  useEffect(() => {
    localStorage.setItem('ielts-words', JSON.stringify(words));
  }, [words]);

  useEffect(() => {
    syncVocabulary();
  }, []);

  const resetVocabulary = () => {
    syncVocabulary();
  };

  const addWord = (newWord: Partial<WordItem>) => {
    setWordsState(prev => {
      // Check if word already exists to avoid duplicates
      if (prev.some(w => w.word.toLowerCase() === newWord.word?.toLowerCase())) {
        return prev;
      }
      
      const fullWord: WordItem = {
        id: `w-${Date.now()}`,
        word: newWord.word || '',
        phonetic: newWord.phonetic || '',
        partOfSpeech: newWord.partOfSpeech || '',
        definition: newWord.definition || '',
        example: newWord.example || '',
        morphology: newWord.morphology || '',
        nextReview: Date.now(),
        interval: 0,
        repetition: 0,
        efactor: 2.5,
      };
      
      return [...prev, fullWord];
    });
  };
  
  const updateWords = (newWords: WordItem[]) => {
    setWordsState(newWords);
  };

  return { words, addWord, updateWords, resetVocabulary };
}
