import React from 'react';
import { WordItem } from '../types';

interface MemorizeCardProps {
  word: WordItem;
}

export default function MemorizeCard({ word }: MemorizeCardProps) {
  return (
    <>
      <h1 className="text-6xl sm:text-[5rem] font-serif text-stone-50 mb-2 leading-tight">{word.word}</h1>
      <p className="text-stone-400 font-mono text-base tracking-wide mb-6">{word.phonetic}</p>
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
    </>
  );
}
