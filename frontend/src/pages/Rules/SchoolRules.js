import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const SchoolRules = () => {
  const attendanceRules = [
    "Punctual and regular attendance is insisted upon",
    "If a student is absent due to illness or any other valid reason, the Principal should be informed immediately by a note from the parent/guardian",
    "No half day leave is allowed",
    "Minimum 75% attendance is compulsory for promotion",
    "Students are expected to be punctual, regular, attentive and sincere to their studies",
    "If a student is not in a position to attend school, he/she should send an application for leave stating reason and duly signed by parents"
  ];

  const uniformRules = [
    "Students should be habitually clean and always neatly dressed",
    "The school uniform should be worn on all working days and for all school functions",
    "Students who are untidily dressed or not in proper uniform will face disciplinary action",
    "Caps, slippers, sandals, mufflers, stylish hair-cut, low waist trousers & jewellery of any kind will not be allowed",
    "Students are not allowed to wear jewellery in school",
    "There should be a name tag on blazers and sweaters",
    "Students are expected to come to school in proper uniform"
  ];

  const behaviorRules = [
    "Students are expected to be humble, obedient and follow rules & regulations of the school",
    "Students are expected to exhibit exemplary behaviour in school campus as well as outside",
    "Students are supposed to speak in English in school campus",
    "Under no condition student is permitted to bring a Mobile Phone to the school",
    "No student will be allowed to go home during school hours without written permission of Principal/Vice Principal",
    "Chewing pan masala, quarrelling, fighting, disobedience of any kind will be considered as gross misconduct",
    "Bringing mobile phones, scooter, mobike, four wheelers to school by students is strictly prohibited",
    "Students are not allowed to bring any sharp instruments such as knife etc. to the school"
  ];

  const academicRules = [
    "No books (other than text books or library books), magazines or newspapers should be brought to school",
    "Students are supposed to have with them their I-card and school almanac",
    "Students will not use any unfair means in examination",
    "Students are expected to be a part of all curricular and co-curricular activities",
    "All should be careful not to litter paper or rubbish anywhere in the school premises",
    "Students, parents or any other person have no right to speak in favour or against any employee of the school",
    "Students will not disobey the orders, directions and instructions given to them by school authorities"
  ];

  const safetyRules = [
    "Students are expected to respect the property of others, including school property",
    "No student should damage any school furniture, write or draw anything on walls",
    "Damage done even by accident should be reported and action deemed fit will be taken",
    "The school will not be responsible for any loss of personal items/goods",
    "Students are advised not to bring any valuables such as expensive watches, pens, jewellery",
    "Students should not bring crackers, colours, transistors, cameras, video cameras, calculators, mobile phones",
    "Bursting of crackers and playing with colours is liable to lead to expulsion of a student",
    "Students will not instigate seniors, co-students or juniors to any misbehaviour"
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="text-primary mb-3">School Rules</h1>
            <p className="lead text-muted">
              General rules and regulations governing school life and activities at Srijan School
            </p>
          </div>
        </Col>
      </Row>

      {/* Attendance Rules */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Attendance Rules</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {attendanceRules.map((rule, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">⏰</i>
                    {rule}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Uniform and Behavior Rules */}
      <Row className="mb-5">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Uniform Rules</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {uniformRules.map((rule, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">👔</i>
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
              <h4 className="mb-0">Behavior Rules</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {behaviorRules.map((rule, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">🤝</i>
                    {rule}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Academic and Safety Rules */}
      <Row className="mb-5">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Academic Rules</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {academicRules.map((rule, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">📚</i>
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
              <h4 className="mb-0">Safety Rules</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {safetyRules.map((rule, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">🛡️</i>
                    {rule}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* School Values */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">School Values & Principles</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <h5 className="text-primary mb-3">Respect</h5>
                  <p className="text-muted">
                    We value respect for self, others, and the environment. 
                    Students are expected to treat everyone with dignity and kindness.
                  </p>
                </Col>
                <Col md={4}>
                  <h5 className="text-primary mb-3">Integrity</h5>
                  <p className="text-muted">
                    We promote honesty, truthfulness, and moral uprightness. 
                    Students are encouraged to do what is right even when no one is watching.
                  </p>
                </Col>
                <Col md={4}>
                  <h5 className="text-primary mb-3">Excellence</h5>
                  <p className="text-muted">
                    We strive for excellence in all endeavors. 
                    Students are encouraged to give their best effort in academics and activities.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Consequences and Rewards */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Consequences & Rewards</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h5 className="text-primary mb-3">Consequences for Rule Violations</h5>
                  <ul className="text-muted">
                    <li>For every punishment there will be a negative marking</li>
                    <li>The negative points of a student along with the negative marking will be reflected in the report card</li>
                    <li>Students found indulging in misconduct will be liable for disciplinary action</li>
                    <li>Bursting crackers and playing with colours is liable to lead to expulsion</li>
                    <li>If mobile phone is confiscated, it will not be returned</li>
                    <li>School administration reserves every right to penalise students for gross misconduct</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h5 className="text-primary mb-3">Rewards for Good Behavior</h5>
                  <ul className="text-muted">
                    <li>Recognition in school assembly</li>
                    <li>Good conduct certificates</li>
                    <li>Student of the month awards</li>
                    <li>Leadership opportunities</li>
                    <li>Special privileges and responsibilities</li>
                    <li>Participation in special events</li>
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
              <h4 className="text-primary mb-3">Rule Inquiries</h4>
              <p className="text-muted mb-3">
                For questions about school rules or to report violations:
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
                  <h6 className="text-primary">Email</h6>
                  <p className="text-muted">rules@srijanschool.com</p>
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

export default SchoolRules;