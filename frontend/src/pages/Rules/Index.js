import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Rules = () => {
  const rulesCategories = [
    {
      title: "Admission Rules",
      description: "Guidelines and procedures for student admission to Srijan School",
      link: "/rules/admission",
      icon: "📝"
    },
    {
      title: "Bus Rules",
      description: "Transportation guidelines and safety protocols for school bus services",
      link: "/rules/bus",
      icon: "🚌"
    },
    {
      title: "Fees Rules",
      description: "Fee structure, payment schedules, and financial policies",
      link: "/rules/fees",
      icon: "💰"
    },
    {
      title: "Recommendation to Parents",
      description: "Guidelines and suggestions for parents to support their child's education",
      link: "/rules/parent-recommendations",
      icon: "👨‍👩‍👧‍👦"
    },
    {
      title: "Rules for Discipline of Students",
      description: "Code of conduct and disciplinary measures for maintaining school environment",
      link: "/rules/discipline",
      icon: "⚖️"
    },
    {
      title: "School Rules",
      description: "General rules and regulations governing school life and activities",
      link: "/rules/school",
      icon: "🏫"
    },
    {
      title: "School Timings",
      description: "Daily schedule, class timings, and academic calendar information",
      link: "/rules/timings",
      icon: "⏰"
    },
    {
      title: "School Uniform",
      description: "Uniform guidelines, dress code, and appearance standards",
      link: "/rules/uniform",
      icon: "👔"
    },
    {
      title: "Service Rules For Teachers",
      description: "Professional conduct and service guidelines for teaching staff",
      link: "/rules/teacher-service",
      icon: "👩‍🏫"
    },
    {
      title: "Vacation Rules",
      description: "Holiday schedule, vacation policies, and academic calendar",
      link: "/rules/vacation",
      icon: "🏖️"
    }
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="text-primary mb-3">Rules & Regulations</h1>
            <p className="lead text-muted">
              Comprehensive guidelines and policies that govern our school community, ensuring a safe, disciplined, and conducive learning environment for all.
            </p>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        {rulesCategories.map((rule, index) => (
          <Col md={6} lg={4} key={index}>
            <Card className="h-100 border-0 shadow-sm hover-card">
              <Card.Body className="p-4 text-center">
                <div className="text-primary mb-3" style={{ fontSize: '3rem' }}>
                  {rule.icon}
                </div>
                <h5 className="text-primary mb-3">{rule.title}</h5>
                <p className="text-muted mb-4">{rule.description}</p>
                <Link 
                  to={rule.link} 
                  className="btn btn-outline-primary"
                >
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* General Information */}
      <Row className="mt-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-5">
              <h3 className="text-primary text-center mb-4">Important Notice</h3>
              <Row>
                <Col md={6}>
                  <h5 className="text-primary mb-3">General Guidelines</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0 px-0">
                      • All rules are subject to periodic review and updates
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      • Parents and students are expected to familiarize themselves with all applicable rules
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      • Violation of rules may result in appropriate disciplinary action
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      • For clarifications, contact the school administration
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <h5 className="text-primary mb-3">Contact Information</h5>
                  <div className="text-muted">
                    <p><strong>Principal Office:</strong> 7895236185</p>
                    <p><strong>Administration:</strong> admin@genesisschool.com</p>
                    <p><strong>Student Affairs:</strong> students@genesisschool.com</p>
                    <p><strong>Office Hours:</strong> 8:00 AM - 4:00 PM (Mon-Fri)</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Rules;


