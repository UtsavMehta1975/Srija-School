const express = require('express');
const router = express.Router();
const {
  submitMessage,
  getAllMessages,
  getMessage,
  markMessageAsRead,
  markMessageAsUnread,
  deleteMessage,
  getMessageStats
} = require('../controllers/messageController');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.post('/', submitMessage);

// Protected routes (admin only)
router.get('/admin', authenticateToken, getAllMessages);
router.get('/admin/stats', authenticateToken, getMessageStats);
router.get('/admin/:id', authenticateToken, getMessage);
router.put('/admin/:id/read', authenticateToken, markMessageAsRead);
router.put('/admin/:id/unread', authenticateToken, markMessageAsUnread);
router.delete('/admin/:id', authenticateToken, deleteMessage);

module.exports = router;

