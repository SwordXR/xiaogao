import React from 'react';
import { PenTool, MessageSquare, BookOpen, Brain, Headphones } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  onNavigate: (module: 'vocabulary' | 'writing_speaking' | 'reading_listening') => void;
}

export default function Home({ onNavigate }: Props) {
  const { t } = useLanguage();
  return (
    <div className="max-w-5xl mx-auto py-12 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4 tracking-tight">雅思从入门到入土（bushi）</h1>
      </div>

      <div className="grid grid-cols-1 mb-6">
        <button 
          onClick={() => onNavigate('vocabulary')}
          className="group relative overflow-hidden rounded-3xl bg-amber-100 hover:bg-amber-200 transition-colors p-8 text-left border border-amber-200/50 shadow-sm"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Brain className="w-32 h-32 text-amber-800" />
          </div>
          <div className="relative z-10 w-full max-w-xl">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mb-6">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-serif text-amber-950 mb-2">{t('home.vocab')}</h2>
            <p className="text-amber-900/70">
              {t('home.vocab.desc')}
            </p>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          onClick={() => onNavigate('writing_speaking')}
          className="group relative overflow-hidden rounded-3xl bg-white hover:bg-stone-50 transition-colors p-8 text-left border border-stone-200 shadow-sm"
        >
           <div className="relative z-10">
            <div className="flex gap-2 mb-6">
              <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center">
                <PenTool className="w-5 h-5 text-stone-700" />
              </div>
              <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-stone-700" />
              </div>
            </div>
            <h2 className="text-xl font-serif text-stone-900 mb-2">{t('home.writing')}</h2>
            <p className="text-stone-500 text-sm">
              {t('home.writing.desc')}
            </p>
          </div>
        </button>

        <button 
          onClick={() => onNavigate('reading_listening')}
          className="group relative overflow-hidden rounded-3xl bg-stone-900 hover:bg-stone-800 transition-colors p-8 text-left border border-stone-800 shadow-sm"
        >
          <div className="relative z-10">
            <div className="flex gap-2 mb-6">
              <div className="w-10 h-10 bg-stone-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-stone-200" />
              </div>
              <div className="w-10 h-10 bg-stone-700 rounded-lg flex items-center justify-center">
                <Headphones className="w-5 h-5 text-stone-200" />
              </div>
            </div>
            <h2 className="text-xl font-serif text-white mb-2">{t('home.test')}</h2>
            <p className="text-stone-400 text-sm">
              {t('home.test.desc')}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
