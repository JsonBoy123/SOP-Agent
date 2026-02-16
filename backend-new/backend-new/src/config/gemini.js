const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI;

const initializeGemini = () => {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
};

const getGeminiModel = () => {
  const ai = initializeGemini();
  return ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
};

module.exports = {
  initializeGemini,
  getGeminiModel,
};
