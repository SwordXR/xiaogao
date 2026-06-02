import React from 'react';
import { WordItem } from '../types';
import { List, X } from 'lucide-react';
import { motion } from 'motion/react';

interface VocabularyListModalProps {
  words: WordItem[];
  onClose: () => void;
}

export default function VocabularyListModal({ words, onClose }: VocabularyListModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4 pointer-events-none">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      />
      <motion.div 
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        className="relative bg-[#FDFBF7] w-full max-w-md h-[70vh] rounded-2xl shadow-2xl pointer-events-auto flex flex-col overflow-hidden border border-amber-100/50 z-10"
      >
        <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-white">
          <h3 className="font-semibold text-stone-800 flex items-center gap-2">
            <List className="w-4 h-4 text-amber-500" />
            全部词汇库 ({words.length})
          </h3>
          <button 
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {words.map((w, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 hover:bg-amber-50/50 rounded-xl border-b border-stone-50 last:border-0 transition-colors">
              <span className="font-serif text-[1.1rem] text-stone-900">{w.word}</span>
              <span className="text-sm text-stone-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis ml-4 max-w-[60%] text-right">
                {w.translation ? w.translation : 'No translation'}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
