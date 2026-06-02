import { GoogleGenAI } from '@google/genai';

// 内存中的防刷记录。注意：Vercel Serverless 实例会在无请求时冻结或销毁，
// 所以这个内存限制只能在同一个活跃实例的短时间内生效。对于更严格的限制，需要用 Vercel KV。
const translationTimestamps = new Map<string, number>();
const RATE_LIMIT_MS = 5000;

export default async function handler(req: any, res: any) {
  // 允许跨域访问 (CORS) 
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || 'unknown';
    const now = Date.now();
    const lastRequest = translationTimestamps.get(ip) || 0;

    if (now - lastRequest < RATE_LIMIT_MS) {
      const waitTime = Math.ceil((RATE_LIMIT_MS - (now - lastRequest)) / 1000);
      return res.status(429).json({ error: `Please wait ${waitTime} seconds before translating again.` });
    }

    translationTimestamps.set(ip, now);

    const { text, targetLanguage = 'Chinese' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on Vercel.' });
    }

    const aiClient = new GoogleGenAI({ apiKey: key });

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: `Translate the following text into ${targetLanguage}. Provide ONLY the translation, nothing else.\n\nText: ${text}`,
    });

    res.status(200).json({ translation: response.text });
  } catch (error: any) {
    console.error('Translation error:', error);
    res.status(500).json({ error: error?.message || 'Failed to translate' });
  }
}
