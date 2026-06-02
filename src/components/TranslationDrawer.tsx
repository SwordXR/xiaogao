import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Languages, X, Loader2 } from 'lucide-react';

interface Props {
  text: string | null;
  onClose: () => void;
}

export default function TranslationDrawer({ text, onClose }: Props) {
  const [translation, setTranslation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!text) {
      setTranslation(null);
      setError(null);
      return;
    }

    let isMounted = true;
    
    const fetchTranslation = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        });
        
        const data = await response.json();
        
        if (!isMounted) return;

        if (!response.ok) {
          setError(data.error || 'Failed to translate');
          return;
        }

        setTranslation(data.translation);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err.message || 'An error occurred during translation');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTranslation();

    return () => {
      isMounted = false;
    };
  }, [text]);

  if (!text) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-center items-end sm:items-center p-4 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm pointer-events-auto"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ y: '100%', opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: '100%', opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-[#1a1a1a] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-xl pointer-events-auto flex flex-col overflow-hidden border border-stone-100 dark:border-stone-800 relative max-h-[80vh] overflow-y-auto"
        >
          <div className="p-6">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-stone-100 dark:bg-stone-800 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-500">
              <Languages className="w-5 h-5" />
              <h3 className="font-semibold tracking-wide">Sentence Translation</h3>
            </div>
            
            <div className="bg-stone-50 dark:bg-[#222] p-4 rounded-xl border border-stone-100 dark:border-stone-800 mb-4">
              <p className="text-stone-800 dark:text-stone-200 text-lg leading-relaxed">{text}</p>
            </div>
            
            <div className={`p-4 rounded-xl border ${error ? 'bg-red-50/50 dark:bg-red-900/20 border-red-100 dark:border-red-800/50' : 'bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100/50 dark:border-emerald-800/50'}`}>
              <div className={`leading-relaxed font-medium ${error ? 'text-red-900 dark:text-red-300' : 'text-emerald-900 dark:text-emerald-100'}`}>
                {loading ? (
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Translating...</span>
                  </div>
                ) : error ? (
                  error
                ) : translation ? (
                  translation
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
