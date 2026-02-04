import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const configureOpenAI = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET,
});

export default configureOpenAI;

