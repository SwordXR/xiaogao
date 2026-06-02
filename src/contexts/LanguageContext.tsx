import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.vocab': 'Vocab SRS',
    'nav.writing': 'Writing',
    'nav.test': 'Test Prep',
    'app.title': 'IELTS Assistant',
    'home.title': 'Master your IELTS',
    'home.subtitle': 'An integrated study environment blending mock testing with an intelligent Spaced Repetition System (SRS).',
    'home.vocab': 'Vocabulary SRS',
    'home.vocab.desc': 'Your central hub for long-term memory. Words discovered in reading or listening simulate real context and funnel directly into this spaced repetition engine.',
    'home.writing': 'Writing & Speaking',
    'home.writing.desc': 'Topic banks, essay structures, and speaking frameworks to organize your thoughts and arguments effectively.',
    'home.test': 'Reading & Listening',
    'home.test.desc': 'Full simulated tests. Interact directly with texts to extract unknown vocabulary straight to your SRS queue.',
    'vocab.title': 'SRS Vocabulary',
    'vocab.left': 'left',
    'vocab.caughtup': 'All caught up!',
    'vocab.caughtup.desc': 'You have reviewed all your words for now. Take a break or check back later for more.',
    'vocab.reset': 'Reset for Demo',
    'vocab.show': 'Show Definition',
    'vocab.again': 'Again',
    'vocab.good': 'Good',
    'vocab.easy': 'Easy',
    'vocab.definition': 'Definition',
    'vocab.example': 'Example',
    'reading.title': 'Reading practice',
    'reading.interactive': 'Interactive Text Active',
    'reading.questions': 'Questions',
    'reading.submit': 'Submit Answers',
    'reading.retry': 'Retry Test',
    'reading.correct': 'Correct',
    'reading.incorrect': 'Incorrect. The answer is:',
    'listening.title': 'Listening practice',
    'listening.interactive': 'Interactive Transcript Active',
    'listening.reveal': 'Reveal Transcript (for interactive review)',
    'drawer.definition': 'DEFINITION',
    'drawer.structure': 'STRUCTURE',
    'drawer.add': 'Add to SRS Queue',
    'drawer.added': 'Added to SRS',
    'prep.title': 'Reading & Listening Prep',
    'prep.reading': 'Reading Test',
    'prep.reading.desc': 'Simulated passages with interactive vocabulary extraction.',
    'prep.listening': 'Listening Test',
    'prep.listening.desc': 'Interactive transcripts to catch missed auditory vocabulary.',
    'writing.title': 'Writing & Speaking Bank',
    'writing.desc': 'This module is currently a structural placeholder. It will contain organized topic banks, structural frameworks for Task 1 & Task 2 essays, and common Part 1-3 speaking cues.',
    'writing.features': 'Planned Features:',
  },
  zh: {
    'nav.home': '主页',
    'nav.vocab': '词汇复习',
    'nav.writing': '写作与口语',
    'nav.test': '模拟测试',
    'app.title': '雅思助手',
    'home.title': '征服雅思',
    'home.subtitle': '将沉浸式模拟测试与智能间隔重复系统（SRS）完美结合的备考环境。',
    'home.vocab': '词汇间隔重复 (SRS)',
    'home.vocab.desc': '你的长期记忆中心。在阅读和听力中遇到的生词可以直接加入此系统进行高效复习。',
    'home.writing': '写作与口语题库',
    'home.writing.desc': '结构化的题库、作文骨架和口语框架，帮助你理清思路和论点。',
    'home.test': '阅读与听力模拟',
    'home.test.desc': '全真模拟测试。与文本直接交互，随时将生词提取至你的复习队列。',
    'vocab.title': 'SRS 词汇',
    'vocab.left': '待复习',
    'vocab.caughtup': '暂无复习任务！',
    'vocab.caughtup.desc': '你目前没有需要复习的单词了。休息一下，或者去阅读听力中积累更多词汇吧。',
    'vocab.reset': '重置 (演示)',
    'vocab.show': '显示释义',
    'vocab.again': '重来',
    'vocab.good': '良好',
    'vocab.easy': '简单',
    'vocab.definition': '定义',
    'vocab.example': '例句',
    'reading.title': '阅读训练',
    'reading.interactive': '交互式文本已开启',
    'reading.questions': '问题',
    'reading.submit': '提交答案',
    'reading.retry': '重试',
    'reading.correct': '正确',
    'reading.incorrect': '错误。正确答案是：',
    'listening.title': '听力训练',
    'listening.interactive': '交互式文本已开启',
    'listening.reveal': '显示听力文本（支持点击查词）',
    'drawer.definition': '释义',
    'drawer.structure': '词根词缀结构',
    'drawer.add': '加入 SRS 复习队列',
    'drawer.added': '已加入复习',
    'prep.title': '阅读与听力训练',
    'prep.reading': '阅读测试',
    'prep.reading.desc': '模拟文章，支持交互式生词提取。',
    'prep.listening': '听力测试',
    'prep.listening.desc': '提供交互式听力稿，随时捕捉漏听词汇。',
    'writing.title': '写作与口语题库',
    'writing.desc': '此模块目前为结构规划。未来将包含系统化的题库、大作文/小作文结构框架以及常见的口语题卡提示。',
    'writing.features': '计划功能：',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app-language') as Language;
    return saved || 'zh';
  });

  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
