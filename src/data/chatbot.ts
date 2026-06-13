// Chatbot configuration.
//
// workerUrl: paste the URL you get after deploying the Cloudflare Worker
//   (`npx wrangler deploy` prints it, e.g. https://nazrul-chatbot.<your-subdomain>.workers.dev).
//   While this is empty, the chat widget still appears but shows a friendly
//   "not configured yet" note instead of calling a backend.
export const chatbotConfig = {
  workerUrl: 'https://nazrul-chatbot.nazrulirfanradi.workers.dev',

  // First message the assistant shows when the chat opens.
  greeting:
    "Hi! 👋 I'm Nazrul's AI assistant. Ask me anything about his experience, projects, skills, or how to get in touch.",

  // Clickable starter questions shown under the greeting.
  starters: [
    'What does Nazrul do at BASF?',
    'What are his strongest data skills?',
    'Tell me about his best projects',
    'How can I contact him?',
  ],

  // Max characters a visitor can send (mirrors the backend cap).
  maxInputChars: 500,
}
