import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [imageDimensions, setImageDimensions] = useState({ width: 16, height: 9 });

  // School photos for the hero carousel - unique high-quality images
  const allPhotos = [
    { id: 1, url: '/IMG_8192.JPG', title: 'School Celebration' },
    { id: 2, url: '/IMG_8191.JPG', title: 'Student Activities' },
    { id: 3, url: '/IMG_8190.JPG', title: 'Learning Environment' },
    { id: 4, url: '/IMG_8189.JPG', title: 'School Life' },
    { id: 5, url: '/IMG_8188.JPG', title: 'Educational Experience' },
    { id: 6, url: '/IMG_8187.JPG', title: 'Student Engagement' },
    { id: 7, url: '/IMG_8186.JPG', title: 'Academic Success' },
    { id: 8, url: '/IMG_8185.JPG', title: 'Learning Community' },
    { id: 9, url: '/IMG_8184.JPG', title: 'School Spirit' },
    { id: 10, url: '/IMG_8183.JPG', title: 'Educational Excellence' },
    { id: 11, url: '/IMG_8182.JPG', title: 'Student Development' },
    { id: 12, url: '/IMG_8181.JPG', title: 'School Activities' },
    { id: 13, url: '/IMG_8179.JPG', title: 'Learning Journey' },
    { id: 14, url: '/IMG_8178.JPG', title: 'Educational Growth' },
    { id: 15, url: '/IMG_8177.JPG', title: 'School Environment' },
    { id: 16, url: '/IMG_8176.JPG', title: 'Student Learning' },
    { id: 17, url: '/IMG_8122.JPG', title: 'Academic Excellence' },
    { id: 18, url: '/IMG_2454.JPG', title: 'School Celebration' },
    { id: 19, url: '/IMG_2453.JPG', title: 'Student Activities' },
    { id: 20, url: '/IMG_2452.JPG', title: 'Learning Environment' },
    { id: 21, url: '/IMG_2451.JPG', title: 'School Life' },
    { id: 22, url: '/IMG_2450.JPG', title: 'Educational Experience' },
    { id: 23, url: '/IMG_2449.JPG', title: 'Student Engagement' },
    { id: 24, url: '/IMG_2448.JPG', title: 'Academic Success' },
    { id: 25, url: '/IMG_2447.JPG', title: 'Learning Community' },
    { id: 26, url: '/IMG_2446.JPG', title: 'School Spirit' },
    { id: 27, url: '/IMG_2445.JPG', title: 'Educational Excellence' },
    { id: 28, url: '/IMG_2444.JPG', title: 'Student Development' },
    { id: 29, url: '/IMG_2442.JPG', title: 'School Activities' },
    { id: 30, url: '/IMG_2441.JPG', title: 'Learning Journey' },
    { id: 31, url: '/IMG_2436.JPG', title: 'Educational Growth' },
    { id: 32, url: '/IMG_2398.JPG', title: 'School Environment' },
    { id: 33, url: '/IMG_2397.JPG', title: 'Student Learning' },
    { id: 34, url: '/IMG_2396.JPG', title: 'Academic Excellence' },
    { id: 35, url: '/IMG_2395.JPG', title: 'School Celebration' },
    { id: 36, url: '/IMG_2394.JPG', title: 'Student Activities' },
    { id: 37, url: '/IMG_2393.JPG', title: 'Learning Environment' },
    { id: 38, url: '/IMG_2392.JPG', title: 'School Life' },
    { id: 39, url: '/IMG_2391.JPG', title: 'Educational Experience' },
    { id: 40, url: '/IMG_2390.JPG', title: 'Student Engagement' },
    { id: 41, url: '/IMG_2389.JPG', title: 'Academic Success' },
    { id: 42, url: '/IMG_2388.JPG', title: 'Learning Community' },
    { id: 43, url: '/IMG_2387.JPG', title: 'School Spirit' },
    { id: 44, url: '/IMG_2386.JPG', title: 'Educational Excellence' },
    { id: 45, url: '/IMG_2385.JPG', title: 'Student Development' },
    { id: 46, url: '/IMG_2384.JPG', title: 'School Activities' },
    { id: 47, url: '/IMG_2383.JPG', title: 'Learning Journey' },
    { id: 48, url: '/IMG_2382.JPG', title: 'Educational Growth' },
    { id: 49, url: '/IMG_2381.JPG', title: 'School Environment' },
    { id: 50, url: '/IMG_2380.JPG', title: 'Student Learning' }
  ];

  // Remove duplicates and get unique photos
  const heroPhotos = allPhotos.filter((photo, index, self) => 
    index === self.findIndex(p => p.url === photo.url)
  );

  // Function to load image dimensions
  const loadImageDimensions = (imageUrl) => {
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      // For portrait images (height > width), we need to adjust the container
      if (img.height > img.width) {
        // Portrait image - set height as the base and calculate width
        setImageDimensions({ width: 1, height: aspectRatio });
      } else {
        // Landscape image - set width as the base and calculate height
        setImageDimensions({ width: aspectRatio, height: 1 });
      }
    };
    img.src = imageUrl;
  };

  // Load dimensions when photo changes
  useEffect(() => {
    if (heroPhotos[selectedPhoto]) {
      loadImageDimensions(heroPhotos[selectedPhoto].url);
    }
  }, [selectedPhoto, heroPhotos]);

  // Auto-rotate hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedPhoto((prev) => (prev + 1) % heroPhotos.length);
    }, 4000); // Change photo every 4 seconds
    return () => clearInterval(interval);
  }, [heroPhotos.length]);

  return (
    <div className="srijan-home-page">
      {/* Hero Carousel Section */}
      <section className="hero-carousel-section">
        <div className="hero-carousel-container">
          <div className="carousel-grid">
            {/* Main Image (Left side for portrait, center for landscape) */}
            <div className="carousel-main-image">
              <img 
                src={heroPhotos[selectedPhoto]?.url} 
                alt={heroPhotos[selectedPhoto]?.title}
                className="carousel-img"
              />
              <div className="carousel-caption">
                <div className="caption-content">
                  {heroPhotos[selectedPhoto]?.caption && (
                    <h3 className="caption-title">
                      {heroPhotos[selectedPhoto].caption}
                    </h3>
                  )}
                  {heroPhotos[selectedPhoto]?.subtitle && (
                    <p className="caption-subtitle">
                      {heroPhotos[selectedPhoto].subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Side Images */}
            <div className="carousel-side-images">
              <div className="side-image">
                <img 
                  src={heroPhotos[(selectedPhoto + 1) % heroPhotos.length]?.url} 
                  alt={heroPhotos[(selectedPhoto + 1) % heroPhotos.length]?.title}
                  className="carousel-img"
                />
              </div>
              <div className="side-image">
                <img 
                  src={heroPhotos[(selectedPhoto + 2) % heroPhotos.length]?.url} 
                  alt={heroPhotos[(selectedPhoto + 2) % heroPhotos.length]?.title}
                  className="carousel-img"
                />
              </div>
            </div>
          </div>
          
          {/* Carousel Controls */}
          <div className="carousel-controls">
            <button 
              className="carousel-prev"
              onClick={() => setSelectedPhoto((prev) => (prev - 1 + heroPhotos.length) % heroPhotos.length)}
            >
              ❮
            </button>
            <button 
              className="carousel-next"
              onClick={() => setSelectedPhoto((prev) => (prev + 1) % heroPhotos.length)}
            >
              ❯
            </button>
          </div>
          
          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {heroPhotos.slice(0, 10).map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === selectedPhoto ? 'active' : ''}`}
                onClick={() => setSelectedPhoto(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="about-content">
                <h2 className="section-title school-primary">
                  About Srijan School
                </h2>
                <p className="about-description text-on-white-black">
                  Srijan School is committed to providing quality education that nurtures young minds 
                  and prepares them for a successful future. We believe in holistic development and 
                  academic excellence.
                </p>
                <div className="about-features">
                  <div className="feature-item">
                    <h4 className="school-primary">🎓 Quality Education</h4>
                    <p>Comprehensive curriculum designed for modern learning</p>
                  </div>
                  <div className="feature-item">
                    <h4 className="school-primary">👨‍🏫 Experienced Teachers</h4>
                    <p>Dedicated and qualified teaching staff</p>
                  </div>
                  <div className="feature-item">
                    <h4 className="school-primary">🏆 Academic Excellence</h4>
                    <p>Consistent track record of outstanding results</p>
                  </div>
                </div>
                <Button 
                  as={Link} 
                  to="/about" 
                  variant="primary" 
                  style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}
                >
                  Read More About Us
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="about-image">
                <img 
                  src="/IMG_8192.JPG" 
                  alt="Srijan School" 
                  className="img-fluid rounded"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links-section py-5 school-bg-secondary">
        <Container>
          <h2 className="section-title text-center school-secondary mb-5">
            Quick Links
          </h2>
          <Row>
            <Col md={3} className="mb-4">
              <Card className="quick-link-card h-100">
                <Card.Body className="text-center">
                  <div className="quick-link-icon school-primary">📚</div>
                  <h5 className="card-title">Academics</h5>
                  <p className="card-text">Explore our academic programs and curriculum</p>
                  <Button as={Link} to="/about" variant="outline-primary" size="sm">
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="quick-link-card h-100">
                <Card.Body className="text-center">
                  <div className="quick-link-icon school-primary">🖼️</div>
                  <h5 className="card-title">Gallery</h5>
                  <p className="card-text">View photos and videos of our school</p>
                  <Button as={Link} to="/gallery" variant="outline-primary" size="sm">
                    View Gallery
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="quick-link-card h-100">
                <Card.Body className="text-center">
                  <div className="quick-link-icon school-primary">🏆</div>
                  <h5 className="card-title">Achievements</h5>
                  <p className="card-text">See our students' and school's achievements</p>
                  <Button as={Link} to="/achievements" variant="outline-primary" size="sm">
                    View Achievements
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="quick-link-card h-100">
                <Card.Body className="text-center">
                  <div className="quick-link-icon school-primary">📞</div>
                  <h5 className="card-title">Contact</h5>
                  <p className="card-text">Get in touch with us for more information</p>
                  <Button as={Link} to="/contact" variant="outline-primary" size="sm">
                    Contact Us
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* School Quote Section */}
      <section className="quote-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <div className="quote-container">
                <h2 className="quote-text school-primary">
                  <span className="quote-mark">❝</span>
                  <strong>Srijan School</strong> is where <br />
                  <span className="quote-highlight school-accent">Young minds bloom</span>
                  <span className="quote-mark">❞</span>
                </h2>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* School Stats Section */}
      <section className="stats-section py-5 school-bg-primary">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="stat-card">
                <h3 className="stat-number school-secondary">500+</h3>
                <p className="stat-label school-secondary">Happy Students</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-card">
                <h3 className="stat-number school-secondary">25+</h3>
                <p className="stat-label school-secondary">Expert Teachers</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-card">
                <h3 className="stat-number school-secondary">7</h3>
                <p className="stat-label school-secondary">Years of Excellence</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-card">
                <h3 className="stat-number school-secondary">100%</h3>
                <p className="stat-label school-secondary">Success Rate</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="cta-title school-primary">Ready to Start Your Child's Journey?</h2>
              <p className="cta-description">
                Join Srijan School and give your child the best education experience in Haldwani, Uttarakhand.
              </p>
              <div className="cta-buttons">
                <Button as={Link} to="/contact" className="btn-primary me-3" style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}>
                  Contact Us Today
                </Button>
                <Button as={Link} to="/about" className="btn-outline-primary">
                  Learn More
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;