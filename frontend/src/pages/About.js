import React from 'react';
import { Container, Row, Col, Card, Image, Carousel } from 'react-bootstrap';

const About = () => {
  // Hardcoded faculty data
  const faculty = [
    {
      id: 1,
      name: "Dr. G.S. Mehra",
      position: "Founder & Director",
      qualification: "Ph.D. in Education",
      experience: "25+ Years",
      image: "https://via.placeholder.com/300x300/007bff/ffffff?text=Dr.+G.S.+Mehra"
    },
    {
      id: 2,
      name: "Kailash Koranga",
      position: "Principal",
      qualification: "M.Ed., M.A.",
      experience: "15+ Years",
      image: "https://via.placeholder.com/300x300/28a745/ffffff?text=Kailash+Koranga"
    },
    {
      id: 3,
      name: "Mrs. Sunita Sharma",
      position: "Vice Principal",
      qualification: "M.Sc., B.Ed.",
      experience: "12+ Years",
      image: "https://via.placeholder.com/300x300/dc3545/ffffff?text=Mrs.+Sunita+Sharma"
    },
    {
      id: 4,
      name: "Mr. Rajesh Kumar",
      position: "Head of Science",
      qualification: "M.Sc. Physics, B.Ed.",
      experience: "10+ Years",
      image: "https://via.placeholder.com/300x300/ffc107/000000?text=Mr.+Rajesh+Kumar"
    }
  ];

  // Hardcoded about content
  const aboutContent = {
    mission: "To provide quality education that nurtures young minds and prepares them for the challenges of tomorrow while maintaining the highest standards of academic excellence.",
    vision: "To be a leading educational institution that shapes future leaders through innovative teaching methods and holistic development.",
    history: "Srijan School was established in 2018 by Dr. G.S. Mehra under the Shree Shiv Singh Memorial Education Society. Located in Haldwani, Uttarakhand, our school is affiliated with the Anglo-Indian Board, Government of Uttarakhand.",
    values: "We believe in fostering creativity, critical thinking, and character development in every student."
  };

  return (
    <Container className="py-5">
      {/* About Content */}
      <Row className="mb-5">
        <Col>
          <h1 className="text-center school-primary mb-5">About Srijan School</h1>
          
          {/* About Us Image Carousel */}
          <div className="mb-5">
            <Carousel fade interval={3000} className="about-carousel">
              <Carousel.Item>
                <div 
                  className="carousel-image-container d-block w-100"
                  style={{ 
                    height: '400px', 
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
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
                  className="carousel-image-container d-block w-100"
                  style={{ 
                    height: '400px', 
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
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
          
          {/* Mission */}
          <Card className="mb-4 card-elevated bg-red">
            <Card.Body className="p-4">
              <h3 className="text-on-red mb-3">Our Mission</h3>
              <p className="lead text-on-red">
                {aboutContent.mission}
              </p>
            </Card.Body>
          </Card>

          {/* Vision */}
          <Card className="mb-4 card-elevated bg-black">
            <Card.Body className="p-4">
              <h3 className="text-on-black mb-3">Our Vision</h3>
              <p className="lead text-on-black">
                {aboutContent.vision}
              </p>
            </Card.Body>
          </Card>

          {/* History */}
          <Card className="mb-4 card-elevated bg-red">
            <Card.Body className="p-4">
              <h3 className="text-on-red mb-3">Our History</h3>
              <p className="lead text-on-red">
                {aboutContent.history}
              </p>
            </Card.Body>
          </Card>

          {/* Facilities */}
          {aboutContent.facilities && (
            <Card className="mb-4 card-elevated">
              <Card.Body className="p-4">
                <h3 className="text-gradient-primary mb-3">
                  {aboutContent.facilities.title || 'Our Facilities'}
                </h3>
                <p className="text-muted">
                  {aboutContent.facilities.content}
                </p>
                {aboutContent.facilities.image_url && (
                  <div className="text-center mt-3">
                    <Image 
                      src={`${process.env.REACT_APP_API_URL}${aboutContent.facilities.image_url}`}
                      alt="Facilities"
                      fluid
                      className="rounded"
                      style={{ maxHeight: '300px' }}
                    />
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* Faculty Section */}
      <Row>
        <Col>
          <h2 className="text-center text-gradient-primary mb-5">Our Faculty</h2>
          
          <Row className="g-4">
            {faculty.map((member) => (
              <Col md={6} lg={4} key={member.id}>
                <Card className="h-100 faculty-card card-elevated">
                  <Card.Body className="text-center">
                    <Card.Title className="school-primary">{member.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {member.position}
                    </Card.Subtitle>
                    <p className="text-muted small mb-2">
                      <strong>Qualification:</strong> {member.qualification}
                    </p>
                    <p className="text-muted small mb-2">
                      <strong>Experience:</strong> {member.experience}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default About;

