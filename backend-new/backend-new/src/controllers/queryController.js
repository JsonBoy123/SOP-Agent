const { vectorSearch } = require('../services/vectorSearchService');
const { generateQueryResponse, streamQueryResponse } = require('../services/llmService');

const queryAgent = async (req, res) => {
  try {
    const { query, stream = false } = req.body;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Query cannot be empty',
      });
    }

    console.log(`🔍 Processing query: ${query}`);

    // Retrieve relevant chunks from vector search
    const retrievedChunks = await vectorSearch(query, 5);

    if (retrievedChunks.length === 0) {
      return res.json({
        success: true,
        response: "I couldn't find relevant information in the current SOPs to answer your question. Please try a different query or contact the admin.",
        sources: [],
      });
    }

    console.log(`📚 Retrieved ${retrievedChunks.length} relevant chunks`);

    // Format context for LLM
    const contextualChunks = retrievedChunks.map(chunk => ({
      fileName: chunk.fileName,
      pageNumber: chunk.pageNumber,
      sectionTitle: chunk.sectionTitle,
      text: chunk.text,
    }));

    // Generate response
    if (stream) {
      // Streaming response
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      try {
        const result = await streamQueryResponse(query, contextualChunks);
        
        // Stream the response text
        for await (const chunk of result.stream) {
          const text = chunk.candidates[0]?.content?.parts[0]?.text || '';
          if (text) {
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
          }
        }

        // Send sources at the end
        const sourcesData = {
          sources: contextualChunks.map((chunk, idx) => ({
            id: idx + 1,
            fileName: chunk.fileName,
            pageNumber: chunk.pageNumber,
            sectionTitle: chunk.sectionTitle,
          })),
        };
        
        res.write(`data: ${JSON.stringify(sourcesData)}\n\n`);
        res.write('data: [DONE]\n\n');
        res.end();
      } catch (error) {
        res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
        res.end();
      }
    } else {
      // Non-streaming response
      const response = await generateQueryResponse(query, contextualChunks);

      res.json({
        success: true,
        response,
        sources: contextualChunks.map((chunk, idx) => ({
          id: idx + 1,
          fileName: chunk.fileName,
          pageNumber: chunk.pageNumber,
          sectionTitle: chunk.sectionTitle,
        })),
      });
    }
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to process query',
    });
  }
};

module.exports = {
  queryAgent,
};
