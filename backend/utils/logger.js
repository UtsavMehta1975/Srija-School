const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log file paths
const logFiles = {
  error: path.join(logsDir, 'error.log'),
  info: path.join(logsDir, 'info.log'),
  debug: path.join(logsDir, 'debug.log'),
  access: path.join(logsDir, 'access.log')
};

// Helper function to format timestamp
const getTimestamp = () => {
  return new Date().toISOString();
};

// Helper function to format log message
const formatMessage = (level, message, meta = {}) => {
  const timestamp = getTimestamp();
  const metaStr = Object.keys(meta).length > 0 ? ` | ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}\n`;
};

// Helper function to write to file
const writeToFile = (filePath, message) => {
  try {
    fs.appendFileSync(filePath, message);
  } catch (error) {
    console.error('Failed to write to log file:', error.message);
  }
};

// Helper function to write to console
const writeToConsole = (level, message, meta = {}) => {
  const timestamp = getTimestamp();
  const metaStr = Object.keys(meta).length > 0 ? ` | ${JSON.stringify(meta)}` : '';
  
  switch (level) {
    case 'error':
      console.error(`[${timestamp}] [ERROR] ${message}${metaStr}`);
      break;
    case 'warn':
      console.warn(`[${timestamp}] [WARN] ${message}${metaStr}`);
      break;
    case 'info':
      console.info(`[${timestamp}] [INFO] ${message}${metaStr}`);
      break;
    case 'debug':
      console.debug(`[${timestamp}] [DEBUG] ${message}${metaStr}`);
      break;
    default:
      console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`);
  }
};

// Logger class
class Logger {
  constructor() {
    this.logLevel = process.env.LOG_LEVEL || 'info';
    this.enableConsole = process.env.NODE_ENV !== 'production';
    this.enableFile = true;
  }

  // Set log level
  setLevel(level) {
    this.logLevel = level;
  }

  // Check if log level should be logged
  shouldLog(level) {
    const levels = ['error', 'warn', 'info', 'debug'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex <= currentLevelIndex;
  }

  // Log error
  error(message, meta = {}) {
    if (this.shouldLog('error')) {
      const formattedMessage = formatMessage('error', message, meta);
      
      if (this.enableConsole) {
        writeToConsole('error', message, meta);
      }
      
      if (this.enableFile) {
        writeToFile(logFiles.error, formattedMessage);
      }
    }
  }

  // Log warning
  warn(message, meta = {}) {
    if (this.shouldLog('warn')) {
      const formattedMessage = formatMessage('warn', message, meta);
      
      if (this.enableConsole) {
        writeToConsole('warn', message, meta);
      }
      
      if (this.enableFile) {
        writeToFile(logFiles.info, formattedMessage);
      }
    }
  }

  // Log info
  info(message, meta = {}) {
    if (this.shouldLog('info')) {
      const formattedMessage = formatMessage('info', message, meta);
      
      if (this.enableConsole) {
        writeToConsole('info', message, meta);
      }
      
      if (this.enableFile) {
        writeToFile(logFiles.info, formattedMessage);
      }
    }
  }

  // Log debug
  debug(message, meta = {}) {
    if (this.shouldLog('debug')) {
      const formattedMessage = formatMessage('debug', message, meta);
      
      if (this.enableConsole) {
        writeToConsole('debug', message, meta);
      }
      
      if (this.enableFile) {
        writeToFile(logFiles.debug, formattedMessage);
      }
    }
  }

  // Log access (for HTTP requests)
  access(req, res, responseTime) {
    const message = `${req.method} ${req.originalUrl} ${res.statusCode} - ${responseTime}ms - ${req.ip}`;
    const meta = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: responseTime,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    };
    
    const formattedMessage = formatMessage('access', message, meta);
    
    if (this.enableFile) {
      writeToFile(logFiles.access, formattedMessage);
    }
  }

  // Log database operations
  db(operation, table, query, duration, error = null) {
    const message = `DB ${operation} on ${table} - ${duration}ms`;
    const meta = {
      operation,
      table,
      query: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
      duration,
      error: error ? error.message : null
    };
    
    if (error) {
      this.error(message, meta);
    } else {
      this.debug(message, meta);
    }
  }

  // Log API requests
  api(method, endpoint, statusCode, duration, userId = null) {
    const message = `API ${method} ${endpoint} - ${statusCode} - ${duration}ms`;
    const meta = {
      method,
      endpoint,
      statusCode,
      duration,
      userId
    };
    
    if (statusCode >= 400) {
      this.error(message, meta);
    } else {
      this.info(message, meta);
    }
  }

  // Log authentication events
  auth(event, userId = null, success = true, details = {}) {
    const message = `AUTH ${event} - ${success ? 'SUCCESS' : 'FAILED'}`;
    const meta = {
      event,
      userId,
      success,
      ...details
    };
    
    if (success) {
      this.info(message, meta);
    } else {
      this.warn(message, meta);
    }
  }

  // Log file operations
  file(operation, filename, size = null, error = null) {
    const message = `FILE ${operation} - ${filename}`;
    const meta = {
      operation,
      filename,
      size,
      error: error ? error.message : null
    };
    
    if (error) {
      this.error(message, meta);
    } else {
      this.info(message, meta);
    }
  }
}

// Create singleton instance
const logger = new Logger();

module.exports = logger;



