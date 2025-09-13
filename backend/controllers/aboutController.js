const { pool } = require('../config/database');

// Get all about content
const getAboutContent = async (req, res) => {
  try {
    const [content] = await pool.execute(
      'SELECT * FROM about_content WHERE is_active = TRUE ORDER BY section ASC'
    );

    // Convert array to object for easier access
    const contentObject = {};
    content.forEach(item => {
      contentObject[item.section] = {
        id: item.id,
        title: item.title,
        content: item.content,
        image_url: item.image_url
      };
    });

    res.json({
      success: true,
      data: contentObject
    });
  } catch (error) {
    console.error('Get about content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch about content'
    });
  }
};

// Get all about content (admin)
const getAllAboutContent = async (req, res) => {
  try {
    const [content] = await pool.execute(
      'SELECT * FROM about_content ORDER BY section ASC'
    );

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Get all about content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch about content'
    });
  }
};

// Get single about section
const getAboutSection = async (req, res) => {
  try {
    const { section } = req.params;

    const [sections] = await pool.execute(
      'SELECT * FROM about_content WHERE section = ?',
      [section]
    );

    if (sections.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'About section not found'
      });
    }

    res.json({
      success: true,
      data: sections[0]
    });
  } catch (error) {
    console.error('Get about section error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch about section'
    });
  }
};

// Create new about section
const createAboutSection = async (req, res) => {
  try {
    const { section, title, content } = req.body;
    const image_url = req.file ? req.file.path : null;

    if (!section || !content) {
      return res.status(400).json({
        success: false,
        message: 'Section and content are required'
      });
    }

    const [result] = await pool.execute(
      'INSERT INTO about_content (section, title, content, image_url) VALUES (?, ?, ?, ?)',
      [section, title || null, content, image_url]
    );

    res.status(201).json({
      success: true,
      message: 'About section created successfully',
      data: {
        id: result.insertId,
        section,
        title,
        content,
        image_url
      }
    });
  } catch (error) {
    console.error('Create about section error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'Section already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create about section'
    });
  }
};

// Update about section
const updateAboutSection = async (req, res) => {
  try {
    const { section } = req.params;
    const { title, content, is_active } = req.body;
    const image_url = req.file ? req.file.path : null;

    // Check if section exists
    const [existingSections] = await pool.execute(
      'SELECT * FROM about_content WHERE section = ?',
      [section]
    );

    if (existingSections.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'About section not found'
      });
    }

    // Update section
    const updateFields = [];
    const updateValues = [];

    if (title !== undefined) {
      updateFields.push('title = ?');
      updateValues.push(title);
    }
    if (content !== undefined) {
      updateFields.push('content = ?');
      updateValues.push(content);
    }
    if (image_url) {
      updateFields.push('image_url = ?');
      updateValues.push(image_url);
    }
    if (is_active !== undefined) {
      updateFields.push('is_active = ?');
      updateValues.push(is_active);
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(section);

    await pool.execute(
      `UPDATE about_content SET ${updateFields.join(', ')} WHERE section = ?`,
      updateValues
    );

    res.json({
      success: true,
      message: 'About section updated successfully'
    });
  } catch (error) {
    console.error('Update about section error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update about section'
    });
  }
};

// Delete about section
const deleteAboutSection = async (req, res) => {
  try {
    const { section } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM about_content WHERE section = ?',
      [section]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'About section not found'
      });
    }

    res.json({
      success: true,
      message: 'About section deleted successfully'
    });
  } catch (error) {
    console.error('Delete about section error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete about section'
    });
  }
};

module.exports = {
  getAboutContent,
  getAllAboutContent,
  getAboutSection,
  createAboutSection,
  updateAboutSection,
  deleteAboutSection
};

