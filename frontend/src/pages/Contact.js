import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { messagesAPI } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await messagesAPI.submitMessage(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="school-primary mb-3">📞 Contact Us</h1>
            <p className="lead text-muted">
              Get in touch with Srijan School for admissions, inquiries, or any assistance you need
            </p>
          </div>
        </Col>
      </Row>
      
      <Row className="g-5">
        {/* Contact Information */}
        <Col lg={4}>
          <Card className="h-100 card-elevated">
            <Card.Body className="p-4">
              <h3 className="text-gradient-primary mb-4">Get in Touch</h3>
              
              <div className="mb-4">
                <h5 className="school-primary">📍 Address</h5>
                <p className="text-muted">
                  Srijan School<br />
                  Haldwani, Uttarakhand<br />
                  India
                </p>
              </div>
              
              <div className="mb-4">
                <h5 className="school-primary">📞 Phone</h5>
                <p className="text-muted">
                  Main Office: 7895236185<br />
                  Principal Office: 7895236185<br />
                  School Office: 7895236185
                </p>
              </div>
              
              <div className="mb-4">
                <h5 className="school-primary">✉️ Email</h5>
                <p className="text-muted">
                  General: srijanschool@gmail.com<br />
                  Principal: srijanschool@gmail.com<br />
                  Director: srijanschool@gmail.com
                </p>
              </div>
              
              <div className="mb-4">
                <h5 className="school-primary">🕒 Office Hours</h5>
                <p className="text-muted">
                  Monday - Friday: 9:00 AM - 11:00 AM<br />
                  Saturday: 9:00 AM - 11:00 AM<br />
                  Sunday: Closed
                </p>
              </div>

              <div className="mb-4">
                <h5 className="school-primary">🏫 UDICE Code</h5>
                <p className="text-muted">
                  05110413202
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Contact Form */}
        <Col lg={8}>
          <Card className="card-elevated">
            <Card.Body className="p-4">
              <h3 className="text-gradient-primary mb-4">Send us a Message</h3>
              
              {success && (
                <Alert variant="success" className="mb-4">
                  <Alert.Heading>Message Sent Successfully!</Alert.Heading>
                  <p>Thank you for contacting us. We will get back to you soon.</p>
                </Alert>
              )}
              
              {error && (
                <Alert variant="danger" className="mb-4">
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Enter message subject"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-4">
                  <Form.Label>Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Enter your message"
                  />
                </Form.Group>
                
                <Button
                  type="submit"
                  className="btn-school-primary"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Map Section */}
      <Row className="mt-5">
        <Col>
          <Card className="card-elevated">
            <Card.Body className="p-4">
              <h3 className="text-gradient-primary mb-4">📍 Find Us</h3>
              <div className="map-container" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2884.61564030151!2d79.579634!3d29.185015!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a08f45130e9de3%3A0xcdd6e7d9b0825c6!2sSrijan%20school!5e1!3m2!1sen!2sus!4v1757789840068!5m2!1sen!2sus" 
                  width="100%" 
                  height="450" 
                  style={{ border: '0' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Srijan School Location"
                />
              </div>
              <div className="text-center mt-3">
                <p className="text-muted mb-0">
                  <strong>Srijan School</strong> - Haldwani, Uttarakhand, India
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;

