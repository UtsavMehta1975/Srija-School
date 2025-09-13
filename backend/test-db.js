const mysql = require('mysql2/promise');
require('dotenv').config();

async function testDB() {
  console.log('Testing database connection...');
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_NAME:', process.env.DB_NAME);
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log('✅ Connected to database successfully!');
    
    // Test creating a simple table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS test_table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
      )
    `);
    console.log('✅ Test table created successfully!');
    
    await connection.end();
    console.log('✅ Database test completed!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  }
}

testDB();

