import React, { useState, useEffect } from 'react';
import { WordItem } from '../types';
import { Check, RefreshCcw, Brain, ChevronRight, List } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useVocabulary } from '../hooks/useVocabulary';
import { useLanguage } from '../contexts/LanguageContext';
import MemorizeCard from './MemorizeCard';
import TestCard from './TestCard';
import VocabularyListModal from './VocabularyListModal';

export default function Vocabulary() {
  const { words, updateWords, resetVocabulary } = useVocabulary();
  const { t } = useLanguage();
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [showList, setShowList] = useState(false);

  // New states for test mode & modes
  const [mode, setMode] = useState<'memorize' | 'test'>('memorize');
  const [testInput, setTestInput] = useState('');
  const [testState, setTestState] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Reset test state if mode changes
  useEffect(() => {
    setTestState('idle');
    setTestInput('');
  }, [mode, currentWordIndex]);

  // Get words due for review
  const now = Date.now();
  const dueWords = words.filter(w => w.nextReview <= now).sort((a, b) => a.nextReview - b.nextReview);

  const calculateNextReview = (word: WordItem, quality: number) => {
    let { interval, repetition, efactor } = word;

    if (quality >= 3) {
      if (repetition === 0) {
        interval = 1;
      } else if (repetition === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * efactor);
      }
      repetition += 1;
    } else {
      repetition = 0;
      interval = 1;
    }

    efactor = efactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (efactor < 1.3) efactor = 1.3;

    return {
      ...word,
      interval,
      repetition,
      efactor,
      nextReview: now + interval * 24 * 60 * 60 * 1000 // interval in days to ms
    };
  };

  const handleReview = (quality: number) => {
    if (dueWords.length === 0) return;
    
    const currentWord = dueWords[currentWordIndex];
    const updatedWord = calculateNextReview(currentWord, quality);
    
    const newWords = words.map(w => w.id === updatedWord.id ? updatedWord : w);
    updateWords(newWords);
  };

  if (dueWords.length === 0 || sessionCompleted) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6">
          <Brain className="w-12 h-12 text-amber-600" />
        </div>
        <h2 className="text-2xl font-serif text-stone-800 mb-2">All caught up!</h2>
        <p className="text-stone-500 max-w-md">You have reviewed all your words for now. Take a break or check back later for more.</p>
        <button 
          onClick={() => {
            resetVocabulary();
            setSessionCompleted(false);
          }}
          className="mt-8 px-6 py-2 bg-stone-200 text-stone-700 rounded-full hover:bg-stone-300 transition-colors flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" /> Reset Library
        </button>
      </div>
    );
  }

  const word = dueWords[currentWordIndex];

  return (
    <div className="max-w-[700px] mx-auto py-8 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex justify-between items-center mb-6 relative shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowList(true)}
            className="w-10 h-10 flex items-center justify-center bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-full transition-colors"
            title="词汇列表"
          >
            <List className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              resetVocabulary();
              setSessionCompleted(false);
              setCurrentWordIndex(0);
            }}
            className="w-10 h-10 flex items-center justify-center bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-full transition-colors"
            title="重置词汇库"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium px-3 py-1 bg-amber-100 text-amber-800 rounded-full ml-2">
            {dueWords.length} left
          </span>
        </div>
        
        <div className="flex items-center p-1 bg-stone-200 rounded-full shadow-inner border border-stone-300">
          <button
            onClick={() => setMode('memorize')}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${mode === 'memorize' ? 'bg-amber-500 text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
            记忆模式
          </button>
          <button
            onClick={() => setMode('test')}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${mode === 'test' ? 'bg-amber-500 text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
            检验模式
          </button>
        </div>
      </div>

      <div className="perspective-1000 flex-1 flex flex-col">
        <motion.div 
          className="flex-1 w-full bg-[#2A2421] rounded-3xl shadow-xl border border-[#3E3430] p-8 sm:p-10 flex flex-col relative overflow-hidden"
          layout
        >
            <div className="flex-1 flex flex-col items-center justify-center text-center overflow-y-auto w-full px-2" style={{ scrollbarWidth: 'none' }}>
              <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[40vh]">
                
                {mode === 'memorize' ? (
                  <MemorizeCard word={word} />
                ) : (
                  <TestCard 
                    word={word} 
                    testState={testState} 
                    testInput={testInput} 
                    setTestInput={setTestInput} 
                    setTestState={setTestState} 
                  />
                )}

              </div>
            </div>

          <div className="mt-8 pt-6 border-t border-[#3E3430] shrink-0">
            {mode === 'memorize' ? (
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleReview(5)}
                  className="py-4 bg-stone-100 hover:bg-white text-stone-900 rounded-2xl font-semibold text-lg transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5 text-green-600" /> 完全掌握
                </button>
                <button 
                  onClick={() => handleReview(1)}
                  className="py-4 bg-[#3E3430] hover:bg-[#4E413B] text-stone-200 rounded-2xl font-semibold text-lg transition-all active:scale-[0.98] border border-[#554740] shadow-sm"
                >
                  需要练习
                </button>
              </div>
            ) : (
              // Test Mode Actions
              testState !== 'idle' && (
                <button 
                  onClick={() => {
                    handleReview(testState === 'correct' ? 5 : 1);
                  }}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-stone-900 rounded-2xl font-semibold text-lg transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
                >
                  继续下一个 <ChevronRight className="w-5 h-5" />
                </button>
              )
            )}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showList && (
          <VocabularyListModal words={words} onClose={() => setShowList(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

