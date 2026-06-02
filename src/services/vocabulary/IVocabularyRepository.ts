import { WordItem } from '../../types';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  hasMore: boolean;
}

export interface IVocabularyRepository {
  initialize(): Promise<void>;
  getDueWords(limit: number): Promise<WordItem[]>;
  updateWords(words: WordItem[]): Promise<void>;
  addWord(word: Partial<WordItem>): Promise<WordItem | null>;
  getAllWords(offset: number, limit: number): Promise<PaginatedResult<WordItem>>;
  resetLibrary(): Promise<void>;
}
