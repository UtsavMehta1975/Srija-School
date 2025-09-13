const express = require('express');
const router = express.Router();
const {
  getAboutContent,
  getAllAboutContent,
  getAboutSection,
  createAboutSection,
  updateAboutSection,
  deleteAboutSection
} = require('../controllers/aboutController');
const { authenticateToken } = require('../middleware/auth');
const { uploadAbout, handleUploadError } = require('../middleware/upload');

// Public routes
router.get('/', getAboutContent);
router.get('/:section', getAboutSection);

// Protected routes (admin only)
router.get('/admin/all', authenticateToken, getAllAboutContent);
router.post('/admin', authenticateToken, uploadAbout, handleUploadError, createAboutSection);
router.put('/admin/:section', authenticateToken, uploadAbout, handleUploadError, updateAboutSection);
router.delete('/admin/:section', authenticateToken, deleteAboutSection);

module.exports = router;

