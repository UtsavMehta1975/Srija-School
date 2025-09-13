import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const ParentRecommendations = () => {
  const academicSupport = [
    "Ensure your child completes homework on time",
    "Create a quiet study space at home",
    "Monitor your child's academic progress regularly",
    "Attend parent-teacher meetings without fail",
    "Encourage reading habits and provide age-appropriate books",
    "Help with difficult subjects but don't do the work for them",
    "Set realistic academic goals for your child",
    "Celebrate achievements and provide encouragement during setbacks"
  ];

  const disciplineGuidelines = [
    "Maintain consistent discipline at home",
    "Set clear rules and consequences",
    "Be a positive role model for your child",
    "Encourage good behavior with positive reinforcement",
    "Address behavioral issues promptly and constructively",
    "Work with teachers to maintain consistent discipline",
    "Teach your child to respect authority and others",
    "Encourage responsibility and independence"
  ];

  const healthAndSafety = [
    "Ensure your child gets adequate sleep (8-10 hours)",
    "Provide nutritious meals and snacks",
    "Encourage regular physical activity and exercise",
    "Monitor your child's health and seek medical attention when needed",
    "Teach personal hygiene and safety practices",
    "Ensure your child wears proper school uniform and shoes",
    "Keep emergency contact information updated",
    "Discuss internet safety and responsible technology use"
  ];

  const communicationTips = [
    "Maintain open communication with your child",
    "Listen to your child's concerns and problems",
    "Communicate regularly with teachers and school staff",
    "Attend school events and activities when possible",
    "Join the Parent-Teacher Association (PTA)",
    "Use the school's communication channels effectively",
    "Provide feedback to the school administration",
    "Stay informed about school policies and updates"
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="text-primary mb-3">Recommendation to Parents</h1>
            <p className="lead text-muted">
              Guidelines and suggestions for parents to support their child's education and development at Srijan School
            </p>
          </div>
        </Col>
      </Row>

      {/* Academic Support */}
      <Row className="mb-5">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Academic Support</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {academicSupport.map((recommendation, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">📚</i>
                    {recommendation}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Discipline Guidelines</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {disciplineGuidelines.map((guideline, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">⚖️</i>
                    {guideline}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Health and Safety */}
      <Row className="mb-5">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Health & Safety</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {healthAndSafety.map((tip, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">🏥</i>
                    {tip}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Communication Tips</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {communicationTips.map((tip, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">💬</i>
                    {tip}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Parent Involvement */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Parent Involvement Opportunities</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <h5 className="text-primary mb-3">Volunteer Programs</h5>
                  <ul className="text-muted">
                    <li>Library assistance</li>
                    <li>Event organization</li>
                    <li>Sports coaching</li>
                    <li>Career guidance sessions</li>
                    <li>Cultural program support</li>
                  </ul>
                </Col>
                <Col md={4}>
                  <h5 className="text-primary mb-3">PTA Activities</h5>
                  <ul className="text-muted">
                    <li>Monthly PTA meetings</li>
                    <li>School improvement committees</li>
                    <li>Fundraising events</li>
                    <li>Policy development input</li>
                    <li>Community outreach programs</li>
                  </ul>
                </Col>
                <Col md={4}>
                  <h5 className="text-primary mb-3">Educational Support</h5>
                  <ul className="text-muted">
                    <li>Guest lectures</li>
                    <li>Workshop facilitation</li>
                    <li>Mentorship programs</li>
                    <li>Field trip assistance</li>
                    <li>Technology support</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Important Reminders */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Important Reminders for Parents</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6 className="text-primary">Daily Responsibilities</h6>
                  <ul className="text-muted">
                    <li>Ensure your child arrives at school on time</li>
                    <li>Check that homework is completed</li>
                    <li>Pack healthy lunch and snacks</li>
                    <li>Verify that school supplies are ready</li>
                    <li>Check for any school notices or circulars</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6 className="text-primary">Weekly Tasks</h6>
                  <ul className="text-muted">
                    <li>Review your child's weekly progress</li>
                    <li>Plan weekend activities and rest</li>
                    <li>Check school calendar for upcoming events</li>
                    <li>Communicate with teachers if needed</li>
                    <li>Ensure uniform and supplies are ready</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Contact Information */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 text-center">
              <h4 className="text-primary mb-3">Parent Support Services</h4>
              <p className="text-muted mb-3">
                For any questions, concerns, or support regarding your child's education:
              </p>
              <div className="row text-center">
                <div className="col-md-3">
                  <h6 className="text-primary">Principal Office</h6>
                  <p className="text-muted">7895236185</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-primary">PTA Coordinator</h6>
                  <p className="text-muted">7895236192</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-primary">Email</h6>
                  <p className="text-muted">parents@genesisschool.com</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-primary">Office Hours</h6>
                  <p className="text-muted">8:00 AM - 4:00 PM</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ParentRecommendations;