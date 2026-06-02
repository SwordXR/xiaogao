import { WordItem, ReadingTest, ListeningTest } from '../types';

export const initialWords: WordItem[] = [
  {
    id: 'w1', word: 'Abandon', phonetic: '/əˈbændən/', partOfSpeech: 'verb',
    definition: 'Cease to support or look after; desert.', definitionTranslation: '停止支持或照顾；遗弃。', translation: '放弃，遗弃',
    example: 'He had to abandon his car in the snow.', exampleTranslation: '他不得不把车丢在雪地里。', morphology: 'Prefix: a- (not) + Root: bandon (control)', morphologyTranslation: '前缀: a- (无) + 词根: bandon (控制)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w2', word: 'Abbreviate', phonetic: '/əˈbriːvieɪt/', partOfSpeech: 'verb',
    definition: 'Shorten (a word, phrase, or text).', definitionTranslation: '缩短（单词、短语或文本）。', translation: '缩写，缩短',
    example: 'Network is often abbreviated to net.', exampleTranslation: 'Network 常常缩写为 net。', morphology: 'Prefix: ad- (to) + Root: brevis (short)', morphologyTranslation: '前缀: ad- (向) + 词根: brevis (短)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w3', word: 'Aberrant', phonetic: '/æˈberənt/', partOfSpeech: 'adjective',
    definition: 'Departing from an accepted standard.', definitionTranslation: '偏离公认的标准。', translation: '异常的，脱轨的',
    example: 'This highly aberrant behavior can be explained by his past.', exampleTranslation: '这种极其异常的行为可以通过他的过去来解释。', morphology: 'Prefix: ab- (away from) + Root: errare (to wander)', morphologyTranslation: '前缀: ab- (远离) + 词根: errare (游荡)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w4', word: 'Abound', phonetic: '/əˈbaʊnd/', partOfSpeech: 'verb',
    definition: 'Exist in large numbers or amounts.', definitionTranslation: '大量存在。', translation: '大量存在，充满',
    example: 'Rumors of a further scandal abound.', exampleTranslation: '关于进一步丑闻的谣言四起。', morphology: 'Prefix: ab- (from) + Root: undare (surge)', morphologyTranslation: '前缀: ab- (从) + 词根: undare (汹涌)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w5', word: 'Abridge', phonetic: '/əˈbrɪdʒ/', partOfSpeech: 'verb',
    definition: 'Shorten (a piece of writing) without losing the sense.', definitionTranslation: '在不失去原意的情况下缩短（文章）。', translation: '删节，缩短',
    example: 'The introduction is abridged from the author\'s postscript.', exampleTranslation: '引言删节自作者的后记。', morphology: 'Prefix: a- (to) + Root: breviare (shorten)', morphologyTranslation: '前缀: a- (向) + 词根: breviare (缩短)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w6', word: 'Absorb', phonetic: '/əbˈzɔːb/', partOfSpeech: 'verb',
    definition: 'Take in or soak up (energy, or a liquid or other substance) by chemical or physical action, typically gradually.', definitionTranslation: '通过化学或物理作用逐渐吸收（能量、液体或其他物质）。', translation: '吸收，吸引',
    example: 'Buildings can be designed to absorb and retain heat.', exampleTranslation: '可以设计建筑物来吸收和保留热量。', morphology: 'Prefix: ab- (from) + Root: sorbere (suck in)', morphologyTranslation: '前缀: ab- (从) + 词根: sorbere (吸入)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w7', word: 'Abstain', phonetic: '/əbˈsteɪn/', partOfSpeech: 'verb',
    definition: 'Restrain oneself from doing or enjoying something.', definitionTranslation: '克制自己不做或不享受某事。', translation: '弃权，戒除',
    example: 'Abstaining from chocolate is hard.', exampleTranslation: '戒吃巧克力很难。', morphology: 'Prefix: abs- (from) + Root: tenere (to hold)', morphologyTranslation: '前缀: abs- (从) + 词根: tenere (保持)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w8', word: 'Absurd', phonetic: '/əbˈsɜːd/', partOfSpeech: 'adjective',
    definition: 'Wildly unreasonable, illogical, or inappropriate.', definitionTranslation: '极其不合理、不合逻辑或不恰当。', translation: '荒谬的，可笑的',
    example: 'The allegations are patently absurd.', exampleTranslation: '这些指控显然是荒谬的。', morphology: 'Prefix: ab- (off) + Root: surdus (deaf, muted)', morphologyTranslation: '前缀: ab- (离开) + 词根: surdus (聋的，无声的)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w9', word: 'Abundant', phonetic: '/əˈbʌndənt/', partOfSpeech: 'adjective',
    definition: 'Existing or available in large quantities; plentiful.', definitionTranslation: '大量存在或可获得；充足的。', translation: '丰富的，充裕的',
    example: 'There was abundant evidence to support the theory.', exampleTranslation: '有充足的证据支持这一理论。', morphology: 'Root: abundare (overflow) + Suffix: -ant', morphologyTranslation: '词根: abundare (溢出) + 后缀: -ant (形容词)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w10', word: 'Academic', phonetic: '/ˌæk.əˈdem.ɪk/', partOfSpeech: 'adjective',
    definition: 'Relating to education and scholarship.', definitionTranslation: '与教育和学术有关的。', translation: '学术的，学院的',
    example: 'Students with poor academic records.', exampleTranslation: '学业成绩差的学生。', morphology: 'Root: academy + Suffix: -ic', morphologyTranslation: '词根: academy (学院) + 后缀: -ic (的)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w11', word: 'Mitigate', phonetic: '/ˈmɪtɪɡeɪt/', partOfSpeech: 'verb',
    definition: 'Make less severe, serious, or painful.', definitionTranslation: '使不那么严峻、严重或痛苦。', translation: '减轻，缓和',
    example: 'He wanted to mitigate misery in the world.', exampleTranslation: '他想减轻世界上的苦难。', morphology: 'Root: mit (mild, soft) + Suffix: -ate (make)', morphologyTranslation: '词根: mit (温和) + 后缀: -ate (使)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w12', word: 'Paradigm', phonetic: '/ˈpærədaɪm/', partOfSpeech: 'noun',
    definition: 'A typical example or pattern of something; a model.', definitionTranslation: '某事物的典型例子或模式；模型。', translation: '范例，模范，词形变化表',
    example: 'There is a new paradigm for public art in this country.', exampleTranslation: '在这个国家，公共艺术有了一种新的范式。', morphology: 'Prefix: para- (beside) + Root: deiknynai (to show)', morphologyTranslation: '前缀: para- (在旁) + 词根: deiknynai (展示)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w13', word: 'Ubiquitous', phonetic: '/juːˈbɪkwɪtəs/', partOfSpeech: 'adjective',
    definition: 'Present, appearing, or found everywhere.', definitionTranslation: '到处存在、出现或被发现。', translation: '无所不在的，普遍存在的',
    example: 'His ubiquitous influence was felt by all the family.', exampleTranslation: '全家人都能感受到他无处不在的影响。', morphology: 'Root: ubique (everywhere) + Suffix: -ous (possessing)', morphologyTranslation: '词根: ubique (到处) + 后缀: -ous (具...特性的)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w14', word: 'Cognitive', phonetic: '/ˈkɒɡnɪtɪv/', partOfSpeech: 'adjective',
    definition: 'Relating to cognition (the mental action or process of acquiring knowledge).', definitionTranslation: '与认知（获取知识的心理活动或过程）有关。', translation: '认知的，认识的',
    example: 'The child\'s cognitive development.', exampleTranslation: '儿童的认知发展。', morphology: 'Root: cognit- (known) + Suffix: -ive (tending to)', morphologyTranslation: '词根: cognit- (已知的) + 后缀: -ive (倾向于)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w15', word: 'Empirical', phonetic: '/ɪmˈpɪrɪkl/', partOfSpeech: 'adjective',
    definition: 'Based on, concerned with, or verifiable by observation or experience rather than theory or pure logic.', definitionTranslation: '基于观察或经验而非理论或纯逻辑，与此相关或可由此验证的。', translation: '经验主义的，以观察或实验为依据的',
    example: 'They provided considerable empirical evidence to support their argument.', exampleTranslation: '他们提供了大量的经验证据来支持他们的论点。', morphology: 'Root: empeirikos (experienced) + Suffix: -al (pertaining to)', morphologyTranslation: '词根: empeirikos (经验丰富的) + 后缀: -al (关于)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w16', word: 'Catalyst', phonetic: '/ˈkæt.əl.ɪst/', partOfSpeech: 'noun',
    definition: 'A substance that increases the rate of a chemical reaction without itself undergoing any permanent chemical change; a person or thing that precipitates an event.', definitionTranslation: '在自身不发生任何永久化学变化的情况下增加化学反应速率的物质；促成事件的人或物。', translation: '催化剂，促使变化的人或事物',
    example: 'The prime minister\'s speech acted as a catalyst for debate.', exampleTranslation: '首相的演讲成为了辩论的催化剂。', morphology: 'Prefix: cata- (down) + Root: lyein (loosen)', morphologyTranslation: '前缀: cata- (向下) + 词根: lyein (松开)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w17', word: 'Dichotomy', phonetic: '/daɪˈkɒt.ə.mi/', partOfSpeech: 'noun',
    definition: 'A division or contrast between two things that are or are represented as being opposed or entirely different.', definitionTranslation: '相对立或完全不同的两件事物之间的划分或对比。', translation: '一分为二，对立',
    example: 'A rigid dichotomy between science and mysticism.', exampleTranslation: '科学与神秘主义之间的严格二分法。', morphology: 'Prefix: dicho- (in two) + Root: temnein (to cut)', morphologyTranslation: '前缀: dicho- (分为二) + 词根: temnein (切)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w18', word: 'Elicit', phonetic: '/ɪˈlɪs.ɪt/', partOfSpeech: 'verb',
    definition: 'Evoke or draw out (a response, answer, or fact) from someone in reaction to one\'s own actions or questions.', definitionTranslation: '因自己的行为或问题而从某人那里引出或探出（反应、答案或事实）。', translation: '引出，探出',
    example: 'They invariably elicit exclamations of approval from guests.', exampleTranslation: '它们总是能引来客人们赞许的惊叹。', morphology: 'Prefix: e- (out) + Root: lacere (entice)', morphologyTranslation: '前缀: e- (出) + 词根: lacere (引诱)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w19', word: 'Fluctuate', phonetic: '/ˈflʌk.tʃu.eɪt/', partOfSpeech: 'verb',
    definition: 'Rise and fall irregularly in number or amount.', definitionTranslation: '在数量或金额上不规则地起伏。', translation: '波动，起伏',
    example: 'Trade with other countries tends to fluctuate from year to year.', exampleTranslation: '与其他国家的贸易情况每年都有波动的趋势。', morphology: 'Root: fluctus (wave) + Suffix: -ate (make)', morphologyTranslation: '词根: fluctus (波浪) + 后缀: -ate (使)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  },
  {
    id: 'w20', word: 'Pragmatic', phonetic: '/præɡˈmæt.ɪk/', partOfSpeech: 'adjective',
    definition: 'Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.', definitionTranslation: '以基于实际而非理论考虑的明智且现实的方式处理事情。', translation: '务实的，实用的',
    example: 'A pragmatic approach to politics.', exampleTranslation: '一种务实的政治策略。', morphology: 'Root: pragma (deed, act) + Suffix: -ic', morphologyTranslation: '词根: pragma (行为) + 后缀: -ic (形容词)',
    nextReview: Date.now(), interval: 0, repetition: 0, efactor: 2.5,
  }
];

export function lookupDictionary(word: string): Partial<WordItem> {
  const normalized = word.toLowerCase().trim();
  
  // 1. 本地高频词库快速索引 (Simulating local IndexedDB lookup for top 8k-10k words)
  const found = initialWords.find(w => w.word.toLowerCase() === normalized);
  if (found) return found;
  
  // 2. 边缘词汇云端兜底 + 本地缓存写入缓存池 (Simulating asynchronous API hit for rare words)
  // 实际应用场景下，这里将触发一个异步请求，然后在界面显示 Loading。
  return {
    word: word,
    phonetic: '/.../',
    partOfSpeech: 'unknown',
    definition: `[Network Lookup] Definition of ${word}.`,
    translation: `[云端获取] 单词 ${word} 的释义。在实际应用场景中，此时系统已通过异步 API 拉取边缘词汇，并正在将其写入 IndexedDB。`,
    example: `(Simulation) ${word} used in a sentence.`,
    morphology: `[Auto-parsed Tree] Root structure for ${normalized} generated from model.`,
  };
}

export const sampleReadingTest: ReadingTest = {
  id: 'r1',
  title: 'The Evolution of Modern Architecture',
  content: `Modern architecture emerged at the end of the 19th century from a revolution in technology, engineering, and building materials, and from a desire to break away from historical architectural styles and to invent something that was purely functional and new.

The revolution in materials came first, with the use of cast iron, plate glass, and reinforced concrete, to build structures that were stronger, lighter, and taller than those of the preceding centuries. The Chicago School of architecture, which developed between 1880 and 1910, is often considered the pioneer of modern architecture. They introduced the steel-frame skyscraper, large expanses of plate glass, and the use of terra cotta for architectural ornamentation.

A key principle of modern architecture is "form follows function," a maxim coined by Louis Sullivan. This means that the shape of a building or object should primarily relate to its intended function or purpose.`,
  questions: [
    {
      id: 'rq1',
      text: 'Which architectural school is often considered the pioneer of modern architecture?',
      type: 'multiple_choice',
      options: ['The New York School', 'The Bauhaus', 'The Chicago School', 'The Paris School'],
      answer: 'The Chicago School'
    },
    {
      id: 'rq2',
      text: 'What was the maxim coined by Louis Sullivan?',
      type: 'fill_in_the_blank',
      answer: 'form follows function'
    }
  ]
};

export const sampleListeningTest: ListeningTest = {
  id: 'l1',
  title: 'University Library Orientation',
  transcript: "Welcome to the University Library. My name is Sarah, and I'll be taking you on a brief tour. On the ground floor, you'll find the main circulation desk and the reference section. The second floor houses the journals and periodicals. Please remember that food and drink are strictly prohibited in the reading rooms on the third floor. Also, group study rooms can be booked online up to two weeks in advance.",
  questions: [
    {
      id: 'lq1',
      text: 'Where is the reference section located?',
      type: 'multiple_choice',
      options: ['Ground floor', 'Second floor', 'Third floor', 'Basement'],
      answer: 'Ground floor'
    },
    {
      id: 'lq2',
      text: 'How far in advance can group study rooms be booked?',
      type: 'fill_in_the_blank',
      answer: 'two weeks'
    }
  ]
};
