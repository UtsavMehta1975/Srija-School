const { pool } = require('../config/database');

// Get all gallery albums
const getAlbums = async (req, res) => {
  try {
    const [albums] = await pool.execute(
      'SELECT * FROM gallery_albums WHERE is_active = TRUE ORDER BY sort_order ASC, created_at DESC'
    );

    res.json({
      success: true,
      data: albums
    });
  } catch (error) {
    console.error('Get albums error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch albums'
    });
  }
};

// Get all albums (admin)
const getAllAlbums = async (req, res) => {
  try {
    const [albums] = await pool.execute(
      'SELECT * FROM gallery_albums ORDER BY sort_order ASC, created_at DESC'
    );

    res.json({
      success: true,
      data: albums
    });
  } catch (error) {
    console.error('Get all albums error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch albums'
    });
  }
};

// Get single album
const getAlbum = async (req, res) => {
  try {
    const { id } = req.params;

    const [albums] = await pool.execute(
      'SELECT * FROM gallery_albums WHERE id = ?',
      [id]
    );

    if (albums.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Album not found'
      });
    }

    res.json({
      success: true,
      data: albums[0]
    });
  } catch (error) {
    console.error('Get album error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch album'
    });
  }
};

// Create new album
const createAlbum = async (req, res) => {
  try {
    const { name, description, sort_order } = req.body;
    const cover_image = req.file ? req.file.path : null;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Album name is required'
      });
    }

    const [result] = await pool.execute(
      'INSERT INTO gallery_albums (name, description, cover_image, sort_order) VALUES (?, ?, ?, ?)',
      [name, description || null, cover_image, sort_order || 0]
    );

    res.status(201).json({
      success: true,
      message: 'Album created successfully',
      data: {
        id: result.insertId,
        name,
        description,
        cover_image,
        sort_order: sort_order || 0
      }
    });
  } catch (error) {
    console.error('Create album error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create album'
    });
  }
};

// Update album
const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, sort_order, is_active } = req.body;
    const cover_image = req.file ? req.file.path : null;

    // Check if album exists
    const [existingAlbums] = await pool.execute(
      'SELECT * FROM gallery_albums WHERE id = ?',
      [id]
    );

    if (existingAlbums.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Album not found'
      });
    }

    // Update album
    const updateFields = [];
    const updateValues = [];

    if (name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (description !== undefined) {
      updateFields.push('description = ?');
      updateValues.push(description);
    }
    if (cover_image) {
      updateFields.push('cover_image = ?');
      updateValues.push(cover_image);
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
      `UPDATE gallery_albums SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    res.json({
      success: true,
      message: 'Album updated successfully'
    });
  } catch (error) {
    console.error('Update album error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update album'
    });
  }
};

// Delete album
const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete all images in the album first
    await pool.execute(
      'DELETE FROM gallery_images WHERE album_id = ?',
      [id]
    );

    const [result] = await pool.execute(
      'DELETE FROM gallery_albums WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Album not found'
      });
    }

    res.json({
      success: true,
      message: 'Album deleted successfully'
    });
  } catch (error) {
    console.error('Delete album error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete album'
    });
  }
};

// Get images by album
const getImagesByAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;

    const [images] = await pool.execute(
      'SELECT * FROM gallery_images WHERE album_id = ? AND is_active = TRUE ORDER BY sort_order ASC, created_at DESC',
      [albumId]
    );

    res.json({
      success: true,
      data: images
    });
  } catch (error) {
    console.error('Get images by album error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch images'
    });
  }
};

// Get all images (admin)
const getAllImages = async (req, res) => {
  try {
    const [images] = await pool.execute(
      'SELECT gi.*, ga.name as album_name FROM gallery_images gi LEFT JOIN gallery_albums ga ON gi.album_id = ga.id ORDER BY gi.sort_order ASC, gi.created_at DESC'
    );

    res.json({
      success: true,
      data: images
    });
  } catch (error) {
    console.error('Get all images error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch images'
    });
  }
};

// Create new image
const createImage = async (req, res) => {
  try {
    const { album_id, title, description, sort_order } = req.body;
    const image_url = req.file ? req.file.path : null;

    if (!image_url) {
      return res.status(400).json({
        success: false,
        message: 'Image is required'
      });
    }

    const [result] = await pool.execute(
      'INSERT INTO gallery_images (album_id, title, description, image_url, sort_order) VALUES (?, ?, ?, ?, ?)',
      [album_id || null, title || null, description || null, image_url, sort_order || 0]
    );

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        id: result.insertId,
        album_id,
        title,
        description,
        image_url,
        sort_order: sort_order || 0
      }
    });
  } catch (error) {
    console.error('Create image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image'
    });
  }
};

// Update image
const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { album_id, title, description, sort_order, is_active } = req.body;
    const image_url = req.file ? req.file.path : null;

    // Check if image exists
    const [existingImages] = await pool.execute(
      'SELECT * FROM gallery_images WHERE id = ?',
      [id]
    );

    if (existingImages.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Update image
    const updateFields = [];
    const updateValues = [];

    if (album_id !== undefined) {
      updateFields.push('album_id = ?');
      updateValues.push(album_id);
    }
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
      `UPDATE gallery_images SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    res.json({
      success: true,
      message: 'Image updated successfully'
    });
  } catch (error) {
    console.error('Update image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update image'
    });
  }
};

