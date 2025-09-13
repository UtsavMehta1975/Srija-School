import React from 'react';
import { Container, Row, Col, Card, ListGroup, Table } from 'react-bootstrap';

const DisciplineRules = () => {
  const generalRules = [
    "Students must maintain proper decorum and discipline at all times",
    "Respect for teachers, staff, and fellow students is mandatory",
    "Punctuality is essential - late arrival will not be tolerated",
    "Proper school uniform must be worn at all times",
    "Mobile phones and electronic devices are strictly prohibited",
    "No eating or drinking in classrooms during teaching hours",
    "Maintain cleanliness and hygiene in all school areas",
    "Follow instructions from teachers and staff immediately"
  ];

  const classroomDiscipline = [
    "Arrive in class before the teacher and stand up when teacher enters",
    "Maintain silence during teaching and when teacher is speaking",
    "Raise hand before asking questions or seeking permission",
    "Complete all assignments and homework on time",
    "No talking, whispering, or creating disturbance during class",
    "Keep classroom clean and organized",
    "Respect school property and equipment",
    "No unauthorized movement during class hours"
  ];

  const playgroundRules = [
    "Follow safety rules during sports and physical activities",
    "No rough play or fighting on school premises",
    "Use playground equipment responsibly and safely",
    "Respect other students' right to play and participate",
    "No bullying, teasing, or harassment of any kind",
    "Follow instructions of sports teachers and supervisors",
    "Report any injuries or accidents immediately",
    "Maintain discipline during assembly and outdoor activities"
  ];

  const disciplinaryActions = [
    { offense: "Minor Infractions", action: "Verbal warning and counseling", examples: "Late arrival, incomplete homework, minor uniform violations" },
    { offense: "Repeated Offenses", action: "Written warning to parents", examples: "Repeated late arrivals, continued uniform violations" },
    { offense: "Serious Misconduct", action: "Suspension for 1-3 days", examples: "Disrespect to teachers, fighting, vandalism" },
    { offense: "Major Violations", action: "Suspension for 1 week or more", examples: "Bullying, theft, damage to property, serious misconduct" },
    { offense: "Severe Offenses", action: "Expulsion from school", examples: "Violence, drug use, repeated serious violations" }
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="text-primary mb-3">Rules for Discipline of Students</h1>
            <p className="lead text-muted">
              Code of conduct and disciplinary measures for maintaining a safe and conducive learning environment at Srijan School
            </p>
          </div>
        </Col>
      </Row>

      {/* General Rules */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">General Discipline Rules</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {generalRules.map((rule, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">📋</i>
                    {rule}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Classroom and Playground Rules */}
      <Row className="mb-5">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Classroom Discipline</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {classroomDiscipline.map((rule, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">🏫</i>
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
              <h4 className="mb-0">Playground Rules</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {playgroundRules.map((rule, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">🏃</i>
                    {rule}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Disciplinary Actions */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Disciplinary Actions & Consequences</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Type of Offense</th>
                    <th>Disciplinary Action</th>
                    <th>Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {disciplinaryActions.map((action, index) => (
                    <tr key={index}>
                      <td className="fw-bold text-primary">{action.offense}</td>
                      <td>{action.action}</td>
                      <td className="text-muted">{action.examples}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Positive Reinforcement */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Positive Reinforcement & Rewards</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h5 className="text-primary mb-3">Academic Excellence</h5>
                  <ul className="text-muted">
                    <li>Merit certificates for outstanding performance</li>
                    <li>Student of the month recognition</li>
                    <li>Academic achievement awards</li>
                    <li>Special privileges for top performers</li>
                    <li>Public recognition in assembly</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h5 className="text-primary mb-3">Good Behavior</h5>
                  <ul className="text-muted">
                    <li>Good conduct certificates</li>
                    <li>Leadership opportunities</li>
                    <li>Participation in special events</li>
                    <li>Recognition in school newsletter</li>
                    <li>Extra-curricular activity privileges</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Parental Involvement */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Parental Involvement in Discipline</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h5 className="text-primary mb-3">Parent Responsibilities</h5>
                  <ul className="text-muted">
                    <li>Support school discipline policies at home</li>
                    <li>Attend parent-teacher meetings regularly</li>
                    <li>Communicate with teachers about behavioral issues</li>
                    <li>Reinforce positive behavior at home</li>
                    <li>Work with school to address concerns</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h5 className="text-primary mb-3">School-Parent Communication</h5>
                  <ul className="text-muted">
                    <li>Regular progress reports on behavior</li>
                    <li>Immediate notification of serious incidents</li>
                    <li>Parent counseling sessions when needed</li>
                    <li>Joint meetings to address concerns</li>
                    <li>Collaborative action plans for improvement</li>
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
              <h4 className="text-primary mb-3">Discipline Support</h4>
              <p className="text-muted mb-3">
                For questions about discipline policies or to report concerns:
              </p>
              <div className="row text-center">
                <div className="col-md-3">
                  <h6 className="text-primary">Principal Office</h6>
                  <p className="text-muted">7895236185</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-primary">Vice Principal</h6>
                  <p className="text-muted">7895236186</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-primary">Counselor</h6>
                  <p className="text-muted">7895236193</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-primary">Email</h6>
                  <p className="text-muted">discipline@genesisschool.com</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DisciplineRules;