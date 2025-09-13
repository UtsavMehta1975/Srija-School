import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert, Spinner, Tab, Nav } from 'react-bootstrap';
import { galleryAPI } from '../../services/api';
import ImageUpload from '../UI/ImageUpload';

const GalleryManager = () => {
  const [albums, setAlbums] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('albums');
  
  // Album states
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [albumFormData, setAlbumFormData] = useState({
    name: '',
    description: '',
    sort_order: 0,
    is_active: true
  });
  
  // Image states
  const [showImageModal, setShowImageModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [imageFormData, setImageFormData] = useState({
    album_id: '',
    title: '',
    description: '',
    sort_order: 0,
    is_active: true
  });
  
  // Video states
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [videoFormData, setVideoFormData] = useState({
    title: '',
    description: '',
    video_url: '',
    sort_order: 0,
    is_active: true
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [albumsResponse, imagesResponse, videosResponse] = await Promise.all([
        galleryAPI.getAllAlbums(),
        galleryAPI.getAllImages(),
        galleryAPI.getAllVideos()
      ]);
      
      setAlbums(albumsResponse.data.data);
      setImages(imagesResponse.data.data);
      setVideos(videosResponse.data.data);
    } catch (error) {
      console.error('Error fetching gallery data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Album functions
  const handleAlbumSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', albumFormData.name);
      formDataToSend.append('description', albumFormData.description);
      formDataToSend.append('sort_order', albumFormData.sort_order);
      formDataToSend.append('is_active', albumFormData.is_active);
      
      if (selectedFile) {
        formDataToSend.append('galleryImage', selectedFile);
      }

      if (editingAlbum) {
        await galleryAPI.updateAlbum(editingAlbum.id, formDataToSend);
        setSuccess('Album updated successfully!');
      } else {
        await galleryAPI.createAlbum(formDataToSend);
        setSuccess('Album created successfully!');
      }

      fetchData();
      handleCloseAlbumModal();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save album');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAlbumEdit = (album) => {
    setEditingAlbum(album);
    setAlbumFormData({
      name: album.name,
      description: album.description || '',
      sort_order: album.sort_order,
      is_active: album.is_active
    });
    setSelectedFile(null);
    setShowAlbumModal(true);
  };

  const handleAlbumDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this album? This will also delete all images in the album.')) {
      try {
        await galleryAPI.deleteAlbum(id);
        setSuccess('Album deleted successfully!');
        fetchData();
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete album');
      }
    }
  };

  const handleCloseAlbumModal = () => {
    setShowAlbumModal(false);
    setEditingAlbum(null);
    setAlbumFormData({
      name: '',
      description: '',
      sort_order: 0,
      is_active: true
    });
    setSelectedFile(null);
  };

  // Image functions
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('album_id', imageFormData.album_id);
      formDataToSend.append('title', imageFormData.title);
      formDataToSend.append('description', imageFormData.description);
      formDataToSend.append('sort_order', imageFormData.sort_order);
      formDataToSend.append('is_active', imageFormData.is_active);
      
      if (selectedFile) {
        formDataToSend.append('galleryImage', selectedFile);
      }

      if (editingImage) {
        await galleryAPI.updateImage(editingImage.id, formDataToSend);
        setSuccess('Image updated successfully!');
      } else {
        await galleryAPI.createImage(formDataToSend);
        setSuccess('Image created successfully!');
      }

      fetchData();
      handleCloseImageModal();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save image');
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageEdit = (image) => {
    setEditingImage(image);
    setImageFormData({
      album_id: image.album_id || '',
      title: image.title || '',
      description: image.description || '',
      sort_order: image.sort_order,
      is_active: image.is_active
    });
    setSelectedFile(null);
    setShowImageModal(true);
  };

  const handleImageDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await galleryAPI.deleteImage(id);
        setSuccess('Image deleted successfully!');
        fetchData();
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete image');
      }
    }
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setEditingImage(null);
    setImageFormData({
      album_id: '',
      title: '',
      description: '',
      sort_order: 0,
      is_active: true
    });
    setSelectedFile(null);
  };

  // Video functions
  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', videoFormData.title);
      formDataToSend.append('description', videoFormData.description);
      formDataToSend.append('video_url', videoFormData.video_url);
      formDataToSend.append('sort_order', videoFormData.sort_order);
      formDataToSend.append('is_active', videoFormData.is_active);
      
      if (selectedFile) {
        formDataToSend.append('galleryImage', selectedFile);
      }

      if (editingVideo) {
        await galleryAPI.updateVideo(editingVideo.id, formDataToSend);
        setSuccess('Video updated successfully!');
      } else {
        await galleryAPI.createVideo(formDataToSend);
        setSuccess('Video created successfully!');
      }

      fetchData();
      handleCloseVideoModal();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save video');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVideoEdit = (video) => {
    setEditingVideo(video);
    setVideoFormData({
      title: video.title,
      description: video.description || '',
      video_url: video.video_url,
      sort_order: video.sort_order,
      is_active: video.is_active
    });
    setSelectedFile(null);
    setShowVideoModal(true);
  };

  const handleVideoDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await galleryAPI.deleteVideo(id);
        setSuccess('Video deleted successfully!');
        fetchData();
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete video');
      }
    }
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
    setEditingVideo(null);
    setVideoFormData({
      title: '',
      description: '',
      video_url: '',
      sort_order: 0,
      is_active: true
    });
    setSelectedFile(null);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container>
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert variant="success" onClose={() => setSuccess('')} dismissible>
          {success}
        </Alert>
      )}

      <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
        <Row className="mb-4">
          <Col>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="albums">Albums</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="images">Images</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="videos">Videos</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>

        <Tab.Content>
          {/* Albums Tab */}
          <Tab.Pane eventKey="albums">
            <Row className="mb-4">
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <h4>Photo Albums</h4>
                  <Button 
                    variant="primary" 
                    onClick={() => setShowAlbumModal(true)}
                    className="btn-school-primary"
                  >
                    Add New Album
                  </Button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    {albums.length > 0 ? (
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Cover</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Sort Order</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {albums.map((album) => (
                            <tr key={album.id}>
                              <td>
                                {album.cover_image && (
                                  <img
                                    src={`${process.env.REACT_APP_API_URL}${album.cover_image}`}
                                    alt={album.name}
                                    style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                                    className="rounded"
                                  />
                                )}
                              </td>
                              <td>{album.name}</td>
                              <td>
                                {album.description && album.description.length > 50
                                  ? `${album.description.substring(0, 50)}...`
                                  : album.description}
                              </td>
                              <td>{album.sort_order}</td>
                              <td>
                                <span className={`badge ${album.is_active ? 'bg-success' : 'bg-secondary'}`}>
                                  {album.is_active ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => handleAlbumEdit(album)}
                                  className="me-2"
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleAlbumDelete(album.id)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <div className="text-center text-muted py-4">
                        <p>No albums found. Add your first album to get started.</p>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab.Pane>

          {/* Images Tab */}
          <Tab.Pane eventKey="images">
            <Row className="mb-4">
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <h4>Gallery Images</h4>
                  <Button 
                    variant="primary" 
                    onClick={() => setShowImageModal(true)}
                    className="btn-school-primary"
                  >
                    Add New Image
                  </Button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    {images.length > 0 ? (
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Album</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {images.map((image) => (
                            <tr key={image.id}>
                              <td>
                                {image.image_url && (
                                  <img
                                    src={`${process.env.REACT_APP_API_URL}${image.image_url}`}
                                    alt={image.title || 'Gallery image'}
                                    style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                                    className="rounded"
                                  />
                                )}
                              </td>
                              <td>{image.title || 'Untitled'}</td>
                              <td>{image.album_name || 'No Album'}</td>
                              <td>
                                {image.description && image.description.length > 30
                                  ? `${image.description.substring(0, 30)}...`
                                  : image.description}
                              </td>
                              <td>
                                <span className={`badge ${image.is_active ? 'bg-success' : 'bg-secondary'}`}>
                                  {image.is_active ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => handleImageEdit(image)}
                                  className="me-2"
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleImageDelete(image.id)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <div className="text-center text-muted py-4">
                        <p>No images found. Add your first image to get started.</p>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab.Pane>

          {/* Videos Tab */}
          <Tab.Pane eventKey="videos">
            <Row className="mb-4">
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <h4>Gallery Videos</h4>
                  <Button 
                    variant="primary" 
                    onClick={() => setShowVideoModal(true)}
                    className="btn-school-primary"
                  >
                    Add New Video
                  </Button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    {videos.length > 0 ? (
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Thumbnail</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Video URL</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {videos.map((video) => (
                            <tr key={video.id}>
                              <td>
                                {video.thumbnail_url ? (
                                  <img
                                    src={`${process.env.REACT_APP_API_URL}${video.thumbnail_url}`}
                                    alt={video.title}
                                    style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                                    className="rounded"
                                  />
                                ) : (
                                  <div className="bg-secondary rounded d-flex align-items-center justify-content-center" style={{ width: '60px', height: '40px' }}>
                                    <span className="text-white">📹</span>
                                  </div>
                                )}
                              </td>
                              <td>{video.title}</td>
                              <td>
                                {video.description && video.description.length > 30
                                  ? `${video.description.substring(0, 30)}...`
                                  : video.description}
                              </td>
                              <td>
                                <a href={video.video_url} target="_blank" rel="noopener noreferrer">
                                  View Video
                                </a>
                              </td>
                              <td>
                                <span className={`badge ${video.is_active ? 'bg-success' : 'bg-secondary'}`}>
                                  {video.is_active ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => handleVideoEdit(video)}
                                  className="me-2"
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleVideoDelete(video.id)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <div className="text-center text-muted py-4">
                        <p>No videos found. Add your first video to get started.</p>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      {/* Album Modal */}
      <Modal show={showAlbumModal} onHide={handleCloseAlbumModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingAlbum ? 'Edit Album' : 'Add New Album'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAlbumSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Album Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={albumFormData.name}
                    onChange={(e) => setAlbumFormData({ ...albumFormData, name: e.target.value })}
                    required
                    placeholder="Enter album name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Sort Order</Form.Label>
                  <Form.Control
                    type="number"
                    value={albumFormData.sort_order}
                    onChange={(e) => setAlbumFormData({ ...albumFormData, sort_order: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={albumFormData.description}
                onChange={(e) => setAlbumFormData({ ...albumFormData, description: e.target.value })}
                placeholder="Enter album description"
              />
            </Form.Group>

            <ImageUpload
              onFileSelect={setSelectedFile}
              currentImage={editingAlbum?.cover_image ? `${process.env.REACT_APP_API_URL}${editingAlbum.cover_image}` : null}
              label="Cover Image"
            />

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Active"
                checked={albumFormData.is_active}
                onChange={(e) => setAlbumFormData({ ...albumFormData, is_active: e.target.checked })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAlbumModal}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit" 
              disabled={submitting}
              className="btn-school-primary"
            >
              {submitting ? 'Saving...' : (editingAlbum ? 'Update' : 'Create')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Image Modal */}
      <Modal show={showImageModal} onHide={handleCloseImageModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingImage ? 'Edit Image' : 'Add New Image'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleImageSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Album</Form.Label>
                  <Form.Select
                    value={imageFormData.album_id}
                    onChange={(e) => setImageFormData({ ...imageFormData, album_id: e.target.value })}
                  >
                    <option value="">Select Album (Optional)</option>
                    {albums.map((album) => (
                      <option key={album.id} value={album.id}>
                        {album.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Sort Order</Form.Label>
                  <Form.Control
                    type="number"
                    value={imageFormData.sort_order}
                    onChange={(e) => setImageFormData({ ...imageFormData, sort_order: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={imageFormData.title}
                onChange={(e) => setImageFormData({ ...imageFormData, title: e.target.value })}
                placeholder="Enter image title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={imageFormData.description}
                onChange={(e) => setImageFormData({ ...imageFormData, description: e.target.value })}
                placeholder="Enter image description"
              />
            </Form.Group>

            <ImageUpload
              onFileSelect={setSelectedFile}
              currentImage={editingImage?.image_url ? `${process.env.REACT_APP_API_URL}${editingImage.image_url}` : null}
              label="Image"
              required={!editingImage}
            />

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Active"
                checked={imageFormData.is_active}
                onChange={(e) => setImageFormData({ ...imageFormData, is_active: e.target.checked })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseImageModal}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit" 
              disabled={submitting}
              className="btn-school-primary"
            >
              {submitting ? 'Saving...' : (editingImage ? 'Update' : 'Create')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Video Modal */}
      <Modal show={showVideoModal} onHide={handleCloseVideoModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingVideo ? 'Edit Video' : 'Add New Video'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleVideoSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title *</Form.Label>
                  <Form.Control
                    type="text"
                    value={videoFormData.title}
                    onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                    required
                    placeholder="Enter video title"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Sort Order</Form.Label>
                  <Form.Control
                    type="number"
                    value={videoFormData.sort_order}
                    onChange={(e) => setVideoFormData({ ...videoFormData, sort_order: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Video URL *</Form.Label>
              <Form.Control
                type="url"
                value={videoFormData.video_url}
                onChange={(e) => setVideoFormData({ ...videoFormData, video_url: e.target.value })}
                required
                placeholder="https://youtube.com/watch?v=..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={videoFormData.description}
                onChange={(e) => setVideoFormData({ ...videoFormData, description: e.target.value })}
                placeholder="Enter video description"
              />
            </Form.Group>

            <ImageUpload
              onFileSelect={setSelectedFile}
              currentImage={editingVideo?.thumbnail_url ? `${process.env.REACT_APP_API_URL}${editingVideo.thumbnail_url}` : null}
              label="Thumbnail Image"
            />

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Active"
                checked={videoFormData.is_active}
                onChange={(e) => setVideoFormData({ ...videoFormData, is_active: e.target.checked })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseVideoModal}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit" 
              disabled={submitting}
              className="btn-school-primary"
            >
              {submitting ? 'Saving...' : (editingVideo ? 'Update' : 'Create')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default GalleryManager;

