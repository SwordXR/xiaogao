import { useEffect, useState, useCallback } from 'react';
import { WordItem } from '../types';
import { vocabularyRepository } from '../services/vocabulary/LocalJsonRepository';

export function useVocabulary() {
  const [words, setWordsState] = useState<WordItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadWords = useCallback(async () => {
    setIsLoading(true);
    await vocabularyRepository.initialize();
    
    // For the UI, we might just want to load all words since the UI expects 'words' to be the full array,
    // or we can refactor components to fetching chunks. Since the old hook returned all words, 
    // to prevent immediate breakage, we'll fetch them, but it's loaded asynchronously so no main thread freezing.
    // However, the optimal approach is just getting the due words. For now, let's load all to keep UI compatible, 
    // but the DB handles the heavy save/load.
    const paginated = await vocabularyRepository.getAllWords(0, 10000); 
    setWordsState(paginated.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadWords();
  }, [loadWords]);

  const resetVocabulary = async () => {
    setIsLoading(true);
    await vocabularyRepository.resetLibrary();
    await loadWords();
  };

  const addWord = async (newWord: Partial<WordItem>) => {
    const added = await vocabularyRepository.addWord(newWord);
    if (added) {
      setWordsState(prev => [...prev, added]);
    }
  };
  
  const updateWords = async (newWords: WordItem[]) => {
    await vocabularyRepository.updateWords(newWords);
    
    // Merge updates into React state for immediate UI reflection
    const updateMap = new Map(newWords.map(w => [w.id, w]));
    setWordsState(prev => prev.map(w => updateMap.has(w.id) ? updateMap.get(w.id)! : w));
  };

  return { words, isLoading, addWord, updateWords, resetVocabulary };
}

