const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require("dotenv");
const connectDB = require('./config/mongodb');
const errorHandler = require('./middleware/errorHandler');
dotenv.config();
// require('dotenv').config('path:'.env);

// Import routes
const uploadRoutes = require('./routes/upload');
const queryRoutes = require('./routes/query');
const adminRoutes = require('./routes/admin');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadDir = process.env.UPLOAD_DIR || './uploads';
if (!require('fs').existsSync(uploadDir)) {
  require('fs').mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

// Routes
app.use('/api/v1/sops', uploadRoutes);
app.use('/api/v1/query', queryRoutes);
app.use('/api/v1/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'OpsMind AI Backend is running',
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'OpsMind AI - Enterprise SOP Agent API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      upload: 'POST /api/v1/sops/upload',
      query: 'POST /api/v1/query',
      admin: '/api/v1/admin/stats',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// Error handler
app.use(errorHandler);

module.exports = app;
