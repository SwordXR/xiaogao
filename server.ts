import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

let ai: GoogleGenAI | null = null;
const initAi = () => {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (key) {
      ai = new GoogleGenAI({ apiKey: key });
    }
  }
  return ai;
};

const app = express();
app.use(express.json());
const PORT = 3000;

// Rate limiting state
const translationTimestamps = new Map<string, number>();
const RATE_LIMIT_MS = 5000;

app.post('/api/translate', async (req, res) => {
  try {
    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown') as string;
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

    const aiClient = initAi();
    if (!aiClient) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: `Translate the following text into ${targetLanguage}. Provide ONLY the translation, nothing else.\n\nText: ${text}`,
    });

    res.json({ translation: response.text });
  } catch (error: any) {
    console.error('Translation error:', error);
    res.status(500).json({ error: error?.message || 'Failed to translate text' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
