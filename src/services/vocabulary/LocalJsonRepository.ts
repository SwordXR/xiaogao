import { get, set } from 'idb-keyval';
import { WordItem } from '../../types';
import { IVocabularyRepository, PaginatedResult } from './IVocabularyRepository';
import { initialWords } from '../../data';

const DB_KEY = 'ielts-words-idb';

export class LocalJsonRepository implements IVocabularyRepository {
  private wordsCache: WordItem[] = [];
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    let storedWords = await get<WordItem[]>(DB_KEY);
    
    // First run or need sync
    if (!storedWords) {
      storedWords = await this.syncFromNetwork(initialWords);
    } else {
      // In a real production scenario with frequent updates, 
      // you could add versioning or a background sync here.
    }
    
    this.wordsCache = storedWords;
    this.isInitialized = true;
  }

  private async syncFromNetwork(baseWords: WordItem[]): Promise<WordItem[]> {
    try {
      const res = await fetch('/words.json');
      const data: WordItem[] = await res.json();
      
      const allSourceWords = [...baseWords, ...data];
      // Dedup by id
      const uniqueWords = Array.from(new Map(allSourceWords.map(w => [w.id, w])).values());
      const wordsWithReview = uniqueWords.map(w => ({
        ...w,
        nextReview: w.nextReview || Date.now(),
        interval: w.interval || 0,
        repetition: w.repetition || 0,
        efactor: w.efactor || 2.5
      }));

      await set(DB_KEY, wordsWithReview);
      return wordsWithReview;
    } catch (err) {
      console.warn("Could not fetch words.json, using local initialWords", err);
      // fallback
      await set(DB_KEY, baseWords);
      return baseWords;
    }
  }

  async getDueWords(limit: number): Promise<WordItem[]> {
    await this.initialize();
    const now = Date.now();
    return this.wordsCache
      .filter(w => w.nextReview <= now)
      .sort((a, b) => a.nextReview - b.nextReview)
      .slice(0, limit);
  }

  async updateWords(words: WordItem[]): Promise<void> {
    await this.initialize();
    
    const updateMap = new Map(words.map(w => [w.id, w]));
    this.wordsCache = this.wordsCache.map(w => updateMap.has(w.id) ? updateMap.get(w.id)! : w);
    
    // Save to indexedDB
    await set(DB_KEY, this.wordsCache);
  }

  async addWord(newWord: Partial<WordItem>): Promise<WordItem | null> {
    await this.initialize();

    if (this.wordsCache.some(w => w.word.toLowerCase() === newWord.word?.toLowerCase())) {
      return null; // Already exists
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

    this.wordsCache.push(fullWord);
    await set(DB_KEY, this.wordsCache);
    return fullWord;
  }

  async getAllWords(offset: number, limit: number): Promise<PaginatedResult<WordItem>> {
    await this.initialize();
    
    const data = this.wordsCache.slice(offset, offset + limit);
    return {
      data,
      total: this.wordsCache.length,
      hasMore: offset + limit < this.wordsCache.length
    };
  }

  async resetLibrary(): Promise<void> {
    this.wordsCache = await this.syncFromNetwork(initialWords);
  }
}

export const vocabularyRepository = new LocalJsonRepository();
