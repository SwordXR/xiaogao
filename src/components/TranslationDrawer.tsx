import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Languages, X } from 'lucide-react';

interface Props {
  text: string | null;
  onClose: () => void;
}

export default function TranslationDrawer({ text, onClose }: Props) {
  if (!text) return null;

  // Mock translation logic for demo purposes
  const getMockTranslation = (t: string) => {
    return `[模拟翻译/Mock Translation]\n在实际应用中，这里将调用 Gemini 或其他翻译 API 对句子 "${t.substring(0, 15)}..." 进行精准的语境翻译和语法解析。`;
  };

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
          className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-xl pointer-events-auto flex flex-col overflow-hidden border border-stone-100 relative max-h-[80vh] overflow-y-auto"
        >
          <div className="p-6">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-stone-100 rounded-full text-stone-500 hover:bg-stone-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4 text-emerald-600">
              <Languages className="w-5 h-5" />
              <h3 className="font-semibold tracking-wide">Sentence Translation</h3>
            </div>
            
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 mb-4">
              <p className="text-stone-800 text-lg leading-relaxed">{text}</p>
            </div>
            
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
              <p className="text-emerald-900 leading-relaxed font-medium">
                {getMockTranslation(text)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
