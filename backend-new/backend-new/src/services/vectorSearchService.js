const SOP = require('../models/sop');
const { generateEmbedding } = require('./embeddingService');

// Cosine similarity calculation
const cosineSimilarity = (vecA, vecB) => {
  if (vecA.length !== vecB.length) {
    return 0;
  }
  
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }
  
  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);
  
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }
  
  return dotProduct / (magnitudeA * magnitudeB);
};

// Vector search using aggregation pipeline
const vectorSearch = async (queryText, topK = 5) => {
  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(queryText);
    
    // Fetch all SOPs with chunks
    const documents = await SOP.find({ isIndexed: true });
    
    const results = [];
    
    // Search through all chunks
    for (const doc of documents) {
      for (const chunk of doc.chunks) {
        if (chunk.embedding && chunk.embedding.length > 0) {
          const similarity = cosineSimilarity(queryEmbedding, chunk.embedding);
          
          if (similarity > 0.3) { // Threshold to filter low-relevance chunks
            results.push({
              similarity,
              chunk,
              documentId: doc.documentId,
              fileName: doc.fileName,
              chunkId: chunk.chunkId,
              pageNumber: chunk.pageNumber,
              sectionTitle: chunk.sectionTitle,
              text: chunk.text,
            });
          }
        }
      }
    }
    
    // Sort by similarity and return top K
    return results
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);
  } catch (error) {
    console.error('Vector search error:', error.message);
    throw error;
  }
};

// MongoDB native Vector Search (Atlas Vector Search)
const mongoVectorSearch = async (queryEmbedding, topK = 5) => {
  try {
    const results = await SOP.aggregate([
      {
        $search: {
          cosmosSearch: {
            vector: queryEmbedding,
            k: topK,
          },
          returnStoredSource: true,
        },
      },
      {
        $project: {
          similarityScore: { $meta: 'searchScore' },
          document: '$$ROOT',
        },
      },
      {
        $limit: topK,
      },
    ]);
    
    return results;
  } catch (error) {
    // Fallback to regular search if vector search not configured
    console.warn('Vector search not configured, using fallback search');
    return [];
  }
};

module.exports = {
  vectorSearch,
  mongoVectorSearch,
  cosineSimilarity,
};
