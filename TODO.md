# Switch from OpenAI to Gemini API

## Information Gathered
- Current setup uses OpenAI API with openai package.
- Chat controller uses OpenAI's chat completions API.
- Configuration is in openai-config.ts.
- Environment variable is OPEN_AI_SECRET.
- User model stores chats with role and content.

## Plan
- [ ] Update backend/package.json: Remove openai, add @google/generative-ai.
- [ ] Rename backend/src/config/openai-config.ts to gemini-config.ts and update to use Gemini API.
- [ ] Update backend/src/controllers/chat-controllers.ts to use Gemini API instead of OpenAI.
- [ ] Update error handling in chat controller for Gemini API errors.
- [ ] Update backend/README.md to reflect Gemini instead of OpenAI.
- [ ] Update environment variable from OPEN_AI_SECRET to GEMINI_API_KEY.

## Dependent Files to be edited
- backend/package.json
- backend/src/config/openai-config.ts (rename and update)
- backend/src/controllers/chat-controllers.ts
- backend/README.md

## Followup steps
- [ ] Install new dependencies.
- [ ] Test the chat functionality.
- [ ] Update .env file with new API key.
