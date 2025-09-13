import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const Rules = () => {
  const rules = [
    {
      category: "General Rules",
      items: [
        "Students must arrive at school on time. Late arrivals will be marked and may face disciplinary action.",
        "All students must wear the prescribed school uniform during school hours and school functions.",
        "Students must maintain proper decorum and respect towards teachers, staff, and fellow students.",
        "Mobile phones and electronic devices are not allowed in the school premises without prior permission.",
        "Students must carry their school ID cards at all times and produce them when requested."
      ]
    },
    {
      category: "Academic Rules",
      items: [
        "Regular attendance is mandatory. A minimum of 75% attendance is required to appear for examinations.",
        "Students must complete all assignments and homework on time.",
        "Cheating or copying during examinations will result in strict disciplinary action.",
        "Students must maintain their textbooks and notebooks in good condition.",
        "Library books must be returned on time. Late returns will incur fines."
      ]
    },
    {
      category: "Discipline Rules",
      items: [
        "Any form of bullying, harassment, or violence is strictly prohibited.",
        "Students must not damage school property. Any damage must be reported immediately.",
        "Smoking, drinking, or any form of substance abuse is strictly forbidden.",
        "Students must not bring any harmful objects or weapons to school.",
        "Proper language must be used at all times. Foul language is not tolerated."
      ]
    },
    {
      category: "Safety Rules",
      items: [
        "Students must follow all safety instructions during laboratory sessions.",
        "Emergency evacuation procedures must be followed during drills.",
        "Students must not leave the school premises without proper permission.",
        "Visitors must be reported to the school office and must carry proper identification.",
        "Students must inform teachers or staff about any health issues or emergencies."
      ]
    },
    {
      category: "Extracurricular Rules",
      items: [
        "Participation in sports and cultural activities is encouraged but not mandatory.",
        "Students must follow the rules and regulations of each activity they participate in.",
        "Sports equipment must be used responsibly and returned after use.",
        "Students must maintain sportsmanship and fair play during competitions.",
        "Any injuries during activities must be reported immediately to the supervising teacher."
      ]
    }
  ];

  return (
    <Container className="py-5">
      <h1 className="text-center school-primary mb-5">School Rules & Regulations</h1>
      
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h3 className="school-primary mb-3">Important Notice</h3>
              <p className="text-muted">
                These rules and regulations are designed to maintain discipline, ensure safety, 
                and create a conducive learning environment for all students. All students, 
                parents, and staff are expected to follow these guidelines.
              </p>
              <p className="text-muted">
                Violation of any rule may result in appropriate disciplinary action as per 
                the school's disciplinary policy.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        {rules.map((rule, index) => (
          <Col lg={6} key={index}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Header className="school-bg-primary text-white">
                <h4 className="mb-0">{rule.category}</h4>
              </Card.Header>
              <Card.Body className="p-0">
                <ListGroup variant="flush">
                  {rule.items.map((item, itemIndex) => (
                    <ListGroup.Item key={itemIndex} className="border-0">
                      <div className="d-flex">
                        <span className="school-primary me-2">•</span>
                        <span>{item}</span>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Additional Information */}
      <Row className="mt-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h3 className="school-primary mb-3">Additional Information</h3>
              <Row>
                <Col md={6}>
                  <h5 className="school-secondary">Disciplinary Actions</h5>
                  <ul className="text-muted">
                    <li>Verbal warning for minor infractions</li>
                    <li>Written warning for repeated violations</li>
                    <li>Parent conference for serious violations</li>
                    <li>Suspension for severe violations</li>
                    <li>Expulsion for extreme cases</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h5 className="school-secondary">Appeal Process</h5>
                  <ul className="text-muted">
                    <li>Students or parents can appeal disciplinary actions</li>
                    <li>Appeals must be submitted within 48 hours</li>
                    <li>Appeal committee will review the case</li>
                    <li>Final decision will be communicated within 5 days</li>
                    <li>All appeals are handled confidentially</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Contact Information */}
      <Row className="mt-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 text-center">
              <h5 className="school-primary mb-3">Questions About Rules?</h5>
              <p className="text-muted mb-3">
                If you have any questions about these rules or need clarification, 
                please contact the school administration.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <a href="/contact" className="btn btn-primary btn-school-primary">
                  Contact Us
                </a>
                <a href="tel:+15551234567" className="btn btn-outline-primary">
                  Call: (555) 123-4567
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Rules;

