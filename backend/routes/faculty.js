const express = require('express');
const router = express.Router();
const {
  getFaculty,
  getAllFaculty,
  getFacultyMember,
  createFacultyMember,
  updateFacultyMember,
  deleteFacultyMember
} = require('../controllers/facultyController');
const { authenticateToken } = require('../middleware/auth');
const { uploadFaculty, handleUploadError } = require('../middleware/upload');

// Public routes
router.get('/', getFaculty);
router.get('/:id', getFacultyMember);

// Protected routes (admin only)
router.get('/admin/all', authenticateToken, getAllFaculty);
router.post('/', authenticateToken, uploadFaculty, handleUploadError, createFacultyMember);
router.put('/:id', authenticateToken, uploadFaculty, handleUploadError, updateFacultyMember);
router.delete('/:id', authenticateToken, deleteFacultyMember);

module.exports = router;

