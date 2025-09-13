const { pool } = require('../config/database');

// Submit contact form message
const submitMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const [result] = await pool.execute(
      'INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone || null, subject || null, message]
    );

    res.status(201).json({
      success: true,
      message: 'Message sent successfully. We will get back to you soon!',
      data: {
        id: result.insertId,
        name,
        email,
        phone,
        subject,
        message
      }
    });
  } catch (error) {
    console.error('Submit message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
};

// Get all messages (admin)
const getAllMessages = async (req, res) => {
  try {
    const [messages] = await pool.execute(
      'SELECT * FROM messages ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error('Get all messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages'
    });
  }
};

// Get single message (admin)
const getMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const [messages] = await pool.execute(
      'SELECT * FROM messages WHERE id = ?',
      [id]
    );

    if (messages.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      data: messages[0]
    });
  } catch (error) {
    console.error('Get message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch message'
    });
  }
};

// Mark message as read (admin)
const markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'UPDATE messages SET is_read = TRUE, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message marked as read'
    });
  } catch (error) {
    console.error('Mark message as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update message'
    });
  }
};

// Mark message as unread (admin)
const markMessageAsUnread = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'UPDATE messages SET is_read = FALSE, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message marked as unread'
    });
  } catch (error) {
    console.error('Mark message as unread error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update message'
    });
  }
};

// Delete message (admin)
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM messages WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete message'
    });
  }
};

// Get message statistics (admin)
const getMessageStats = async (req, res) => {
  try {
    const [totalMessages] = await pool.execute(
      'SELECT COUNT(*) as total FROM messages'
    );

    const [unreadMessages] = await pool.execute(
      'SELECT COUNT(*) as unread FROM messages WHERE is_read = FALSE'
    );

    const [todayMessages] = await pool.execute(
      'SELECT COUNT(*) as today FROM messages WHERE DATE(created_at) = CURDATE()'
    );

    const [thisWeekMessages] = await pool.execute(
      'SELECT COUNT(*) as thisWeek FROM messages WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
    );

    res.json({
      success: true,
      data: {
        total: totalMessages[0].total,
        unread: unreadMessages[0].unread,
        today: todayMessages[0].today,
        thisWeek: thisWeekMessages[0].thisWeek
      }
    });
  } catch (error) {
    console.error('Get message stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch message statistics'
    });
  }
};

module.exports = {
  submitMessage,
  getAllMessages,
  getMessage,
  markMessageAsRead,
  markMessageAsUnread,
  deleteMessage,
  getMessageStats
};

