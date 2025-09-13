const mysql = require('mysql2');
require('dotenv').config();

console.log('checkpoint 1 database.js - Database configuration loading');

// Create connection pool for better performance
const pool = mysql.createPool({
  host: process.env.DB_HOST || '185.196.21.112',
  user: process.env.DB_USER || 'srijan',
  password: process.env.DB_PASSWORD || 'SrijanSecure@2025!',
  database: process.env.DB_NAME || 'srijadb',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Remove deprecated options that cause warnings
  // acquireTimeout: 60000,
  // timeout: 60000,
  // reconnect: true
});

console.log('checkpoint 2 database.js - Database pool created successfully');

// Get a promise-based connection
const promisePool = pool.promise();

// Test database connection
const testConnection = async () => {
  try {
    console.log('checkpoint 3 database.js - Testing database connection...');
    const connection = await promisePool.getConnection();
    console.log('checkpoint 4 database.js - Database connected successfully', {
      host: process.env.DB_HOST || '185.196.21.112',
      database: process.env.DB_NAME || 'srijadb',
      port: process.env.DB_PORT || 3306
    });
    connection.release();
    console.log('checkpoint 5 database.js - Database connection released');
  } catch (error) {
    console.log('checkpoint 6 database.js - Database connection failed', {
      error: error.message,
      host: process.env.DB_HOST || '185.196.21.112',
      database: process.env.DB_NAME || 'srijadb',
      port: process.env.DB_PORT || 3306
    });
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = {
  pool: promisePool,
  testConnection
};

