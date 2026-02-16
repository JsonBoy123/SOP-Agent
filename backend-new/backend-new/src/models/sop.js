const mongoose = require('mongoose');

const sopSchema = new mongoose.Schema(
  {
    documentId: {
      type: String,
      required: true,
      unique: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    pageCount: Number,
    uploadedBy: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    chunks: [
      {
        chunkId: String,
        text: String,
        pageNumber: Number,
        sectionTitle: String,
        embedding: [Number], // Vector embedding
      },
    ],
    isIndexed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create sparse index for vector search on embeddings
sopSchema.index({ 'chunks.embedding': '2dsphere' });

module.exports = mongoose.model('SOP', sopSchema);
