const OpenAI = require("openai");

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is missing");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // Only use baseURL if you REALLY need it (Azure / proxy)
  ...(process.env.OPENAI_BASE_URL && {
    baseURL: process.env.OPENAI_BASE_URL,
  }),
});

module.exports = openai;
