const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const SOP = require('../models/sop');
const { parsePDF, chunkText } = require('../services/pdfService');
const { batchEmbedTexts } = require('../services/embeddingService');

const uploadSOP = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const documentId = uuidv4();
    const fileName = req.body.fileName || req.file.originalname;
    const filePath = req.file.path;

    console.log(`📄 Starting to process PDF: ${fileName}`);

    // Parse PDF
    const pdfData = await parsePDF(filePath);
    console.log(`📖 PDF parsed successfully. Pages: ${pdfData.numPages}`);

    // Chunk the text
    const chunks = chunkText(pdfData.text);
    console.log(`✂️  Created ${chunks.length} chunks from PDF`);

    // Generate embeddings for chunks
    const embeddings = await batchEmbedTexts(chunks);
    console.log(`🔢 Generated embeddings for ${embeddings.length} chunks`);

    // Create chunk objects with embeddings
    const chunkObjects = chunks.map((text, idx) => ({
      chunkId: `${documentId}-chunk-${idx}`,
      text,
      pageNumber: Math.ceil((idx / chunks.length) * pdfData.numPages),
      sectionTitle: `Section ${Math.floor(idx / 5) + 1}`,
      embedding: embeddings[idx],
    }));

    // Store in MongoDB
    const sopDocument = new SOP({
      documentId,
      fileName,
      filePath,
      pageCount: pdfData.numPages,
      uploadedBy: req.body.uploadedBy || 'admin',
      chunks: chunkObjects,
      isIndexed: true,
    });

    await sopDocument.save();
    console.log(`✅ SOP document saved to database: ${documentId}`);

    res.status(201).json({
      success: true,
      message: 'SOP document uploaded and indexed successfully',
      data: {
        documentId,
        fileName,
        pagesCount: pdfData.numPages,
        chunksCount: chunks.length,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload SOP document',
    });
  }
};

const getSOP = async (req, res) => {
  try {
    const { documentId } = req.params;
    const sop = await SOP.findOne({ documentId });

    if (!sop) {
      return res.status(404).json({
        success: false,
        message: 'SOP document not found',
      });
    }

    res.json({
      success: true,
      data: {
        documentId: sop.documentId,
        fileName: sop.fileName,
        pageCount: sop.pageCount,
        uploadedAt: sop.uploadedAt,
        chunksCount: sop.chunks.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const listSOPs = async (req, res) => {
  try {
    const sops = await SOP.find({}, {
      documentId: 1,
      fileName: 1,
      pageCount: 1,
      uploadedAt: 1,
      uploadedBy: 1,
    }).sort({ uploadedAt: -1 });

    res.json({
      success: true,
      data: sops,
      total: sops.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadSOP,
  getSOP,
  listSOPs,
};
