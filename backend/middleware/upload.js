const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const createUploadDirs = () => {
  const dirs = [
    'uploads',
    'uploads/carousel',
    'uploads/faculty',
    'uploads/gallery',
    'uploads/about'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

// Initialize upload directories
createUploadDirs();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';
    
    // Determine upload path based on the field name or route
    if (file.fieldname === 'carouselImage') {
      uploadPath = 'uploads/carousel/';
    } else if (file.fieldname === 'facultyImage') {
      uploadPath = 'uploads/faculty/';
    } else if (file.fieldname === 'galleryImage') {
      uploadPath = 'uploads/gallery/';
    } else if (file.fieldname === 'aboutImage') {
      uploadPath = 'uploads/about/';
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp and random string
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + extension;
    cb(null, filename);
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, JPG, PNG, GIF, WebP) are allowed!'));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter
});

// Middleware for different upload types
const uploadCarousel = upload.single('carouselImage');
const uploadFaculty = upload.single('facultyImage');
const uploadGallery = upload.single('galleryImage');
const uploadAbout = upload.single('aboutImage');
const uploadMultiple = upload.array('galleryImages', 10); // Max 10 files

// Error handling middleware
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
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
  }
  
  if (err.message === 'Only image files (JPEG, JPG, PNG, GIF, WebP) are allowed!') {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  next(err);
};

module.exports = {
  uploadCarousel,
  uploadFaculty,
  uploadGallery,
  uploadAbout,
  uploadMultiple,
  handleUploadError
};

