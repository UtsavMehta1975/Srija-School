const express = require('express');
const router = express.Router();
const {
  // Albums
  getAlbums,
  getAllAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  
  // Images
  getImagesByAlbum,
  getAllImages,
  createImage,
  updateImage,
  deleteImage,
  
  // Videos
  getVideos,
  getAllVideos,
  createVideo,
  updateVideo,
  deleteVideo
} = require('../controllers/galleryController');
const { authenticateToken } = require('../middleware/auth');
const { uploadGallery, uploadMultiple, handleUploadError } = require('../middleware/upload');

// Public routes
// Albums
router.get('/albums', getAlbums);
router.get('/albums/:id', getAlbum);

// Images
router.get('/albums/:albumId/images', getImagesByAlbum);

// Videos
router.get('/videos', getVideos);

// Protected routes (admin only)
// Albums
router.get('/admin/albums', authenticateToken, getAllAlbums);
router.post('/admin/albums', authenticateToken, uploadGallery, handleUploadError, createAlbum);
router.put('/admin/albums/:id', authenticateToken, uploadGallery, handleUploadError, updateAlbum);
router.delete('/admin/albums/:id', authenticateToken, deleteAlbum);

// Images
router.get('/admin/images', authenticateToken, getAllImages);
router.post('/admin/images', authenticateToken, uploadGallery, handleUploadError, createImage);
router.post('/admin/images/multiple', authenticateToken, uploadMultiple, handleUploadError, createImage);
router.put('/admin/images/:id', authenticateToken, uploadGallery, handleUploadError, updateImage);
router.delete('/admin/images/:id', authenticateToken, deleteImage);

// Videos
router.get('/admin/videos', authenticateToken, getAllVideos);
router.post('/admin/videos', authenticateToken, uploadGallery, handleUploadError, createVideo);
router.put('/admin/videos/:id', authenticateToken, uploadGallery, handleUploadError, updateVideo);
router.delete('/admin/videos/:id', authenticateToken, deleteVideo);

module.exports = router;

