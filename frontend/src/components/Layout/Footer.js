import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginModal from '../Admin/LoginModal';

const Footer = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAdminClick = (e) => {
    e.preventDefault();
    setShowLoginModal(true);
  };

  return (
    <>
      <footer className="school-bg-secondary text-white py-5 mt-5">
        <Container>
          <Row>
            <Col md={4}>
              <div className="d-flex align-items-center mb-3">
                <img
                  src="/srijan-school-logo.svg"
                  alt="Srijan School"
                  className="me-2"
                  style={{
                    height: '52px',
                    width: 'auto',
                    maxWidth: '150px',
                    objectFit: 'contain'
                  }}
                />
                <h5 className="text-white mb-0">Srijan School</h5>
              </div>
              <p className="text-white">
                Excellence in Education Since 2018
              </p>
              <p className="text-white">
                Nurturing young minds for a brighter tomorrow.
              </p>
            </Col>
            
            <Col md={4}>
              <h6 className="text-white mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                <li className="mb-2"><Link to="/achievements" className="text-white text-decoration-none">Achievements</Link></li>
                <li className="mb-2"><Link to="/gallery/media" className="text-white text-decoration-none">Media Gallery</Link></li>
                <li className="mb-2"><Link to="/gallery/photos" className="text-white text-decoration-none">Photo Gallery</Link></li>
                <li className="mb-2"><Link to="/gallery/videos" className="text-white text-decoration-none">Video Gallery</Link></li>
                <li className="mb-2"><Link to="/rules/fees" className="text-white text-decoration-none">Fees Rules</Link></li>
                <li className="mb-2"><Link to="/rules/timings" className="text-white text-decoration-none">School Timings</Link></li>
                <li className="mb-2"><Link to="/rules/uniform" className="text-white text-decoration-none">School Uniform</Link></li>
              </ul>
            </Col>
            
            <Col md={4}>
              <h6 className="text-white mb-3">Contact Info</h6>
              <p className="text-white mb-2">
                📍 Haldwani, Uttarakhand, India
              </p>
              <p className="text-white mb-2">
                📞 7895236185
              </p>
              <p className="text-white mb-2">
                ✉️ srijanschool@gmail.com
              </p>
              <p className="text-white mb-2">
                UDICE Code: 05110413202
              </p>
            </Col>
          </Row>
          
          <hr className="my-4" style={{ borderColor: '#dc2626', opacity: 0.3 }} />
          
          {/* Notice Board */}
          <Row className="mb-4">
            <Col>
              <Card className="school-bg-primary text-white">
                <Card.Body>
                  <h6 className="card-title">Notice Board</h6>
                  <p className="card-text mb-0">
                    Admission before September 2025 - Enroll Now!
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row className="align-items-center">
            <Col md={6}>
              <p className="text-white mb-0">
                © 2024 Srijan School. All rights reserved.
              </p>
            </Col>
            <Col md={6} className="text-md-end">
              <p className="text-white mb-0">
                Designed and Developed by <strong>Vibenet Corp.</strong>
              </p>
              <button 
                className="btn btn-link footer-admin-link p-0 text-decoration-none text-white"
                onClick={handleAdminClick}
                style={{ border: 'none', background: 'none', fontSize: '0.8rem' }}
              >
                Admin Login
              </button>
            </Col>
          </Row>
        </Container>
      </footer>
      
      <LoginModal 
        show={showLoginModal} 
        onHide={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Footer;

