const { getGeminiModel } = require('../config/gemini');

// Generate embeddings using Gemini API
const generateEmbedding = async (text) => {
  try {
    const model = getGeminiModel();
    
    // Gemini's embedding endpoint - Using embedContent from Google AI SDK
    // For now, we'll use a simpler approach with text embedding
   const response = await model.embedContent(text);


    // If embedContent is not available in this version, use alternative approach
    // This is a fallback implementation
    if (response.embedding) {
      return response.embedding.values;
    }

    // Fallback: Create a simple hash-based pseudo-embedding for demonstration
    // In production, use a proper embedding service
    return generatePseudoEmbedding(text);
  } catch (error) {
    console.error('Embedding generation error:', error.message);
    // Fallback to pseudo-embedding
    return generatePseudoEmbedding(text);
  }
};

// Fallback pseudo-embedding generator
const generatePseudoEmbedding = (text) => {
  // Create a vector of 768 dimensions (common embedding size)
  const embedding = new Array(768).fill(0);
  
  // Simple hash-based approach for demonstration
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    embedding[i % 768] += Math.sin(charCode) * 0.1;
  }
  
  // Normalize the vector
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return embedding.map(val => val / (magnitude || 1));
};

// Batch embed texts
const batchEmbedTexts = async (texts) => {
  try {
    const embeddings = [];
    
    for (const text of texts) {
      const embedding = await generateEmbedding(text);
      embeddings.push(embedding);
      
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return embeddings;
  } catch (error) {
    console.error('Batch embedding error:', error.message);
    throw error;
  }
};

module.exports = {
  generateEmbedding,
  batchEmbedTexts,
};
