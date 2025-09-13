import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const TeacherServiceRules = () => {
  const serviceRules = [
    "Teachers must report to school 15 minutes before the first bell",
    "Regular attendance is mandatory with prior permission required for leave",
    "Professional dress code must be maintained at all times",
    "Mobile phones should be switched off during teaching hours",
    "Teachers must maintain confidentiality of student information",
    "Regular professional development and training is encouraged",
    "Teachers must participate in school events and meetings",
    "Proper documentation of student progress is required",
    "Teachers must follow the prescribed curriculum and teaching methods",
    "Respectful behavior towards students, parents, and colleagues is mandatory"
  ];

  const responsibilities = [
    "Prepare and deliver lessons according to the curriculum",
    "Assess and evaluate student performance regularly",
    "Maintain discipline and order in the classroom",
    "Communicate with parents about student progress",
    "Participate in staff meetings and professional development",
    "Maintain accurate records of attendance and grades",
    "Supervise students during breaks and activities",
    "Contribute to school improvement initiatives",
    "Follow school policies and procedures",
    "Maintain a safe and conducive learning environment"
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="text-primary mb-3">Service Rules For Teachers</h1>
            <p className="lead text-muted">
              Professional conduct and service guidelines for teaching staff at Srijan School
            </p>
          </div>
        </Col>
      </Row>

      {/* Service Rules */}
      <Row className="mb-5">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Service Rules</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {serviceRules.map((rule, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">📋</i>
                    {rule}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Key Responsibilities</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {responsibilities.map((responsibility, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">✅</i>
                    {responsibility}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Working Hours */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Working Hours & Schedule</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h5 className="text-primary mb-3">Regular Schedule</h5>
                  <ul className="text-muted">
                    <li>Reporting Time: 7:45 AM</li>
                    <li>School Hours: 8:00 AM - 3:30 PM</li>
                    <li>Teaching Periods: 8 periods per day</li>
                    <li>Break Time: 11:15 AM - 11:30 AM</li>
                    <li>Lunch Break: 1:00 PM - 1:45 PM</li>
                    <li>Duty Hours: As assigned by Principal</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h5 className="text-primary mb-3">Additional Duties</h5>
                  <ul className="text-muted">
                    <li>Morning Assembly: Rotational basis</li>
                    <li>Examination Duty: As required</li>
                    <li>Parent-Teacher Meetings: Monthly</li>
                    <li>School Events: Participation mandatory</li>
                    <li>Professional Development: Regular sessions</li>
                    <li>Emergency Duties: As assigned</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Leave Policy */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Leave Policy</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <h6 className="text-primary">Casual Leave</h6>
                  <p className="text-muted">12 days per academic year</p>
                </Col>
                <Col md={4}>
                  <h6 className="text-primary">Medical Leave</h6>
                  <p className="text-muted">15 days per academic year</p>
                </Col>
                <Col md={4}>
                  <h6 className="text-primary">Emergency Leave</h6>
                  <p className="text-muted">3 days per academic year</p>
                </Col>
              </Row>
              <div className="mt-3">
                <h6 className="text-primary">Leave Application Process</h6>
                <ul className="text-muted">
                  <li>Apply at least 24 hours in advance for casual leave</li>
                  <li>Medical leave requires doctor's certificate</li>
                  <li>Emergency leave can be applied on the same day</li>
                  <li>Principal's approval required for all leaves</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Contact Information */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 text-center">
              <h4 className="text-primary mb-3">Teacher Support</h4>
              <p className="text-muted mb-3">
                For any queries regarding service rules or professional matters:
              </p>
              <div className="row text-center">
                <div className="col-md-4">
                  <h6 className="text-primary">Principal Office</h6>
                  <p className="text-muted">7895236185</p>
                </div>
                <div className="col-md-4">
                  <h6 className="text-primary">HR Department</h6>
                  <p className="text-muted">hr@genesisschool.com</p>
                </div>
                <div className="col-md-4">
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

export default TeacherServiceRules;