const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { testConnection } = require('./config/database');

console.log('checkpoint 1 server.js - Starting Srijan School Backend Server...');

// Import routes
const authRoutes = require('./routes/auth');
const carouselRoutes = require('./routes/carousel');
const facultyRoutes = require('./routes/faculty');
const galleryRoutes = require('./routes/gallery');
const messageRoutes = require('./routes/messages');
const aboutRoutes = require('./routes/about');

console.log('checkpoint 2 server.js - Routes imported successfully');

const app = express();
const PORT = process.env.PORT || 3001;

console.log(`checkpoint 3 server.js - Server configured for port ${PORT}`);

// Test database connection
console.log('checkpoint 4 server.js - Initiating database connection test...');
testConnection();

// Middleware
console.log('checkpoint 5 server.js - Setting up middleware...');
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`checkpoint 6 server.js - Request: ${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  next();
});

// CORS configuration
console.log('checkpoint 7 server.js - Configuring CORS...');
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:3000',
    'https://srija-school.vercel.app',
    'https://srija-school-git-main-utsavmehta1975.vercel.app',
    'https://srija-school-utsavmehta1975.vercel.app',
    'https://*.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files from uploads directory
console.log('checkpoint 8 server.js - Setting up static file serving...');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('checkpoint 9 server.js - Health check requested');
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
console.log('checkpoint 10 server.js - Setting up API routes...');
app.use('/api/admin', authRoutes);
app.use('/api/carousel', carouselRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/about', aboutRoutes);

// 404 handler
app.use('*', (req, res) => {
  console.log(`checkpoint 11 server.js - 404 Error: Route not found - ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.log('checkpoint 12 server.js - Global error handler triggered', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });
  console.error('Global error handler:', err);
  
  // Handle multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File too large. Maximum size is 5MB.'
    });
  }
  
  if (err.code === 'LIMIT_FILE_COUNT') {
    return res.status(400).json({
      success: false,
      message: 'Too many files. Maximum is 10 files.'
    });
  }
  
  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }
  
  // Default error response
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`checkpoint 13 server.js - Server running on port ${PORT}`);
  console.log(`checkpoint 14 server.js - Uploads served from: ${path.join(__dirname, 'uploads')}`);
  console.log(`checkpoint 15 server.js - CORS enabled for: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Uploads served from: ${path.join(__dirname, 'uploads')}`);
  console.log(`🌐 CORS enabled for: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
});

module.exports = app;

