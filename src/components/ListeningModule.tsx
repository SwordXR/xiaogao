import React, { useState } from 'react';
import { sampleListeningTest } from '../data';
import { Headphones, CheckCircle, Play, Pause } from 'lucide-react';
import InteractiveText from './InteractiveText';
import WordDrawer from './WordDrawer';
import TranslationDrawer from './TranslationDrawer';
import { useLanguage } from '../contexts/LanguageContext';

export default function ListeningModule() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lookupWord, setLookupWord] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleAnswer = (questionId: string, answer: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let score = 0;
    sampleListeningTest.questions.forEach(q => {
      if (answers[q.id]?.toLowerCase() === q.answer.toLowerCase()) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Headphones className="w-6 h-6 text-amber-600" />
          <h2 className="text-2xl font-serif text-stone-800">{t('listening.title')}</h2>
        </div>
        <div className="px-3 py-1.5 bg-amber-50 text-amber-800 text-xs font-medium rounded-full inline-flex border border-amber-100">
          {t('listening.interactive')}
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-stone-100 mb-8">
        <div className="flex flex-col items-center py-6 border-b border-stone-100 mb-8">
          <h3 className="text-lg font-medium text-stone-900 mb-6">{sampleListeningTest.title}</h3>
          
          {/* Mock Audio Player */}
          <div className="w-full max-w-md bg-stone-50 rounded-full p-2 pr-6 flex items-center gap-4 border border-stone-200">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 flex items-center justify-center text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
            </button>
            <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
               <div className="h-full bg-amber-400 w-1/3 rounded-full" />
            </div>
            <span className="text-xs font-mono text-stone-500">01:23 / 04:05</span>
          </div>

          {/* Transcript toggle for demo */}
          <details className="w-full max-w-2xl mt-6 group">
            <summary className="text-sm font-medium text-amber-600 cursor-pointer text-center list-none hover:text-amber-700">
              {t('listening.reveal')}
            </summary>
            <div className="mt-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100/50 text-stone-600 text-sm leading-relaxed">
              <InteractiveText text={sampleListeningTest.transcript} onWordClick={setLookupWord} onSelection={setSelectedText} />
            </div>
          </details>
        </div>

        <div className="space-y-8">
          {sampleListeningTest.questions.map((q, idx) => {
            const isCorrect = submitted && answers[q.id]?.toLowerCase() === q.answer.toLowerCase();
            const isWrong = submitted && answers[q.id] && answers[q.id]?.toLowerCase() !== q.answer.toLowerCase();

            return (
              <div key={q.id} className={`p-6 rounded-2xl bg-stone-50/50 border ${isCorrect ? 'border-green-200 bg-green-50/30' : isWrong ? 'border-red-200 bg-red-50/30' : 'border-stone-100'}`}>
                <p className="font-medium text-stone-800 mb-4">
                  <span className="text-stone-400 mr-2">{idx + 1}.</span>
                  {q.text}
                </p>
                
                {q.type === 'multiple_choice' && q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map(opt => (
                      <label 
                        key={opt} 
                        className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-colors border
                          ${answers[q.id] === opt ? 'bg-amber-50 border-amber-300' : 'bg-white border-stone-200 hover:border-stone-300'}
                        `}
                      >
                        <input 
                          type="radio" 
                          name={`lq-${q.id}`} 
                          value={opt}
                          checked={answers[q.id] === opt}
                          onChange={(e) => handleAnswer(q.id, e.target.value)}
                          disabled={submitted}
                          className="hidden"
                        />
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${answers[q.id] === opt ? 'border-amber-500' : 'border-stone-300'}`}>
                          {answers[q.id] === opt && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                        </div>
                        <span className="text-stone-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {q.type === 'fill_in_the_blank' && (
                  <div className="max-w-md">
                    <input 
                      type="text"
                      placeholder="..."
                      value={answers[q.id] || ''}
                      onChange={(e) => handleAnswer(q.id, e.target.value)}
                      disabled={submitted}
                      className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                        isCorrect ? 'border-green-300 bg-green-50 text-green-800' : 
                        isWrong ? 'border-red-300 bg-red-50 text-red-800' : 
                        'border-stone-200 bg-white text-stone-800'
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

        <div className="mt-8">
          {!submitted ? (
            <button 
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length === 0}
              className="w-full md:w-auto md:px-12 py-4 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mx-auto block"
            >
              {t('reading.submit')}
            </button>
          ) : (
            <div className="text-center p-6 bg-stone-50 rounded-2xl border border-stone-100">
              <div className="text-3xl font-serif text-stone-800 mb-2">
                {calculateScore()} / {sampleListeningTest.questions.length}
              </div>
              <button 
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
                className="px-6 py-2 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-lg transition-colors text-sm font-medium inline-flex items-center gap-2"
              >
                {t('reading.retry')}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <WordDrawer word={lookupWord} onClose={() => setLookupWord(null)} />
      <TranslationDrawer text={selectedText} onClose={() => setSelectedText(null)} />
    </div>
  );
}
