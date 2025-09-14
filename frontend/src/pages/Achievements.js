import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

const AcademicCalendar = () => {
  const academicCalendar = [
    {
      title: "Academic Excellence",
      description: "Our students consistently achieve outstanding results in board examinations with 95%+ pass rate.",
      year: "2024",
      category: "Academic"
    },
    {
      title: "Sports Championship",
      description: "Won the District Level Inter-School Sports Championship for the third consecutive year.",
      year: "2024",
      category: "Sports"
    },
    {
      title: "Science Fair Winner",
      description: "First place in the State Level Science Exhibition with innovative project on renewable energy.",
      year: "2024",
      category: "Science"
    },
    {
      title: "Cultural Festival",
      description: "Best School Award in the Annual Cultural Festival organized by the Education Department.",
      year: "2023",
      category: "Cultural"
    },
    {
      title: "Teacher Excellence",
      description: "Ms. Sarah Johnson awarded 'Best Teacher' by the State Education Board for innovative teaching methods.",
      year: "2023",
      category: "Faculty"
    },
    {
      title: "Environmental Initiative",
      description: "Recognition for 'Green School' initiative with 100% waste segregation and solar power implementation.",
      year: "2023",
      category: "Environment"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Academic': 'primary',
      'Sports': 'success',
      'Science': 'info',
      'Cultural': 'warning',
      'Faculty': 'secondary',
      'Environment': 'success'
    };
    return colors[category] || 'primary';
  };

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="text-gradient-primary mb-3">Academic Calendar</h1>
            <p className="lead text-muted">
              Celebrating excellence and recognizing the outstanding accomplishments of our students, teachers, and school community.
            </p>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        {academicCalendar.map((achievement, index) => (
          <Col md={6} lg={4} key={index}>
            <Card className="h-100 card-elevated">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <Badge bg={getCategoryColor(achievement.category)} className="mb-2">
                    {achievement.category}
                  </Badge>
                  <small className="text-muted">{achievement.year}</small>
                </div>
                <h5 className="school-primary mb-3">{achievement.title}</h5>
                <p className="text-muted">{achievement.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Statistics Section */}
      <Row className="mt-5">
        <Col>
          <Card className="card-elevated">
            <Card.Body className="p-5">
              <h3 className="text-center text-gradient-primary mb-4">Achievement Statistics</h3>
              <Row className="text-center">
                <Col md={3} className="mb-3">
                  <div className="school-bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{ width: '80px', height: '80px' }}>
                    <h3 className="mb-0">95%</h3>
                  </div>
                  <h5>Pass Rate</h5>
                  <p className="text-muted">Board Examinations</p>
                </Col>
                <Col md={3} className="mb-3">
                  <div className="school-bg-accent text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{ width: '80px', height: '80px' }}>
                    <h3 className="mb-0">150+</h3>
                  </div>
                  <h5>Awards</h5>
                  <p className="text-muted">Various Competitions</p>
                </Col>
                <Col md={3} className="mb-3">
                  <div className="school-bg-secondary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{ width: '80px', height: '80px' }}>
                    <h3 className="mb-0">25+</h3>
                  </div>
                  <h5>Years</h5>
                  <p className="text-muted">Of Excellence</p>
                </Col>
                <Col md={3} className="mb-3">
                  <div className="school-bg-accent text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{ width: '80px', height: '80px' }}>
                    <h3 className="mb-0">1000+</h3>
                  </div>
                  <h5>Students</h5>
                  <p className="text-muted">Successfully Graduated</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AcademicCalendar;


