import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { carouselAPI } from '../../services/api';
import ImageUpload from '../UI/ImageUpload';

const CarouselManager = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link_url: '',
    sort_order: 0,
    is_active: true
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await carouselAPI.getAllSlides();
      setSlides(response.data.data);
    } catch (error) {
      console.error('Error fetching slides:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('link_url', formData.link_url);
      formDataToSend.append('sort_order', formData.sort_order);
      formDataToSend.append('is_active', formData.is_active);
      
      if (selectedFile) {
        formDataToSend.append('carouselImage', selectedFile);
      }

      if (editingSlide) {
        await carouselAPI.updateSlide(editingSlide.id, formDataToSend);
        setSuccess('Slide updated successfully!');
      } else {
        await carouselAPI.createSlide(formDataToSend);
        setSuccess('Slide created successfully!');
      }

      fetchSlides();
      handleCloseModal();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save slide');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (slide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      description: slide.description || '',
      link_url: slide.link_url || '',
      sort_order: slide.sort_order,
      is_active: slide.is_active
    });
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      try {
        await carouselAPI.deleteSlide(id);
        setSuccess('Slide deleted successfully!');
        fetchSlides();
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete slide');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSlide(null);
    setFormData({
      title: '',
      description: '',
      link_url: '',
      sort_order: 0,
      is_active: true
    });
    setSelectedFile(null);
    setError('');
    setSuccess('');
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

      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Carousel Slides</h4>
            <Button 
              variant="primary" 
              onClick={() => setShowModal(true)}
              className="btn-school-primary"
            >
              Add New Slide
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              {slides.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Link URL</th>
                      <th>Sort Order</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slides.map((slide) => (
                      <tr key={slide.id}>
                        <td>
                          {slide.image_url && (
                            <img
                              src={`${process.env.REACT_APP_API_URL}${slide.image_url}`}
                              alt={slide.title}
                              style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                              className="rounded"
                            />
                          )}
                        </td>
                        <td>{slide.title}</td>
                        <td>
                          {slide.description && slide.description.length > 50
                            ? `${slide.description.substring(0, 50)}...`
                            : slide.description}
                        </td>
                        <td>
                          {slide.link_url && (
                            <a href={slide.link_url} target="_blank" rel="noopener noreferrer">
                              View Link
                            </a>
                          )}
                        </td>
                        <td>{slide.sort_order}</td>
                        <td>
                          <span className={`badge ${slide.is_active ? 'bg-success' : 'bg-secondary'}`}>
                            {slide.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEdit(slide)}
                            className="me-2"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(slide.id)}
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
                  <p>No carousel slides found. Add your first slide to get started.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingSlide ? 'Edit Slide' : 'Add New Slide'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="Enter slide title"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Sort Order</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
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
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter slide description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Link URL</Form.Label>
              <Form.Control
                type="url"
                value={formData.link_url}
                onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                placeholder="https://example.com"
              />
            </Form.Group>

            <ImageUpload
              onFileSelect={setSelectedFile}
              currentImage={editingSlide?.image_url ? `${process.env.REACT_APP_API_URL}${editingSlide.image_url}` : null}
              label="Carousel Image"
              required={!editingSlide}
            />

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit" 
              disabled={submitting}
              className="btn-school-primary"
            >
              {submitting ? 'Saving...' : (editingSlide ? 'Update' : 'Create')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default CarouselManager;

