/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Headphones, Brain, GraduationCap, PenTool, LayoutGrid, Settings, Search } from 'lucide-react';
import Home from './components/Home';
import Vocabulary from './components/Vocabulary';
import ReadingModule from './components/ReadingModule';
import ListeningModule from './components/ListeningModule';
import WritingSpeaking from './components/WritingSpeaking';
import SearchDrawer from './components/SearchDrawer';
import LoginScreen from './components/LoginScreen';
import CyberAnimation from './components/CyberAnimation';
import { motion, AnimatePresence } from 'motion/react';
import { ModuleType } from './types';
import { useLanguage } from './contexts/LanguageContext';

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('home');
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  const [authState, setAuthState] = useState<'login' | 'animation' | 'authenticated'>('login');

  const { language, setLanguage, t } = useLanguage();

  if (authState === 'login') {
    return (
      <LoginScreen onLoginSuccess={() => {
        setAuthState('animation');
      }} />
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-amber-200 selection:text-stone-900">
      <AnimatePresence>
        {authState === 'animation' && (
          <CyberAnimation key="cyber-animation" onComplete={() => {
            sessionStorage.setItem('isLoggedIn', 'true');
            setAuthState('authenticated');
          }} />
        )}
      </AnimatePresence>
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors"
                title={language === 'zh' ? '设置' : 'Settings'}
              >
                <Settings className="w-5 h-5" />
              </button>
              
              {showSettings && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSettings(false)}></div>
                  <div className="absolute top-12 left-0 w-48 bg-white border border-stone-200 shadow-lg rounded-xl z-20 py-2">
                    <p className="px-4 py-2 text-xs font-semibold text-stone-400 tracking-wider">LANGUAGE / 语言</p>
                    <button 
                      onClick={() => { setLanguage('en'); setShowSettings(false); }}
                      className={`w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'bg-amber-50 text-amber-900 font-medium' : 'text-stone-700 hover:bg-stone-50'}`}
                    >
                      English
                    </button>
                    <button 
                      onClick={() => { setLanguage('zh'); setShowSettings(false); }}
                      className={`w-full text-left px-4 py-2 text-sm ${language === 'zh' ? 'bg-amber-50 text-amber-900 font-medium' : 'text-stone-700 hover:bg-stone-50'}`}
                    >
                      中文
                    </button>
                  </div>
                </>
              )}
            </div>
            <button onClick={() => setActiveModule('home')} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-serif font-medium text-stone-900">{t('app.title')}</h1>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowSearch(true)}
              className="w-10 h-10 flex items-center justify-center text-amber-600 hover:bg-amber-50 rounded-full transition-colors mr-2"
              title="Search Vocabulary / 搜索词汇"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <nav className="hidden md:flex space-x-1 bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveModule('home')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                activeModule === 'home' 
                  ? 'bg-white text-stone-900 shadow-sm' 
                  : 'text-stone-500 hover:text-stone-700 hover:bg-stone-200/50'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{t('nav.home')}</span>
            </button>
            <button
              onClick={() => setActiveModule('vocabulary')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                activeModule === 'vocabulary' 
                  ? 'bg-white text-stone-900 shadow-sm' 
                  : 'text-stone-500 hover:text-stone-700 hover:bg-stone-200/50'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>{t('nav.vocab')}</span>
            </button>
            <button
              onClick={() => setActiveModule('writing_speaking')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                activeModule === 'writing_speaking' 
                  ? 'bg-white text-stone-900 shadow-sm' 
                  : 'text-stone-500 hover:text-stone-700 hover:bg-stone-200/50'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>{t('nav.writing')}</span>
            </button>
            <button
              onClick={() => setActiveModule('reading_listening')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                activeModule === 'reading_listening' || activeModule === 'reading' || activeModule === 'listening'
                  ? 'bg-white text-stone-900 shadow-sm' 
                  : 'text-stone-500 hover:text-stone-700 hover:bg-stone-200/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{t('nav.test')}</span>
            </button>
          </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeModule === 'home' && <Home onNavigate={setActiveModule} />}
        {activeModule === 'vocabulary' && <Vocabulary />}
        {activeModule === 'writing_speaking' && <WritingSpeaking />}
        
        {/* Test Prep Sub-Routing for demo purposes */}
        {activeModule === 'reading_listening' && (
          <div className="max-w-4xl mx-auto py-12">
            <h2 className="text-3xl font-serif text-stone-900 mb-8 text-center">{t('prep.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => setActiveModule('reading')}
                className="bg-white p-8 rounded-3xl border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all text-center group"
              >
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-100 transition-colors">
                  <BookOpen className="w-8 h-8 text-stone-700 group-hover:text-amber-700" />
                </div>
                <h3 className="text-xl font-medium text-stone-900 mb-2">{t('prep.reading')}</h3>
                <p className="text-stone-500 text-sm">{t('prep.reading.desc')}</p>
              </button>
              <button 
                onClick={() => setActiveModule('listening')}
                className="bg-white p-8 rounded-3xl border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all text-center group"
              >
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-100 transition-colors">
                  <Headphones className="w-8 h-8 text-stone-700 group-hover:text-amber-700" />
                </div>
                <h3 className="text-xl font-medium text-stone-900 mb-2">{t('prep.listening')}</h3>
                <p className="text-stone-500 text-sm">{t('prep.listening.desc')}</p>
              </button>
            </div>
          </div>
        )}
        
        {activeModule === 'reading' && <ReadingModule />}
        {activeModule === 'listening' && <ListeningModule />}
      </main>
      
      <SearchDrawer isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </div>
  );
}

