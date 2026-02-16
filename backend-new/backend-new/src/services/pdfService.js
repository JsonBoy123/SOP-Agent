const pdfParse = require('pdf-parse');
const fs = require('fs');

const PDF_CHUNK_SIZE = 1000;
const PDF_CHUNK_OVERLAP = 100;

const parsePDF = async (filePath) => {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(fileBuffer);
    
    return {
      text: pdfData.text,
      numPages: pdfData.numpages,
      metadata: pdfData.metadata,
    };
  } catch (error) {
    console.error('PDF parsing error:', error.message);
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
};

const chunkText = (text, chunkSize = PDF_CHUNK_SIZE, overlap = PDF_CHUNK_OVERLAP) => {
  const chunks = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    const endIndex = Math.min(startIndex + chunkSize, text.length);
    const chunk = text.substring(startIndex, endIndex).trim();
    
    if (chunk.length > 0) {
      chunks.push(chunk);
    }
    
    startIndex = endIndex - overlap;
  }

  return chunks;
};

const extractPageNumber = (text, pageIndex) => {
  // Simple heuristic: look for page markers or use chunk position
  const pageMarker = text.match(`Page\\s*(${pageIndex + 1})`);
  return pageMarker ? parseInt(pageMarker[1]) : pageIndex + 1;
};

module.exports = {
  parsePDF,
  chunkText,
  extractPageNumber,
};
