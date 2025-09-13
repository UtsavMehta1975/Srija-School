-- Srijan School Database Schema
-- Run this script to create all necessary tables

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create carousel_slides table
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
);

-- Create faculty table
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
);

-- Create gallery_albums table
CREATE TABLE IF NOT EXISTS gallery_albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cover_image VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create gallery_images table
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
);

-- Create gallery_videos table
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
);

-- Create messages table (contact form submissions)
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
);

-- Create about_content table
CREATE TABLE IF NOT EXISTS about_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255),
    content TEXT NOT NULL,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
-- Password is hashed using bcrypt with salt rounds 10
INSERT INTO admin_users (username, password, email) VALUES 
('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@srijanschool.com')
ON DUPLICATE KEY UPDATE username=username;

-- Insert default about content
INSERT INTO about_content (section, title, content) VALUES 
('mission', 'Our Mission', 'To provide quality education that nurtures young minds and prepares them for a successful future.'),
('vision', 'Our Vision', 'To be a leading educational institution that shapes tomorrow\'s leaders through innovative teaching and holistic development.'),
('history', 'Our History', 'Srijan School was established in 1995 with a vision to provide world-class education. Over the years, we have grown to become one of the most respected educational institutions in the region.'),
('facilities', 'Our Facilities', 'We boast state-of-the-art facilities including modern classrooms, science laboratories, computer labs, library, sports facilities, and more.')
ON DUPLICATE KEY UPDATE content=VALUES(content);

-- Insert sample carousel slides
INSERT INTO carousel_slides (title, description, image_url, link_url, sort_order) VALUES 
('Welcome to Srijan School', 'Excellence in Education Since 1995', '/uploads/carousel/slide1.jpg', '/about', 1),
('Quality Education', 'Nurturing Young Minds for Tomorrow', '/uploads/carousel/slide2.jpg', '/about', 2),
('Modern Facilities', 'State-of-the-art Learning Environment', '/uploads/carousel/slide3.jpg', '/gallery', 3)
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- Insert sample faculty
INSERT INTO faculty (name, position, department, qualification, experience, email, image_url, bio) VALUES 
('Dr. Sarah Johnson', 'Principal', 'Administration', 'Ph.D. in Education', '15 years', 'principal@srijanschool.com', '/uploads/faculty/principal.jpg', 'Dr. Sarah Johnson has been leading Srijan School for over 10 years with a vision of academic excellence.'),
('Mr. Michael Chen', 'Head of Mathematics', 'Mathematics', 'M.Sc. Mathematics', '12 years', 'mchen@srijanschool.com', '/uploads/faculty/math_head.jpg', 'Mr. Chen is passionate about making mathematics accessible and enjoyable for all students.'),
('Ms. Emily Davis', 'Head of Science', 'Science', 'M.Sc. Physics', '10 years', 'edavis@srijanschool.com', '/uploads/faculty/science_head.jpg', 'Ms. Davis brings hands-on learning experiences to the science department.')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Insert sample gallery albums
INSERT INTO gallery_albums (name, description, cover_image, sort_order) VALUES 
('School Events', 'Annual events and celebrations', '/uploads/gallery/events_cover.jpg', 1),
('Sports Day', 'Annual sports day activities', '/uploads/gallery/sports_cover.jpg', 2),
('Science Fair', 'Student science projects and exhibitions', '/uploads/gallery/science_cover.jpg', 3)
ON DUPLICATE KEY UPDATE name=VALUES(name);

