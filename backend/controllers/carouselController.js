const { pool } = require('../config/database');

// Get all carousel slides
const getCarouselSlides = async (req, res) => {
  try {
    const [slides] = await pool.execute(
      'SELECT * FROM carousel_slides WHERE is_active = TRUE ORDER BY sort_order ASC, created_at DESC'
    );

    res.json({
      success: true,
      data: slides
    });
  } catch (error) {
    console.error('Get carousel slides error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch carousel slides'
    });
  }
};

// Get all carousel slides (admin)
const getAllCarouselSlides = async (req, res) => {
  try {
    const [slides] = await pool.execute(
      'SELECT * FROM carousel_slides ORDER BY sort_order ASC, created_at DESC'
    );

    res.json({
      success: true,
      data: slides
    });
  } catch (error) {
    console.error('Get all carousel slides error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch carousel slides'
    });
  }
};

// Get single carousel slide
const getCarouselSlide = async (req, res) => {
  try {
    const { id } = req.params;

    const [slides] = await pool.execute(
      'SELECT * FROM carousel_slides WHERE id = ?',
      [id]
    );

    if (slides.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Carousel slide not found'
      });
    }

    res.json({
      success: true,
      data: slides[0]
    });
  } catch (error) {
    console.error('Get carousel slide error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch carousel slide'
    });
  }
};

// Create new carousel slide
const createCarouselSlide = async (req, res) => {
  try {
    const { title, description, link_url, sort_order } = req.body;
    const image_url = req.file ? req.file.path : null;

    if (!title || !image_url) {
      return res.status(400).json({
        success: false,
        message: 'Title and image are required'
      });
    }

    const [result] = await pool.execute(
      'INSERT INTO carousel_slides (title, description, image_url, link_url, sort_order) VALUES (?, ?, ?, ?, ?)',
      [title, description || null, image_url, link_url || null, sort_order || 0]
    );

    res.status(201).json({
      success: true,
      message: 'Carousel slide created successfully',
      data: {
        id: result.insertId,
        title,
        description,
        image_url,
        link_url,
        sort_order: sort_order || 0
      }
    });
  } catch (error) {
    console.error('Create carousel slide error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create carousel slide'
    });
  }
};

// Update carousel slide
const updateCarouselSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link_url, sort_order, is_active } = req.body;
    const image_url = req.file ? req.file.path : null;

    // Check if slide exists
    const [existingSlides] = await pool.execute(
      'SELECT * FROM carousel_slides WHERE id = ?',
      [id]
    );

    if (existingSlides.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Carousel slide not found'
      });
    }

    const existingSlide = existingSlides[0];

    // Update slide
    const updateFields = [];
    const updateValues = [];

    if (title !== undefined) {
      updateFields.push('title = ?');
      updateValues.push(title);
    }
    if (description !== undefined) {
      updateFields.push('description = ?');
      updateValues.push(description);
    }
    if (image_url) {
      updateFields.push('image_url = ?');
      updateValues.push(image_url);
    }
    if (link_url !== undefined) {
      updateFields.push('link_url = ?');
      updateValues.push(link_url);
    }
    if (sort_order !== undefined) {
      updateFields.push('sort_order = ?');
      updateValues.push(sort_order);
    }
    if (is_active !== undefined) {
      updateFields.push('is_active = ?');
      updateValues.push(is_active);
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(id);

    await pool.execute(
      `UPDATE carousel_slides SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    res.json({
      success: true,
      message: 'Carousel slide updated successfully'
    });
  } catch (error) {
    console.error('Update carousel slide error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update carousel slide'
    });
  }
};

// Delete carousel slide
const deleteCarouselSlide = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM carousel_slides WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Carousel slide not found'
      });
    }

    res.json({
      success: true,
      message: 'Carousel slide deleted successfully'
    });
  } catch (error) {
    console.error('Delete carousel slide error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete carousel slide'
    });
  }
};

module.exports = {
  getCarouselSlides,
  getAllCarouselSlides,
  getCarouselSlide,
  createCarouselSlide,
  updateCarouselSlide,
  deleteCarouselSlide
};

