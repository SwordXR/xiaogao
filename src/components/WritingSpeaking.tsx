import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function WritingSpeaking() {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto py-12 flex flex-col items-center justify-center text-center h-[50vh]">
      <h2 className="text-3xl font-serif text-stone-800 mb-4">{t('writing.title')}</h2>
      <p className="text-stone-500 max-w-lg mb-8">
        {t('writing.desc')}
      </p>
      <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl inline-block text-left text-sm text-amber-800/80">
        <h3 className="font-semibold text-amber-800 mb-2">{t('writing.features')}</h3>
        <ul className="list-disc pl-4 space-y-1">
          <li>Interactive linking words bank</li>
          <li>Essay skeleton templates</li>
          <li>Band 7+ idiomatic expressions</li>
          <li>Audio recorder for daily speaking practice</li>
        </ul>
      </div>
    </div>
  );
}
