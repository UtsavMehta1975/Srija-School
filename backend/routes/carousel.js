const express = require('express');
const router = express.Router();
const {
  getCarouselSlides,
  getAllCarouselSlides,
  getCarouselSlide,
  createCarouselSlide,
  updateCarouselSlide,
  deleteCarouselSlide
} = require('../controllers/carouselController');
const { authenticateToken } = require('../middleware/auth');
const { uploadCarousel, handleUploadError } = require('../middleware/upload');

// Public routes
router.get('/', getCarouselSlides);
router.get('/:id', getCarouselSlide);

// Protected routes (admin only)
router.get('/admin/all', authenticateToken, getAllCarouselSlides);
router.post('/', authenticateToken, uploadCarousel, handleUploadError, createCarouselSlide);
router.put('/:id', authenticateToken, uploadCarousel, handleUploadError, updateCarouselSlide);
router.delete('/:id', authenticateToken, deleteCarouselSlide);

module.exports = router;

