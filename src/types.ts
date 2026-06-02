export type ModuleType = 'home' | 'vocabulary' | 'writing_speaking' | 'reading_listening' | 'reading' | 'listening';

export interface WordItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  definitionTranslation?: string;
  translation?: string; // Chinese translation
  example: string;
  exampleTranslation?: string;
  morphology?: string; // Etymology or root/affix structure
  morphologyTranslation?: string;
  nextReview: number; // timestamp in ms
  interval: number; // in days
  repetition: number;
  efactor: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'fill_in_the_blank';
  options?: string[];
  answer: string;
}

export interface ReadingTest {
  id: string;
  title: string;
  content: string;
  questions: Question[];
}

export interface ListeningTest {
  id: string;
  title: string;
  audioUrl?: string; // We might use standard text-to-speech or mock this
  transcript: string;
  questions: Question[];
}
