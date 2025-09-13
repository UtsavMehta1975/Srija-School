import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  // School photos for the hero carousel - 50+ high-quality images starting from newest
  const heroPhotos = [
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

  // Auto-rotate hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedPhoto((prev) => (prev + 1) % heroPhotos.length);
    }, 4000); // Change photo every 4 seconds
    return () => clearInterval(interval);
  }, [heroPhotos.length]);

  return (
    <div className="makoons-home-page">
      {/* Hero Section - Makoons Style */}
      <section className="hero-section">
        <div className="hero-background">
          <div 
            className="hero-image"
                  style={{
              backgroundImage: `url(${heroPhotos[selectedPhoto]?.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
          />
          <div className="hero-overlay"></div>
        </div>
        
        <Container className="hero-content">
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="hero-text-col">
              <div className="hero-text">
                <h1 className="hero-title">
                  <span className="hero-subtitle">On this</span>
                  <br />
                  <span className="hero-main-title">Aksharabhyasam</span>
                  <br />
                  <span className="hero-action">Start Your Child's Education</span>
                          </h1>
                <p className="hero-description">
                  Give your child a joyful beginning with our special educational program at Srijan School.
                </p>
                <div className="hero-buttons">
                  <Button as={Link} to="/contact" className="btn-primary-custom">
                    Visit Srijan School
                            </Button>
                  <Button as={Link} to="/gallery" className="btn-secondary-custom">
                    View Gallery
                            </Button>
                </div>
              </div>
            </Col>
            <Col lg={6} className="hero-image-col">
              <div className="hero-image-container">
                <Image 
                  src="/aboutus.JPG" 
                  alt="Srijan School" 
                  className="hero-main-image"
                  fluid
                />
                          </div>
                        </Col>
                      </Row>
                    </Container>
      </section>

      {/* School Quote Section */}
      <section className="quote-section">
            <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <div className="quote-container">
                <h2 className="quote-text">
                  <span className="quote-mark">❝</span>
                  <strong>Srijan School</strong> is where <br />
                  <span className="quote-highlight">Young minds bloom</span>
                  <span className="quote-mark">❞</span>
                </h2>
                  </div>
                </Col>
              </Row>
            </Container>
      </section>

      {/* School Stats Section */}
      <section className="stats-section">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="stat-card">
                <h3 className="stat-number">500+</h3>
                <p className="stat-label">Happy Students</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-card">
                <h3 className="stat-number">25+</h3>
                <p className="stat-label">Expert Teachers</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-card">
                <h3 className="stat-number">7</h3>
                <p className="stat-label">Years of Excellence</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-card">
                <h3 className="stat-number">100%</h3>
                <p className="stat-label">Success Rate</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About School Section */}
      <section className="about-school-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="about-image-container">
                <Image 
                  src="/aboutus2.JPG" 
                  alt="About Srijan School" 
                  className="about-school-image"
                  fluid
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="about-content">
                <h2 className="section-title">About Srijan School</h2>
                <h3 className="about-subtitle">Where Every Child's Journey Begins</h3>
                <p className="about-description">
                  One of Uttarakhand's best schools, Srijan School, is committed to giving kids a loving, 
                  exciting atmosphere in which they can learn and develop. As an established educational 
                  institution, we encourage holistic development and make sure that every child enjoys 
                  learning via play-based learning, engaging activities, and a well-organized curriculum.
                </p>
                <Button as={Link} to="/about" className="btn-primary-custom">
                  Learn More
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Programs Section */}
      <section className="programs-section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Our Educational Programs</h2>
              <p className="section-subtitle">Comprehensive learning for every age group</p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="program-card">
                <Card.Body className="text-center">
                  <div className="program-icon">📚</div>
                  <h4>Primary Education</h4>
                  <p>Classes 1-5</p>
                  <p className="text-muted">Foundation building with interactive learning</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="program-card">
                <Card.Body className="text-center">
                  <div className="program-icon">🎓</div>
                  <h4>Secondary Education</h4>
                  <p>Classes 6-10</p>
                  <p className="text-muted">Advanced learning with practical applications</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="program-card">
                <Card.Body className="text-center">
                  <div className="program-icon">🏆</div>
                  <h4>Senior Secondary</h4>
                  <p>Classes 11-12</p>
                  <p className="text-muted">Exam preparation and career guidance</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="core-values-section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Core Values</h2>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={6} lg={3}>
              <div className="value-card">
                <div className="value-number">1</div>
                <h5>Developing Little Explorers</h5>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="value-card">
                <div className="value-number">2</div>
                <h5>Language Blossoms</h5>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="value-card">
                <div className="value-number">3</div>
                <h5>From Crawling to Confident</h5>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="value-card">
                <div className="value-number">4</div>
                <h5>Active Bodies, Active Minds</h5>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Photo Gallery Preview */}
      <section className="gallery-preview-section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Gallery</h2>
              <p className="section-subtitle">Capturing beautiful moments at Srijan School</p>
            </Col>
          </Row>
          <Row className="g-3">
            {heroPhotos.slice(0, 8).map((photo) => (
              <Col md={3} key={photo.id}>
                <div className="gallery-preview-item">
                  <Image 
                    src={photo.url} 
                    alt={photo.title}
                    className="gallery-preview-image"
                    fluid
                  />
                </div>
              </Col>
            ))}
          </Row>
          <Row className="text-center mt-4">
            <Col>
              <Button as={Link} to="/gallery" className="btn-primary-custom">
                View All Photos
                  </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">What Parents Say</h2>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="testimonial-card">
                <Card.Body>
                  <p className="testimonial-text">
                    "Enrolling my daughter in Srijan School is the best decision I've ever made. 
                    The environment, classrooms, teachers, and importantly, the education process 
                    is well-organized."
                  </p>
                  <div className="testimonial-author">
                    <strong>Dr. Anand Singh</strong>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="testimonial-card">
                <Card.Body>
                  <p className="testimonial-text">
                    "The teachers and staff here are so nice and well-educated. My son loves 
                    learning here, and we like that they have fun while learning."
                  </p>
                  <div className="testimonial-author">
                    <strong>Mr. Shubham Garg</strong>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="testimonial-card">
                <Card.Body>
                  <p className="testimonial-text">
                    "We couldn't be happier to see our child happy while learning. Their 
                    educational structure is so good even my son always loves to learn."
                  </p>
                  <div className="testimonial-author">
                    <strong>Dr. Manish Kr Gupta</strong>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="cta-title">Ready to Start Your Child's Journey?</h2>
              <p className="cta-description">
                Join Srijan School and give your child the best education experience in Haldwani, Uttarakhand.
              </p>
              <div className="cta-buttons">
                <Button as={Link} to="/contact" className="btn-primary-custom btn-large">
                  Contact Us Today
                </Button>
                <Button as={Link} to="/about" className="btn-secondary-custom btn-large">
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