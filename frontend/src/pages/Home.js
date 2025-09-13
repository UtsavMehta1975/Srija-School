import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  // School photos for the hero carousel - 30+ high-quality images starting from newest
  const heroPhotos = [
    {
      id: 1,
      url: '/IMG_8192.JPG',
      title: 'School Celebration'
    },
    {
      id: 2,
      url: '/IMG_8193.JPG',
      title: 'Student Activities'
    },
    {
      id: 3,
      url: '/IMG_8191.JPG',
      title: 'Learning Moments'
    },
    {
      id: 4,
      url: '/IMG_8190.JPG',
      title: 'School Events'
    },
    {
      id: 5,
      url: '/IMG_8188.JPG',
      title: 'School Life'
    },
    {
      id: 6,
      url: '/IMG_8189.JPG',
      title: 'Student Engagement'
    },
    {
      id: 7,
      url: '/IMG_8187.JPG',
      title: 'School Activities'
    },
    {
      id: 8,
      url: '/IMG_8184.JPG',
      title: 'Educational Environment'
    },
    {
      id: 9,
      url: '/IMG_8185.JPG',
      title: 'Student Success'
    },
    {
      id: 10,
      url: '/IMG_8186.JPG',
      title: 'Learning Experience'
    },
    {
      id: 11,
      url: '/IMG_8181.JPG',
      title: 'School Community'
    },
    {
      id: 12,
      url: '/IMG_8177.JPG',
      title: 'Academic Excellence'
    },
    {
      id: 13,
      url: '/IMG_8176.JPG',
      title: 'Student Growth'
    },
    {
      id: 14,
      url: '/IMG_8178.JPG',
      title: 'School Spirit'
    },
    {
      id: 15,
      url: '/IMG_8179.JPG',
      title: 'Educational Journey'
    },
    {
      id: 16,
      url: '/IMG_8182.JPG',
      title: 'Learning Together'
    },
    {
      id: 17,
      url: '/IMG_8183.JPG',
      title: 'Student Development'
    },
    {
      id: 18,
      url: '/IMG_8215.JPG',
      title: 'School Achievements'
    },
    {
      id: 19,
      url: '/IMG_8214.JPG',
      title: 'Educational Excellence'
    },
    {
      id: 20,
      url: '/IMG_8213.JPG',
      title: 'Student Learning'
    },
    {
      id: 21,
      url: '/IMG_8212.JPG',
      title: 'School Environment'
    },
    {
      id: 22,
      url: '/IMG_8211.JPG',
      title: 'Academic Success'
    },
    {
      id: 23,
      url: '/IMG_8210.JPG',
      title: 'Learning Community'
    },
    {
      id: 24,
      url: '/IMG_8209.JPG',
      title: 'Student Engagement'
    },
    {
      id: 25,
      url: '/IMG_8208.JPG',
      title: 'Educational Activities'
    },
    {
      id: 26,
      url: '/IMG_8207.JPG',
      title: 'School Life'
    },
    {
      id: 27,
      url: '/IMG_8206.JPG',
      title: 'Student Moments'
    },
    {
      id: 28,
      url: '/IMG_8205.JPG',
      title: 'Learning Experience'
    },
    {
      id: 29,
      url: '/IMG_8204.JPG',
      title: 'School Events'
    },
    {
      id: 30,
      url: '/IMG_8203.JPG',
      title: 'Student Activities'
    },
    {
      id: 31,
      url: '/IMG_8202.JPG',
      title: 'Educational Journey'
    },
    {
      id: 32,
      url: '/IMG_8201.JPG',
      title: 'School Community'
    },
    {
      id: 33,
      url: '/IMG_8200.JPG',
      title: 'Learning Together'
    },
    {
      id: 34,
      url: '/IMG_8199.JPG',
      title: 'Student Success'
    },
    {
      id: 35,
      url: '/IMG_8198.JPG',
      title: 'Academic Excellence'
    },
    {
      id: 36,
      url: '/IMG_8197.JPG',
      title: 'School Achievements'
    },
    {
      id: 37,
      url: '/IMG_8196.JPG',
      title: 'Student Growth'
    },
    {
      id: 38,
      url: '/IMG_8195.JPG',
      title: 'Educational Environment'
    },
    {
      id: 39,
      url: '/IMG_8194.JPG',
      title: 'Learning Moments'
    },
    {
      id: 40,
      url: '/IMG_2436.JPG',
      title: 'School Celebration'
    },
    {
      id: 41,
      url: '/IMG_2331.JPG',
      title: 'Student Activities'
    },
    {
      id: 42,
      url: '/IMG_2034.JPG',
      title: 'Learning Environment'
    },
    {
      id: 43,
      url: '/IMG_2033.JPG',
      title: 'School Life'
    },
    {
      id: 44,
      url: '/IMG_2032.JPG',
      title: 'Educational Experience'
    },
    {
      id: 45,
      url: '/IMG_2031.JPG',
      title: 'Student Engagement'
    },
    {
      id: 46,
      url: '/IMG_2030.JPG',
      title: 'Academic Success'
    },
    {
      id: 47,
      url: '/IMG_2029.JPG',
      title: 'Learning Community'
    },
    {
      id: 48,
      url: '/IMG_2023.JPG',
      title: 'School Spirit'
    },
    {
      id: 49,
      url: '/IMG_1973.JPG',
      title: 'Student Development'
    },
    {
      id: 50,
      url: '/aboutus.JPG',
      title: 'Srijan School'
    }
  ];

  // Auto-rotate hero carousel
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSelectedPhoto((prev) => (prev + 1) % heroPhotos.length);
    }, 5000); // Change photo every 5 seconds

    return () => clearInterval(interval);
  }, [heroPhotos.length]);


  return (
    <div className="home-page">
      {/* Hero Photo Carousel */}
      <section className="hero-photo-carousel">
        
        <Container>
          <Row>
            <Col lg={8}>
              {/* Photo Display Box */}
              <div 
                className="hero-photo-display"
                style={{
                  backgroundImage: `url(${heroPhotos[selectedPhoto]?.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              {/* Photo Slider */}
              <div className="hero-photo-slider">
                {heroPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className={`hero-photo-thumb ${index === selectedPhoto ? 'active' : ''}`}
                  style={{
                      backgroundImage: `url(${photo.url})`,
                    backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    onClick={() => setSelectedPhoto(index)}
                    title={photo.title}
                  />
                ))}
              </div>
            </Col>
            
            <Col lg={4} className="d-flex align-items-center">
              <div className="text-white">
                <h3 className="fw-bold mb-3">About Srijan School</h3>
                          <p className="lead mb-4">
                  Life at Srijan centres on a shared commitment to academic excellence, 
                  intellectual growth, and holistic development. We are dedicated to nurturing 
                  young minds in Haldwani, Uttarakhand since 2018.
                </p>
                <div className="d-grid gap-2">
                  <Button as={Link} to="/gallery" className="btn-school-primary">
                    View Gallery
                            </Button>
                  <Button as={Link} to="/achievements" className="btn-school-accent">
                    View Our Achievements
                            </Button>
                </div>
                  </div>
                </Col>
              </Row>
            </Container>
      </section>

      {/* Message from Leaders */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="text-gradient-primary mb-3">Message from Leaders</h2>
              <p className="text-muted">Words of wisdom from our leadership team</p>
            </Col>
          </Row>
          
          <Row>
            <Col lg={6} className="mb-4">
              <Card className="h-100 card-elevated border-0">
                <Card.Body className="text-center p-4">
                  <div className="leader-avatar mb-3">
                    <div className="avatar-circle">
                      <span className="avatar-text">GS</span>
                    </div>
              </div>
                  <h5 className="school-primary mb-2">G.S.MEHRA</h5>
                  <p className="text-muted mb-3 fw-bold">Manager/Director</p>
                  <blockquote className="blockquote mb-0">
                    <p className="text-muted">
                      "At Srijan School, we believe in nurturing not just academic excellence, 
                      but also character, creativity, and compassion. Our commitment is to 
                      provide a holistic education that prepares students for the challenges 
                      of tomorrow while staying rooted in timeless values."
                    </p>
                  </blockquote>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={6} className="mb-4">
              <Card className="h-100 card-elevated border-0">
                <Card.Body className="text-center p-4">
                  <div className="leader-avatar mb-3">
                    <div className="avatar-circle">
                      <span className="avatar-text">KK</span>
              </div>
              </div>
                  <h5 className="school-primary mb-2">Kailash Koranga</h5>
                  <p className="text-muted mb-3 fw-bold">Principal</p>
                  <blockquote className="blockquote mb-0">
                    <p className="text-muted">
                      "Education is the foundation of a progressive society. At Srijan School, 
                      we strive to create an environment where every child can discover their 
                      potential, develop critical thinking skills, and become responsible 
                      citizens who contribute positively to our community."
                    </p>
                  </blockquote>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Preview */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="text-gradient-primary mb-4">About Srijan School</h2>
              <p className="lead text-muted mb-4">
                Srijan School is an educational institution designed to provide learning spaces and learning environments 
                for the teaching of students under the direction of dedicated teachers.
              </p>
              <p className="text-muted mb-4">
                Life at Srijan centres on a shared commitment to academic excellence, intellectual growth, art, athletics, 
                high standards of ethical awareness, sportsmanship, and community service.
              </p>
              <Button as={Link} to="/gallery" className="btn-school-primary" size="lg">
                View Gallery
              </Button>
            </Col>
            <Col lg={6}>
              <div className="about-image">
                <Carousel fade interval={3000} className="about-carousel">
                  <Carousel.Item>
                    <div 
                      className="carousel-image-container  d-block w-100"
                      style={{ 
                        height: '400px', 
                        backgroundColor: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Image 
                        src="/aboutus.JPG" 
                        alt="About Srijan School - Image 1" 
                        className="carousel-image"
                        style={{ 
                          maxHeight: '100%', 
                          maxWidth: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div 
                      className="carousel-image-container  d-block w-100"
                  style={{
                    height: '400px',
                        backgroundColor: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Image 
                        src="/aboutus2.JPG" 
                        alt="About Srijan School - Image 2" 
                        className="carousel-image"
                        style={{ 
                          maxHeight: '100%', 
                          maxWidth: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                  </Carousel.Item>
                </Carousel>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="text-gradient-primary mb-3">Why Choose Srijan School</h2>
              <p className="text-muted">We provide the best education and facilities for your child's growth</p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 text-center card-elevated">
                <Card.Body className="p-4">
                  <div className="school-primary mb-3" style={{ fontSize: '3rem' }}>💻</div>
                  <h5 className="school-primary">Smart Classes</h5>
                  <p className="text-muted">
                    Modern smart classrooms with digital learning tools and interactive whiteboards.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 text-center card-elevated">
                <Card.Body className="p-4">
                  <div className="school-primary mb-3" style={{ fontSize: '3rem' }}>🚌</div>
                  <h5 className="school-primary">Transport Facility</h5>
                  <p className="text-muted">
                    Safe and reliable transport service with GPS tracking and trained drivers.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 text-center card-elevated">
                <Card.Body className="p-4">
                  <div className="school-primary mb-3" style={{ fontSize: '3rem' }}>🔬</div>
                  <h5 className="school-primary">Science Labs</h5>
                  <p className="text-muted">
                    Well-equipped science laboratories for hands-on learning and experimentation.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="text-gradient-primary mb-3">Quick Links</h2>
              <p className="text-muted">Important information and resources for students and parents</p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={3}>
              <Card className="h-100 text-center card-elevated">
                <Card.Body className="p-4">
                  <div className="school-primary mb-3" style={{ fontSize: '2.5rem' }}>📋</div>
                  <h6 className="school-primary">Rules & Regulations</h6>
                  <p className="text-muted small">School policies and guidelines</p>
                  <Button as={Link} to="/rules" className="btn-school-secondary" size="sm">
                    View Rules
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 text-center card-elevated">
                <Card.Body className="p-4">
                  <div className="school-primary mb-3" style={{ fontSize: '2.5rem' }}>📸</div>
                  <h6 className="school-primary">Gallery</h6>
                  <p className="text-muted small">Photos and videos of school events</p>
                  <Button as={Link} to="/gallery" className="btn-school-secondary" size="sm">
                    View Gallery
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 text-center card-elevated">
                <Card.Body className="p-4">
                  <div className="school-primary mb-3" style={{ fontSize: '2.5rem' }}>🏆</div>
                  <h6 className="school-primary">Achievements</h6>
                  <p className="text-muted small">Student and school accomplishments</p>
                  <Button as={Link} to="/achievements" className="btn-school-secondary" size="sm">
                    View Achievements
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 text-center card-elevated">
                <Card.Body className="p-4">
                  <div className="school-primary mb-3" style={{ fontSize: '2.5rem' }}>📞</div>
                  <h6 className="school-primary">Contact Us</h6>
                  <p className="text-muted small">Get in touch with us</p>
                  <Button as={Link} to="/contact" className="btn-school-secondary" size="sm">
                    Contact
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
