const { pool } = require('../config/database');

// Get all faculty members
const getFaculty = async (req, res) => {
  try {
    const [faculty] = await pool.execute(
      'SELECT * FROM faculty WHERE is_active = TRUE ORDER BY sort_order ASC, created_at DESC'
    );

    res.json({
      success: true,
      data: faculty
    });
  } catch (error) {
    console.error('Get faculty error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch faculty'
    });
  }
};

// Get all faculty members (admin)
const getAllFaculty = async (req, res) => {
  try {
    const [faculty] = await pool.execute(
      'SELECT * FROM faculty ORDER BY sort_order ASC, created_at DESC'
    );

    res.json({
      success: true,
      data: faculty
    });
  } catch (error) {
    console.error('Get all faculty error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch faculty'
    });
  }
};

// Get single faculty member
const getFacultyMember = async (req, res) => {
  try {
    const { id } = req.params;

    const [faculty] = await pool.execute(
      'SELECT * FROM faculty WHERE id = ?',
      [id]
    );

    if (faculty.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Faculty member not found'
      });
    }

    res.json({
      success: true,
      data: faculty[0]
    });
  } catch (error) {
    console.error('Get faculty member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch faculty member'
    });
  }
};

// Create new faculty member
const createFacultyMember = async (req, res) => {
  try {
    const {
      name,
      position,
      department,
      qualification,
      experience,
      email,
      phone,
      bio,
      sort_order
    } = req.body;
    const image_url = req.file ? req.file.path : null;

    if (!name || !position) {
      return res.status(400).json({
        success: false,
        message: 'Name and position are required'
      });
    }

    const [result] = await pool.execute(
      'INSERT INTO faculty (name, position, department, qualification, experience, email, phone, image_url, bio, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        name,
        position,
        department || null,
        qualification || null,
        experience || null,
        email || null,
        phone || null,
        image_url,
        bio || null,
        sort_order || 0
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Faculty member created successfully',
      data: {
        id: result.insertId,
        name,
        position,
        department,
        qualification,
        experience,
        email,
        phone,
        image_url,
        bio,
        sort_order: sort_order || 0
      }
    });
  } catch (error) {
    console.error('Create faculty member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create faculty member'
    });
  }
};

// Update faculty member
const updateFacultyMember = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      position,
      department,
      qualification,
      experience,
      email,
      phone,
      bio,
      sort_order,
      is_active
    } = req.body;
    const image_url = req.file ? req.file.path : null;

    // Check if faculty member exists
    const [existingFaculty] = await pool.execute(
      'SELECT * FROM faculty WHERE id = ?',
      [id]
    );

    if (existingFaculty.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Faculty member not found'
      });
    }

    // Update faculty member
    const updateFields = [];
    const updateValues = [];

    if (name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (position !== undefined) {
      updateFields.push('position = ?');
      updateValues.push(position);
    }
    if (department !== undefined) {
      updateFields.push('department = ?');
      updateValues.push(department);
    }
    if (qualification !== undefined) {
      updateFields.push('qualification = ?');
      updateValues.push(qualification);
    }
    if (experience !== undefined) {
      updateFields.push('experience = ?');
      updateValues.push(experience);
    }
    if (email !== undefined) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }
    if (phone !== undefined) {
      updateFields.push('phone = ?');
      updateValues.push(phone);
    }
    if (bio !== undefined) {
      updateFields.push('bio = ?');
      updateValues.push(bio);
    }
    if (image_url) {
      updateFields.push('image_url = ?');
      updateValues.push(image_url);
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
      `UPDATE faculty SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    res.json({
      success: true,
      message: 'Faculty member updated successfully'
    });
  } catch (error) {
    console.error('Update faculty member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update faculty member'
    });
  }
};

// Delete faculty member
const deleteFacultyMember = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM faculty WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Faculty member not found'
      });
    }

    res.json({
      success: true,
      message: 'Faculty member deleted successfully'
    });
  } catch (error) {
    console.error('Delete faculty member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete faculty member'
    });
  }
};

module.exports = {
  getFaculty,
  getAllFaculty,
  getFacultyMember,
  createFacultyMember,
  updateFacultyMember,
  deleteFacultyMember
};

