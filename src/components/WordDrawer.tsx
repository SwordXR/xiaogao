import React, { useEffect, useState } from 'react';
import { lookupDictionary } from '../data';
import { Plus, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useVocabulary } from '../hooks/useVocabulary';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  word: string | null;
  onClose: () => void;
}

export default function WordDrawer({ word, onClose }: Props) {
  const { words, addWord } = useVocabulary();
  const { t } = useLanguage();
  
  if (!word) return null;
  
  const wordData = lookupDictionary(word);
  const isAlreadyAdded = words.some(w => w.word.toLowerCase() === wordData.word?.toLowerCase());

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-center items-end sm:items-center p-4 pointer-events-none">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm pointer-events-auto"
          onClick={onClose}
        />
        
        {/* Drawer / Popover */}
        <motion.div 
          initial={{ y: '100%', opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: '100%', opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-[#1a1a1a] w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-xl pointer-events-auto flex flex-col overflow-hidden border border-stone-100 dark:border-stone-800 relative max-h-[80vh] overflow-y-auto"
        >
          <div className="p-6 relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-stone-100 dark:bg-stone-800 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-3xl font-serif text-stone-900 dark:text-stone-100 mb-1">{wordData.word}</h2>
            <div className="flex items-center gap-3 mb-4 text-sm">
              <span className="font-mono text-stone-500 tracking-wide">{wordData.phonetic}</span>
              <span className="px-2 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded italic">{wordData.partOfSpeech}</span>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-[10px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">{t('drawer.definition')}</h4>
                <p className="text-stone-800 dark:text-stone-200 text-base leading-relaxed mb-2">{wordData.definition}</p>
                {wordData.translation && (
                  <p className="text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-[#222] px-3 py-2 rounded-lg border border-stone-100 dark:border-stone-800 font-medium">
                    {wordData.translation}
                  </p>
                )}
              </div>
              
              {wordData.morphology && (
                <div>
                  <h4 className="text-[10px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">{t('drawer.structure')}</h4>
                  <p className="text-stone-500 dark:text-stone-400 text-xs font-mono bg-stone-50 dark:bg-[#222] p-2 rounded-md border border-stone-100 dark:border-stone-800">{wordData.morphology}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                if (!isAlreadyAdded) addWord(wordData);
              }}
              disabled={isAlreadyAdded}
              className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                isAlreadyAdded 
                  ? 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 cursor-not-allowed' 
                  : 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 active:scale-[0.98]'
              }`}
            >
              {isAlreadyAdded ? (
                <><Check className="w-4 h-4" /> {t('drawer.added')}</>
              ) : (
                <><Plus className="w-4 h-4" /> {t('drawer.add')}</>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
