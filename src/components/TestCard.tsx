import React from 'react';
import { WordItem } from '../types';
import { motion } from 'motion/react';

interface TestCardProps {
  word: WordItem;
  testState: 'idle' | 'correct' | 'wrong';
  testInput: string;
  setTestInput: (val: string) => void;
  setTestState: (state: 'idle' | 'correct' | 'wrong') => void;
}

export default function TestCard({ word, testState, testInput, setTestInput, setTestState }: TestCardProps) {
  return (
    <>
      <h1 className="text-6xl sm:text-[5rem] font-serif text-stone-50 mb-8 leading-tight">{word.word}</h1>
      
      {testState === 'idle' ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          if (!testInput.trim()) return;
          const formattedTranslation = word.translation || '';
          const isCorrect = formattedTranslation.includes(testInput.trim());
          setTestState(isCorrect ? 'correct' : 'wrong');
        }} className="w-full max-w-sm mx-auto flex flex-col items-center">
          <input 
            type="text" 
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="输入中文释义..."
            className="w-full bg-transparent border-0 border-b-[3px] border-stone-600 focus:border-amber-500 text-center text-3xl text-stone-100 focus:outline-none py-3 placeholder-stone-600/50 mb-4 transition-colors"
            autoFocus
          />
          <button type="submit" className="opacity-0 w-0 h-0 absolute overflow-hidden">Submit</button>
          <p className="text-stone-500 text-sm font-medium uppercase tracking-widest mt-4">Press Enter</p>
        </form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="w-full flex-col flex items-center"
        >
          <div className={`text-2xl font-medium mb-8 px-8 py-3 rounded-2xl ${testState === 'correct' ? 'bg-green-900/40 text-green-400 border border-green-800/50' : 'bg-red-900/40 text-red-400 border border-red-800/50'}`}>
            {testState === 'correct' ? '回答正确！' : `回答错误。你的答案：${testInput}`}
          </div>
          
          <p className="text-stone-400 font-mono text-base tracking-wide mb-4">{word.phonetic}</p>
          <p className="text-3xl text-stone-100 font-medium mb-10">{word.translation}</p>

          <div className="w-full space-y-4 max-w-lg mx-auto text-left">
            {word.morphology && (
              <div className="bg-[#1A1513] border border-[#3E3430] rounded-xl p-4">
                <span className="text-xs text-stone-500 uppercase tracking-wider block mb-2">词根词缀</span>
                <p className="text-sm text-stone-300">{word.morphologyTranslation || word.morphology}</p>
              </div>
            )}
            
            {(word.example || word.definition) && (
              <div className="bg-[#1A1513] border border-[#3E3430] rounded-xl p-4">
                <span className="text-xs text-stone-500 uppercase tracking-wider block mb-2">例句与释义</span>
                {word.definition && (
                  <div className="mb-3">
                    <p className="text-sm text-stone-300 leading-relaxed font-medium">
                      <span className="text-stone-500 mr-2 select-none">[释义]</span>{word.definition}
                    </p>
                    {word.definitionTranslation && <p className="text-sm text-stone-500 leading-relaxed mt-1 pl-12">{word.definitionTranslation}</p>}
                  </div>
                )}
                {word.example && (
                  <div>
                    <p className="text-sm text-amber-200/80 italic leading-relaxed">
                      <span className="text-stone-500 mr-2 not-italic select-none">[例句]</span>"{word.example}"
                    </p>
                    {word.exampleTranslation && <p className="text-sm text-amber-500/60 leading-relaxed mt-1 pl-12">{word.exampleTranslation}</p>}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}
