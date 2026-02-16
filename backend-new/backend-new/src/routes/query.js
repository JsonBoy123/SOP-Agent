const express = require('express');
const router = express.Router();
const { queryAgent } = require('../controllers/queryController');

// Query the agent
router.post('/', queryAgent);

module.exports = router;
