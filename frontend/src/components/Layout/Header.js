import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Carousel slides data
  const carouselSlides = [
    {
      id: 1,
      content: (
        <div className="carousel-content">
          <span>📞 7895236185</span>
          <span>✉️ srijanschool@gmail.com</span>
          <span>🏫 UDICE: 05110413202</span>
          <Link to="/">🏠 Home</Link>
          <Link to="/about">ℹ️ About</Link>
          <Link to="/contact">📞 Contact</Link>
        </div>
      )
    },
    {
      id: 2,
      content: (
        <div className="carousel-content">
          <Link to="/achievements">🏆 Achievements</Link>
          <Link to="/fees">💰 Fees</Link>
          <Link to="/gallery">🖼️ Gallery</Link>
          <Link to="/gallery/media">📺 Media</Link>
          <Link to="/gallery/photos">📸 Photos</Link>
          <Link to="/gallery/videos">🎥 Videos</Link>
        </div>
      )
    },
    {
      id: 3,
      content: (
        <div className="carousel-content">
          <Link to="/rules">📋 All Rules</Link>
          <Link to="/rules/fees">💰 Fees Rules</Link>
          <Link to="/rules/timings">🕐 Timings</Link>
          <Link to="/rules/uniform">👔 Uniform</Link>
          <Link to="/rules/admission">📝 Admission</Link>
          <Link to="/rules/discipline">⚖️ Discipline</Link>
        </div>
      )
    },
    {
      id: 4,
      content: (
        <div className="carousel-content">
          <Link to="/rules/bus">🚌 Bus Rules</Link>
          <Link to="/rules/vacation">🏖️ Vacation</Link>
          <span>📚 Srijan School</span>
          <span>🎓 Excellence Since 1995</span>
          <span>🌟 Quality Education</span>
          <span>🏆 Top Rankings</span>
        </div>
      )
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  return (
    <>
      {/* Auto-Rotating Top Carousel */}
      <div className="top-carousel">
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${
              index === currentSlide 
                ? 'active' 
                : index === (currentSlide - 1 + carouselSlides.length) % carouselSlides.length 
                  ? 'prev' 
                  : ''
            }`}
          >
            {slide.content}
              </div>
        ))}
      </div>

      {/* Main Navigation */}
      <Navbar 
        bg="white" 
        expand="lg" 
        className="shadow-sm"
        expanded={expanded}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center position-relative" style={{ height: '56px' }}>
            <img
              src="/srijan-school-logo.svg"
              alt="Srijan School"
              className="me-2"
               style={{
                 height: '55px',
                 width: 'auto',
                 maxWidth: '160px',
                 objectFit: 'contain',
                 position: 'absolute',
                 left: '0',
                 top: '50%',
                 transform: 'translateY(-50%)'
               }}
            />
          =
          </Navbar.Brand>
          
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={() => setExpanded(!expanded)}
          />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link 
                as={Link} 
                to="/" 
                className={isActive('/') ? 'school-primary fw-bold' : ''}
                onClick={() => setExpanded(false)}
              >
                Home
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/about" 
                className={isActive('/about') ? 'school-primary fw-bold' : ''}
                onClick={() => setExpanded(false)}
              >
                About
              </Nav.Link>
              
              <NavDropdown title="Rules & Regulations" id="rules-dropdown">
                <NavDropdown.Item as={Link} to="/rules/admission" onClick={() => setExpanded(false)}>
                  Admission Rules
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/rules/bus" onClick={() => setExpanded(false)}>
                  Bus Rules
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/rules/fees" onClick={() => setExpanded(false)}>
                  Fees Rules
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/rules/parent-recommendations" onClick={() => setExpanded(false)}>
                  Recommendation to Parents
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/rules/discipline" onClick={() => setExpanded(false)}>
                  Rules for discipline of students
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/rules/school" onClick={() => setExpanded(false)}>
                  School Rules
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/rules/timings" onClick={() => setExpanded(false)}>
                  School Timings
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/rules/uniform" onClick={() => setExpanded(false)}>
                  School Uniform
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/rules/teacher-service" onClick={() => setExpanded(false)}>
                  Service Rules For Teachers
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/rules/vacation" onClick={() => setExpanded(false)}>
                  Vacation Rules
                </NavDropdown.Item>
              </NavDropdown>
              
              <Nav.Link 
                as={Link} 
                to="/gallery" 
                className={isActive('/gallery') ? 'school-primary fw-bold' : ''}
                onClick={() => setExpanded(false)}
              >
                Gallery
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/achievements" 
                className={isActive('/achievements') ? 'school-primary fw-bold' : ''}
                onClick={() => setExpanded(false)}
              >
                Achievements
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/mandatory-disclosure" 
                className={isActive('/mandatory-disclosure') ? 'school-primary fw-bold' : ''}
                onClick={() => setExpanded(false)}
              >
                Mandatory Public Disclosure
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/contact" 
                className={isActive('/contact') ? 'school-primary fw-bold' : ''}
                onClick={() => setExpanded(false)}
              >
                📞 Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

