import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { aboutAPI } from '../../services/api';
import ImageUpload from '../UI/ImageUpload';

const AboutManager = () => {
  const [aboutContent, setAboutContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({
    section: '',
    title: '',
    content: '',
    is_active: true
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const response = await aboutAPI.getAllContent();
      setAboutContent(response.data.data);
    } catch (error) {
      console.error('Error fetching about content:', error);
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
      formDataToSend.append('section', formData.section);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('is_active', formData.is_active);
      
      if (selectedFile) {
        formDataToSend.append('aboutImage', selectedFile);
      }

      if (editingSection) {
        await aboutAPI.updateSection(editingSection.section, formDataToSend);
        setSuccess('About section updated successfully!');
      } else {
        await aboutAPI.createSection(formDataToSend);
        setSuccess('About section created successfully!');
      }

      fetchAboutContent();
      handleCloseModal();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save about section');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (section) => {
    setEditingSection(section);
    setFormData({
      section: section.section,
      title: section.title || '',
      content: section.content,
      is_active: section.is_active
    });
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleDelete = async (section) => {
    if (window.confirm(`Are you sure you want to delete the "${section.section}" section?`)) {
      try {
        await aboutAPI.deleteSection(section.section);
        setSuccess('About section deleted successfully!');
        fetchAboutContent();
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete about section');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSection(null);
    setFormData({
      section: '',
      title: '',
      content: '',
      is_active: true
    });
    setSelectedFile(null);
    setError('');
    setSuccess('');
  };

  const predefinedSections = [
    { value: 'mission', label: 'Mission' },
    { value: 'vision', label: 'Vision' },
    { value: 'history', label: 'History' },
    { value: 'facilities', label: 'Facilities' },
    { value: 'values', label: 'Values' },
    { value: 'achievements', label: 'Achievements' }
  ];

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
            <h4>About Content Sections</h4>
            <Button 
              variant="primary" 
              onClick={() => setShowModal(true)}
              className="btn-school-primary"
            >
              Add New Section
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              {aboutContent.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Section</th>
                      <th>Title</th>
                      <th>Content Preview</th>
                      <th>Image</th>
                      <th>Status</th>
                      <th>Last Updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aboutContent.map((section) => (
                      <tr key={section.id}>
                        <td>
                          <strong className="text-capitalize">
                            {section.section.replace('_', ' ')}
                          </strong>
                        </td>
                        <td>{section.title || 'No Title'}</td>
                        <td>
                          {section.content && section.content.length > 100
                            ? `${section.content.substring(0, 100)}...`
                            : section.content}
                        </td>
                        <td>
                          {section.image_url && (
                            <img
                              src={`${process.env.REACT_APP_API_URL}${section.image_url}`}
                              alt={section.section}
                              style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                              className="rounded"
                            />
                          )}
                        </td>
                        <td>
                          <span className={`badge ${section.is_active ? 'bg-success' : 'bg-secondary'}`}>
                            {section.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          {new Date(section.updated_at).toLocaleDateString()}
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEdit(section)}
                            className="me-2"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(section)}
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
                  <p>No about content sections found. Add your first section to get started.</p>
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
            {editingSection ? 'Edit About Section' : 'Add New About Section'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Section *</Form.Label>
              {editingSection ? (
                <Form.Control
                  type="text"
                  value={formData.section}
                  disabled
                  className="bg-light"
                />
              ) : (
                <Form.Select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  required
                >
                  <option value="">Select a section</option>
                  {predefinedSections.map((section) => (
                    <option key={section.value} value={section.value}>
                      {section.label}
                    </option>
                  ))}
                </Form.Select>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter section title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content *</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                placeholder="Enter section content"
              />
            </Form.Group>

            <ImageUpload
              onFileSelect={setSelectedFile}
              currentImage={editingSection?.image_url ? `${process.env.REACT_APP_API_URL}${editingSection.image_url}` : null}
              label="Section Image"
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
              {submitting ? 'Saving...' : (editingSection ? 'Update' : 'Create')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AboutManager;

