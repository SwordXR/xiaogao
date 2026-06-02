import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { lookupDictionary } from '../data';
import WordDrawer from './WordDrawer';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDrawer({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [activeWord, setActiveWord] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setActiveWord(query.trim());
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-center items-start pt-20 p-4 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm pointer-events-auto"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ y: -20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -20, opacity: 0, scale: 0.95 }}
          className="bg-white w-full max-w-lg rounded-2xl shadow-xl pointer-events-auto flex flex-col overflow-hidden border border-amber-100"
        >
          <div className="p-4 relative bg-amber-50/50">
            <button 
              onClick={onClose}
              className="absolute top-1/2 -translate-y-1/2 right-4 p-2 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <form onSubmit={handleSearch} className="mr-10 relative">
              <input 
                autoFocus
                type="text" 
                placeholder="Search a word..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 transition-all shadow-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
            </form>
          </div>
        </motion.div>
      </div>
      
      <WordDrawer word={activeWord} onClose={() => setActiveWord(null)} />
    </AnimatePresence>
  );
}
