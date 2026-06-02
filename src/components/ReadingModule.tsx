import React, { useState } from 'react';
import { sampleReadingTest } from '../data';
import { BookOpen, CheckCircle } from 'lucide-react';
import InteractiveText from './InteractiveText';
import WordDrawer from './WordDrawer';
import TranslationDrawer from './TranslationDrawer';
import { useLanguage } from '../contexts/LanguageContext';

export default function ReadingModule() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [lookupWord, setLookupWord] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleAnswer = (questionId: string, answer: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let score = 0;
    sampleReadingTest.questions.forEach(q => {
      if (answers[q.id]?.toLowerCase() === q.answer.toLowerCase()) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-amber-600" />
          <h2 className="text-2xl font-serif text-stone-800">{t('reading.title')}</h2>
        </div>
        <div className="px-3 py-1.5 bg-amber-50 text-amber-800 text-xs font-medium rounded-full inline-flex border border-amber-100">
          {t('reading.interactive')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Passage */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 overflow-y-auto max-h-[70vh]">
          <h3 className="text-xl font-medium text-stone-900 mb-6">
             <InteractiveText text={sampleReadingTest.title} onWordClick={setLookupWord} onSelection={setSelectedText} />
          </h3>
          <div className="prose prose-stone max-w-none">
            {sampleReadingTest.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-stone-700 leading-relaxed mb-4">
                <InteractiveText text={paragraph} onWordClick={setLookupWord} onSelection={setSelectedText} />
              </p>
            ))}
          </div>
        </div>

        {/* Right: Questions */}
        <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 overflow-y-auto max-h-[70vh]">
          <h3 className="text-lg font-medium text-stone-800 mb-6">{t('reading.questions')}</h3>
          
          <div className="space-y-8">
            {sampleReadingTest.questions.map((q, idx) => {
              const isCorrect = submitted && answers[q.id]?.toLowerCase() === q.answer.toLowerCase();
              const isWrong = submitted && answers[q.id] && answers[q.id]?.toLowerCase() !== q.answer.toLowerCase();

              return (
                <div key={q.id} className={`p-6 rounded-2xl bg-white border ${isCorrect ? 'border-green-200 bg-green-50/30' : isWrong ? 'border-red-200 bg-red-50/30' : 'border-stone-100'}`}>
                  <p className="font-medium text-stone-800 mb-4">
                    <span className="text-stone-400 mr-2">{idx + 1}.</span>
                    {q.text}
                  </p>
                  
                  {q.type === 'multiple_choice' && q.options && (
                    <div className="space-y-2">
                      {q.options.map(opt => (
                        <label 
                          key={opt} 
                          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors
                            ${answers[q.id] === opt ? 'bg-amber-100 border border-amber-300' : 'bg-stone-50 border border-transparent hover:bg-stone-100'}
                          `}
                        >
                          <input 
                            type="radio" 
                            name={`q-${q.id}`} 
                            value={opt}
                            checked={answers[q.id] === opt}
                            onChange={(e) => handleAnswer(q.id, e.target.value)}
                            disabled={submitted}
                            className="hidden"
                          />
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${answers[q.id] === opt ? 'border-amber-500' : 'border-stone-400'}`}>
                            {answers[q.id] === opt && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                          </div>
                          <span className="text-stone-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === 'fill_in_the_blank' && (
                    <div>
                      <input 
                        type="text"
                        placeholder="..."
                        value={answers[q.id] || ''}
                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                        disabled={submitted}
                        className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                          isCorrect ? 'border-green-300 bg-green-50 text-green-800' : 
                          isWrong ? 'border-red-300 bg-red-50 text-red-800' : 
                          'border-stone-200 bg-stone-50 text-stone-800'
                        }`}
                      />
                    </div>
                  )}

                  {submitted && (
                    <div className="mt-4 flex items-center gap-2 text-sm">
                      {isCorrect ? (
                         <span className="text-green-600 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> {t('reading.correct')}</span>
                      ) : (
                         <span className="text-red-500">
                           {t('reading.incorrect')} <span className="font-semibold text-stone-800">{q.answer}</span>
                         </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200">
            {!submitted ? (
              <button 
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(answers).length === 0}
                className="w-full py-4 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('reading.submit')}
              </button>
            ) : (
              <div className="text-center">
                <div className="text-3xl font-serif text-stone-800 mb-2">
                  {calculateScore()} / {sampleReadingTest.questions.length}
                </div>
                <button 
                  onClick={() => {
                    setAnswers({});
                    setSubmitted(false);
                  }}
                  className="px-6 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg transition-colors text-sm font-medium"
                >
                  {t('reading.retry')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <WordDrawer word={lookupWord} onClose={() => setLookupWord(null)} />
      <TranslationDrawer text={selectedText} onClose={() => setSelectedText(null)} />
    </div>
  );
}
