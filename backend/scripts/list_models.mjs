import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';

(async () => {
  try {
    const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const list = await client.listModels();
    console.log('Available models:');
    console.log(JSON.stringify(list, null, 2));
  } catch (err) {
    console.error('Error listing models:', err);
    process.exit(1);
  }
})();
