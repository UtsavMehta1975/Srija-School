import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Alert, Spinner, Badge } from 'react-bootstrap';
import { messagesAPI } from '../../services/api';

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [messagesResponse, statsResponse] = await Promise.all([
        messagesAPI.getAllMessages(),
        messagesAPI.getMessageStats()
      ]);
      
      setMessages(messagesResponse.data.data);
      setStats(statsResponse.data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
    
    // Mark as read if unread
    if (!message.is_read) {
      markAsRead(message.id);
    }
  };

  const markAsRead = async (id) => {
    try {
      await messagesAPI.markAsRead(id);
      fetchData();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const markAsUnread = async (id) => {
    try {
      await messagesAPI.markAsUnread(id);
      setSuccess('Message marked as unread');
      fetchData();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to mark message as unread');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await messagesAPI.deleteMessage(id);
        setSuccess('Message deleted successfully!');
        fetchData();
        if (selectedMessage && selectedMessage.id === id) {
          setShowModal(false);
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete message');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <h3 className="text-primary">{stats.total || 0}</h3>
              <p className="text-muted mb-0">Total Messages</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <h3 className="text-warning">{stats.unread || 0}</h3>
              <p className="text-muted mb-0">Unread</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <h3 className="text-success">{stats.today || 0}</h3>
              <p className="text-muted mb-0">Today</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <h3 className="text-info">{stats.thisWeek || 0}</h3>
              <p className="text-muted mb-0">This Week</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Contact Messages</h4>
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={fetchData}
              >
                Refresh
              </Button>
            </Card.Header>
            <Card.Body>
              {messages.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((message) => (
                      <tr key={message.id} className={!message.is_read ? 'table-warning' : ''}>
                        <td>
                          <Badge bg={message.is_read ? 'secondary' : 'warning'}>
                            {message.is_read ? 'Read' : 'Unread'}
                          </Badge>
                        </td>
                        <td>{message.name}</td>
                        <td>
                          <a href={`mailto:${message.email}`}>
                            {message.email}
                          </a>
                        </td>
                        <td>
                          {message.subject || 'No Subject'}
                        </td>
                        <td>{formatDate(message.created_at)}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleViewMessage(message)}
                            className="me-2"
                          >
                            View
                          </Button>
                          {message.is_read ? (
                            <Button
                              variant="outline-warning"
                              size="sm"
                              onClick={() => markAsUnread(message.id)}
                              className="me-2"
                            >
                              Mark Unread
                            </Button>
                          ) : (
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => markAsRead(message.id)}
                              className="me-2"
                            >
                              Mark Read
                            </Button>
                          )}
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(message.id)}
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
                  <p>No messages found.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Message Detail Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Message Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMessage && (
            <div>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Name:</strong> {selectedMessage.name}
                </Col>
                <Col md={6}>
                  <strong>Email:</strong> 
                  <a href={`mailto:${selectedMessage.email}`} className="ms-2">
                    {selectedMessage.email}
                  </a>
                </Col>
              </Row>
              
              {selectedMessage.phone && (
                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Phone:</strong> 
                    <a href={`tel:${selectedMessage.phone}`} className="ms-2">
                      {selectedMessage.phone}
                    </a>
                  </Col>
                </Row>
              )}
              
              {selectedMessage.subject && (
                <Row className="mb-3">
                  <Col>
                    <strong>Subject:</strong> {selectedMessage.subject}
                  </Col>
                </Row>
              )}
              
              <Row className="mb-3">
                <Col>
                  <strong>Date:</strong> {formatDate(selectedMessage.created_at)}
                </Col>
              </Row>
              
              <Row>
                <Col>
                  <strong>Message:</strong>
                  <div className="mt-2 p-3 bg-light rounded">
                    {selectedMessage.message}
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {selectedMessage && (
            <>
              <Button
                variant="outline-primary"
                onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your Message'}`)}
              >
                Reply via Email
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => {
                  handleDelete(selectedMessage.id);
                  setShowModal(false);
                }}
              >
                Delete Message
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MessageManager;

