// Backend Environment Configuration
// Copy this file to .env in the backend directory

const config = {
  // Database Configuration - New MySQL Server
  DB_HOST: process.env.DB_HOST || '185.196.21.112',
  DB_USER: process.env.DB_USER || 'srijan',
  DB_PASSWORD: process.env.DB_PASSWORD || 'SrijanSecure@2025!',
  DB_NAME: process.env.DB_NAME || 'srijadb',
  DB_PORT: process.env.DB_PORT || 3306,

  // Server Configuration
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Client Configuration
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',

  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here_change_in_production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',

  // File Upload Configuration
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 5242880, // 5MB
  MAX_FILES: parseInt(process.env.MAX_FILES) || 10,

  // Logging Configuration
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug'
};

// Logging utility
const log = (message, data = null, level = 'info') => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  
  switch (level) {
    case 'error':
      console.error(logMessage, data);
      break;
    case 'warn':
      console.warn(logMessage, data);
      break;
    case 'debug':
      if (config.LOG_LEVEL === 'debug') {
        console.log(logMessage, data);
      }
      break;
    default:
      console.log(logMessage, data);
  }
};

module.exports = {
  config,
  log
};

