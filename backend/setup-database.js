const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  try {
    console.log('🔗 Connecting to MySQL database...');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '185.196.21.112',
      user: process.env.DB_USER || 'srijan',
      password: process.env.DB_PASSWORD || 'SrijanSecure@2025!',
      database: process.env.DB_NAME || 'srijadb',
      port: process.env.DB_PORT || 3306
    });

    console.log('✅ Connected to database successfully!');

    // Read the schema file
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('📖 Reading schema file...');
    console.log('Schema length:', schema.length);
    console.log('First 200 chars:', schema.substring(0, 200));

    // Clean up the schema and split into statements
    let cleanSchema = schema
      .replace(/--.*$/gm, '') // Remove line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .trim();
    
    // Split by semicolon and filter
    const statements = cleanSchema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    console.log(`🚀 Executing ${statements.length} SQL statements...`);
    console.log('First statement:', statements[0] ? statements[0].substring(0, 100) : 'No statements found');

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          await connection.execute(statement);
          console.log(`✅ Statement ${i + 1}/${statements.length} executed successfully`);
        } catch (error) {
          if (error.code === 'ER_TABLE_EXISTS_ERROR' || error.code === 'ER_DUP_ENTRY') {
            console.log(`⚠️  Statement ${i + 1}/${statements.length} - Table/Data already exists (skipping)`);
          } else {
            console.error(`❌ Error in statement ${i + 1}:`, error.message);
          }
        }
      }
    }

    console.log('🎉 Database setup completed successfully!');
    console.log('📊 Tables created:');
    console.log('   - admin_users (with default admin: admin/admin123)');
    console.log('   - carousel_slides (with sample slides)');
    console.log('   - faculty (with sample faculty)');
    console.log('   - gallery_albums, gallery_images, gallery_videos');
    console.log('   - messages (for contact form)');
    console.log('   - about_content (with sample content)');

    await connection.end();
    console.log('🔌 Database connection closed.');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();