// Delete image
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM gallery_images WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete image'
    });
  }
};

// Get all videos
const getVideos = async (req, res) => {
  try {
    const [videos] = await pool.execute(
      'SELECT * FROM gallery_videos WHERE is_active = TRUE ORDER BY sort_order ASC, created_at DESC'
    );

    res.json({
      success: true,
      data: videos
    });
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch videos'
    });
  }
};

// Get all videos (admin)
const getAllVideos = async (req, res) => {
  try {
    const [videos] = await pool.execute(
      'SELECT * FROM gallery_videos ORDER BY sort_order ASC, created_at DESC'
    );

    res.json({
      success: true,
      data: videos
    });
  } catch (error) {
    console.error('Get all videos error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch videos'
    });
  }
};

// Create new video
const createVideo = async (req, res) => {
  try {
    const { title, description, video_url, sort_order } = req.body;
    const thumbnail_url = req.file ? req.file.path : null;

    if (!title || !video_url) {
      return res.status(400).json({
        success: false,
        message: 'Title and video URL are required'
      });
    }

    const [result] = await pool.execute(
      'INSERT INTO gallery_videos (title, description, video_url, thumbnail_url, sort_order) VALUES (?, ?, ?, ?, ?)',
      [title, description || null, video_url, thumbnail_url, sort_order || 0]
    );

    res.status(201).json({
      success: true,
      message: 'Video added successfully',
      data: {
        id: result.insertId,
        title,
        description,
        video_url,
        thumbnail_url,
        sort_order: sort_order || 0
      }
    });
  } catch (error) {
    console.error('Create video error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add video'
    });
  }
};

// Update video
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, video_url, sort_order, is_active } = req.body;
    const thumbnail_url = req.file ? req.file.path : null;

    // Check if video exists
    const [existingVideos] = await pool.execute(
      'SELECT * FROM gallery_videos WHERE id = ?',
      [id]
    );

    if (existingVideos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    // Update video
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
    if (video_url !== undefined) {
      updateFields.push('video_url = ?');
      updateValues.push(video_url);
    }
    if (thumbnail_url) {
      updateFields.push('thumbnail_url = ?');
      updateValues.push(thumbnail_url);
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
      `UPDATE gallery_videos SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    res.json({
      success: true,
      message: 'Video updated successfully'
    });
  } catch (error) {
    console.error('Update video error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update video'
    });
  }
};

// Delete video
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM gallery_videos WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete video'
    });
  }
};

module.exports = {
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
};

