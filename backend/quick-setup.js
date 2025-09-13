const mysql = require('mysql2/promise');
require('dotenv').config();

async function quickSetup() {
  console.log('🚀 Starting database setup...');
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log('✅ Connected to database!');

    // Create admin_users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created admin_users table');

    // Create carousel_slides table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS carousel_slides (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(500) NOT NULL,
        link_url VARCHAR(500),
        is_active BOOLEAN DEFAULT TRUE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created carousel_slides table');

    // Create faculty table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS faculty (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        department VARCHAR(255),
        qualification TEXT,
        experience VARCHAR(255),
        email VARCHAR(100),
        phone VARCHAR(20),
        image_url VARCHAR(500),
        bio TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created faculty table');

    // Create about_content table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS about_content (
        id INT AUTO_INCREMENT PRIMARY KEY,
        section VARCHAR(100) NOT NULL UNIQUE,
        title VARCHAR(255),
        content TEXT NOT NULL,
        image_url VARCHAR(500),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created about_content table');

    // Create messages table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created messages table');

    // Create gallery tables
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS gallery_albums (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        cover_image VARCHAR(500),
        is_active BOOLEAN DEFAULT TRUE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created gallery_albums table');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS gallery_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        album_id INT,
        title VARCHAR(255),
        description TEXT,
        image_url VARCHAR(500) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (album_id) REFERENCES gallery_albums(id) ON DELETE SET NULL
      )
    `);
    console.log('✅ Created gallery_images table');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS gallery_videos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        video_url VARCHAR(500) NOT NULL,
        thumbnail_url VARCHAR(500),
        is_active BOOLEAN DEFAULT TRUE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created gallery_videos table');

    // Insert default admin user
    await connection.execute(`
      INSERT IGNORE INTO admin_users (username, password, email) VALUES 
      ('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@genesisschool.com')
    `);
    console.log('✅ Inserted default admin user (admin/admin123)');

    // Insert sample data
    await connection.execute(`
      INSERT IGNORE INTO about_content (section, title, content) VALUES 
      ('mission', 'Our Mission', 'To provide quality education that nurtures young minds and prepares them for a successful future.'),
      ('vision', 'Our Vision', 'To be a leading educational institution that shapes tomorrow\\'s leaders through innovative teaching and holistic development.'),
      ('history', 'Our History', 'Genesis School was established in 1995 with a vision to provide world-class education. Over the years, we have grown to become one of the most respected educational institutions in the region.'),
      ('facilities', 'Our Facilities', 'We boast state-of-the-art facilities including modern classrooms, science laboratories, computer labs, library, sports facilities, and more.')
    `);
    console.log('✅ Inserted sample about content');

    await connection.execute(`
      INSERT IGNORE INTO carousel_slides (title, description, image_url, link_url, sort_order) VALUES 
      ('Welcome to Genesis School', 'Excellence in Education Since 1995', '/uploads/carousel/slide1.jpg', '/about', 1),
      ('Quality Education', 'Nurturing Young Minds for Tomorrow', '/uploads/carousel/slide2.jpg', '/about', 2),
      ('Modern Facilities', 'State-of-the-art Learning Environment', '/uploads/carousel/slide3.jpg', '/gallery', 3)
    `);
    console.log('✅ Inserted sample carousel slides');

    await connection.execute(`
      INSERT IGNORE INTO faculty (name, position, department, qualification, experience, email, image_url, bio) VALUES 
      ('Dr. Sarah Johnson', 'Principal', 'Administration', 'Ph.D. in Education', '15 years', 'principal@genesisschool.com', '/uploads/faculty/principal.jpg', 'Dr. Sarah Johnson has been leading Genesis School for over 10 years with a vision of academic excellence.'),
      ('Mr. Michael Chen', 'Head of Mathematics', 'Mathematics', 'M.Sc. Mathematics', '12 years', 'mchen@genesisschool.com', '/uploads/faculty/math_head.jpg', 'Mr. Chen is passionate about making mathematics accessible and enjoyable for all students.'),
      ('Ms. Emily Davis', 'Head of Science', 'Science', 'M.Sc. Physics', '10 years', 'edavis@genesisschool.com', '/uploads/faculty/science_head.jpg', 'Ms. Davis brings hands-on learning experiences to the science department.')
    `);
    console.log('✅ Inserted sample faculty');

    await connection.execute(`
      INSERT IGNORE INTO gallery_albums (name, description, cover_image, sort_order) VALUES 
      ('School Events', 'Annual events and celebrations', '/uploads/gallery/events_cover.jpg', 1),
      ('Sports Day', 'Annual sports day activities', '/uploads/gallery/sports_cover.jpg', 2),
      ('Science Fair', 'Student science projects and exhibitions', '/uploads/gallery/science_cover.jpg', 3)
    `);
    console.log('✅ Inserted sample gallery albums');

    await connection.end();
    console.log('🎉 Database setup completed successfully!');
    console.log('🔑 Admin Login: username=admin, password=admin123');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

quickSetup();

