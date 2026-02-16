const express = require('express');
const router = express.Router();
const upload = require('../middleware/fileUpload');
const { uploadSOP, getSOP, listSOPs } = require('../controllers/uploadController');

// Upload a new SOP document
router.post('/upload', upload.single('file'), uploadSOP);

// Get specific SOP
router.get('/:documentId', getSOP);

// List all SOPs
router.get('/', listSOPs);

module.exports = router;
