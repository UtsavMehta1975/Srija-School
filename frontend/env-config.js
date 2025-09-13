// Frontend Environment Configuration
// Copy this file to .env in the frontend directory

export const config = {
  // API Configuration
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  
  // Environment Settings
  ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT || 'development',
  DEBUG: process.env.REACT_APP_DEBUG === 'true' || true,
  
  // Logging
  LOG_LEVEL: process.env.REACT_APP_LOG_LEVEL || 'debug'
};

// Logging utility
export const log = (message, data = null, level = 'info') => {
  if (config.DEBUG || level === 'error') {
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
        console.log(logMessage, data);
        break;
      default:
        console.log(logMessage, data);
    }
  }
};

export default config;

