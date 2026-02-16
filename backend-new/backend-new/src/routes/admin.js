const express = require('express');
const router = express.Router();
const { deleteSOP, getAdminStats, reindexDocument } = require('../controllers/adminController');

// Get admin statistics
router.get('/stats', getAdminStats);

// Delete an SOP document
router.delete('/delete/:documentId', deleteSOP);

// Reindex a document
router.put('/reindex/:documentId', reindexDocument);

module.exports = router;
