import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import CarouselManager from './CarouselManager';
import FacultyManager from './FacultyManager';
import GalleryManager from './GalleryManager';
import MessageManager from './MessageManager';
import AboutManager from './AboutManager';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('carousel');

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="admin-dashboard">
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={3} lg={2} className="admin-sidebar p-0">
            <div className="p-3 text-white">
              <h5 className="mb-4">Admin Panel</h5>
              <p className="text-light mb-4">
                Welcome, {user?.username}
              </p>
              
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'carousel'}
                    onClick={() => setActiveTab('carousel')}
                    className="text-white"
                  >
                    Carousel
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'faculty'}
                    onClick={() => setActiveTab('faculty')}
                    className="text-white"
                  >
                    Faculty
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'gallery'}
                    onClick={() => setActiveTab('gallery')}
                    className="text-white"
                  >
                    Gallery
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'messages'}
                    onClick={() => setActiveTab('messages')}
                    className="text-white"
                  >
                    Messages
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'about'}
                    onClick={() => setActiveTab('about')}
                    className="text-white"
                  >
                    About Content
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              
              <hr className="text-white" />
              
              <button
                className="btn btn-outline-light btn-sm w-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </Col>
          
          {/* Main Content */}
          <Col md={9} lg={10} className="admin-content p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">
                {activeTab === 'carousel' && 'Carousel Management'}
                {activeTab === 'faculty' && 'Faculty Management'}
                {activeTab === 'gallery' && 'Gallery Management'}
                {activeTab === 'messages' && 'Message Management'}
                {activeTab === 'about' && 'About Content Management'}
              </h2>
              <a 
                href="/" 
                className="btn-school-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Website
              </a>
            </div>
            
            <Tab.Container activeKey={activeTab}>
              <Tab.Content>
                <Tab.Pane eventKey="carousel">
                  <CarouselManager />
                </Tab.Pane>
                <Tab.Pane eventKey="faculty">
                  <FacultyManager />
                </Tab.Pane>
                <Tab.Pane eventKey="gallery">
                  <GalleryManager />
                </Tab.Pane>
                <Tab.Pane eventKey="messages">
                  <MessageManager />
                </Tab.Pane>
                <Tab.Pane eventKey="about">
                  <AboutManager />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;

