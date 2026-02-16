const { getGeminiModel } = require('../config/gemini');

const SYSTEM_PROMPT = `You are an expert AI assistant for a corporate knowledge management system called OpsMind AI. 
Your role is to answer employee questions about Standard Operating Procedures (SOPs) with accuracy and clarity.

CRITICAL RULES:
1. ALWAYS cite your sources. Every claim must reference the specific SOP document, page number, and section.
2. Use the format: "According to [Document Name] (Page X, Section Y)..."
3. If the retrieved context doesn't contain information to answer the question, explicitly state: "I don't have information about this in the current SOPs."
4. Never hallucinate or make up information.
5. Be concise but comprehensive in your responses.
6. If multiple SOPs are relevant, mention all of them.

Respond in a professional and helpful tone.`;

// Stream response using fetch with Gemini API
const streamQueryResponse = async (userQuery, retrievedContext) => {
  try {
    const model = getGeminiModel();
    
    const contextPrompt = `
RELEVANT SOP EXCERPTS:
${retrievedContext
  .map(
    (item, idx) =>
      `[Source ${idx + 1}] From: "${item.fileName}" (Page ${item.pageNumber}, Section: ${item.sectionTitle})
Content: ${item.text}
---`
  )
  .join('\n')}

USER QUESTION: ${userQuery}

INSTRUCTIONS: 
- Base your answer ONLY on the provided SOP excerpts above.
- Always reference the exact source with document name, page number, and section.
- If the information is not in the provided context, clearly state that you don't have this information.
`;

    // Use Gemini generateContentStream for streaming responses
    const result = await model.generateContentStream([
      {
        text: SYSTEM_PROMPT + '\n\n' + contextPrompt,
      },
    ]);

    return result;
  } catch (error) {
    console.error('LLM streaming error:', error.message);
    throw error;
  }
};

// Non-streaming response
const generateQueryResponse = async (userQuery, retrievedContext) => {
  try {
    const model = getGeminiModel();
    
    const contextPrompt = `
RELEVANT SOP EXCERPTS:
${retrievedContext
  .map(
    (item, idx) =>
      `[Source ${idx + 1}] From: "${item.fileName}" (Page ${item.pageNumber}, Section: ${item.sectionTitle})
Content: ${item.text.substring(0, 500)}...
---`
  )
  .join('\n')}

USER QUESTION: ${userQuery}

INSTRUCTIONS: 
Base your answer ONLY on the provided SOP excerpts above.
Always reference the exact source with document name, page number, and section.
If the information is not in the provided context, state that you don't have this information.
`;

    const response = await model.generateContent([
      {
        text: SYSTEM_PROMPT + '\n\n' + contextPrompt,
      },
    ]);

    return response.response.text();
  } catch (error) {
    console.error('LLM generation error:', error.message);
    throw error;
  }
};

module.exports = {
  streamQueryResponse,
  generateQueryResponse,
};
