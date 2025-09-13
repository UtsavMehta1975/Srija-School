import React from 'react';
import { Container, Row, Col, Card, ListGroup, Table } from 'react-bootstrap';

const BusRules = () => {
  const busRoutes = [
    { route: "Route 1", areas: "City Center, Downtown, Main Street", time: "7:30 AM - 3:30 PM" },
    { route: "Route 2", areas: "Suburb A, Residential Area B", time: "7:45 AM - 3:45 PM" },
    { route: "Route 3", areas: "Industrial Area, New Colony", time: "7:15 AM - 3:15 PM" },
    { route: "Route 4", areas: "Garden City, Park View", time: "7:40 AM - 3:40 PM" }
  ];

  const safetyRules = [
    "Students must arrive at the bus stop 5 minutes before scheduled time",
    "Wait for the bus in an orderly line without pushing or shoving",
    "Board the bus only when it comes to a complete stop",
    "Use the handrail while boarding and alighting from the bus",
    "Remain seated throughout the journey with seatbelts fastened",
    "Keep hands, arms, and head inside the bus at all times",
    "No eating or drinking inside the bus",
    "Maintain silence and follow the bus conductor's instructions",
    "No throwing objects inside or outside the bus",
    "Report any misbehavior to the bus conductor or school authorities"
  ];

  const emergencyProcedures = [
    "In case of emergency, follow the bus conductor's instructions",
    "Emergency exits are clearly marked and should be used only when necessary",
    "First aid kit is available on every bus",
    "Emergency contact numbers are displayed on each bus",
    "Students should inform the conductor about any health issues",
    "Parents will be immediately notified in case of any emergency",
    "School transport office maintains 24/7 emergency contact",
    "All buses are equipped with GPS tracking for safety"
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="text-primary mb-3">Bus Rules</h1>
            <p className="lead text-muted">
              Transportation guidelines and safety protocols for school bus services at Srijan School
            </p>
          </div>
        </Col>
      </Row>

      {/* Bus Routes */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Bus Routes & Timings</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Route</th>
                    <th>Areas Covered</th>
                    <th>Timings</th>
                  </tr>
                </thead>
                <tbody>
                  {busRoutes.map((route, index) => (
                    <tr key={index}>
                      <td className="fw-bold text-primary">{route.route}</td>
                      <td>{route.areas}</td>
                      <td>{route.time}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Safety Rules */}
      <Row className="mb-5">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Safety Rules</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {safetyRules.map((rule, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">🚌</i>
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
              <h4 className="mb-0">Emergency Procedures</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {emergencyProcedures.map((procedure, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">🚨</i>
                    {procedure}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bus Conduct */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Code of Conduct</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h5 className="text-primary mb-3">Student Responsibilities</h5>
                  <ul className="text-muted">
                    <li>Respect the bus conductor and driver</li>
                    <li>Help younger students when needed</li>
                    <li>Keep the bus clean and tidy</li>
                    <li>Report any damage or issues immediately</li>
                    <li>Follow the designated seating arrangement</li>
                    <li>Carry valid bus pass at all times</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h5 className="text-primary mb-3">Prohibited Activities</h5>
                  <ul className="text-muted">
                    <li>No fighting or rough play</li>
                    <li>No use of mobile phones during journey</li>
                    <li>No loud music or shouting</li>
                    <li>No vandalism or damage to bus property</li>
                    <li>No smoking or use of tobacco products</li>
                    <li>No bringing of prohibited items</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bus Fees and Policies */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Bus Fees & Policies</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <h6 className="text-primary">Monthly Fee</h6>
                  <p className="text-muted">₹1,500 per month</p>
                </Col>
                <Col md={4}>
                  <h6 className="text-primary">Annual Fee</h6>
                  <p className="text-muted">₹15,000 per year (2 months free)</p>
                </Col>
                <Col md={4}>
                  <h6 className="text-primary">Late Fee</h6>
                  <p className="text-muted">₹50 per day after due date</p>
                </Col>
              </Row>
              <div className="mt-3">
                <h6 className="text-primary">Payment Terms</h6>
                <ul className="text-muted">
                  <li>Fees must be paid by the 5th of every month</li>
                  <li>Late payment may result in suspension of bus service</li>
                  <li>Refund policy applies only for full month absence</li>
                  <li>Bus pass is mandatory for using the service</li>
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
              <h4 className="text-primary mb-3">Transport Inquiries</h4>
              <p className="text-muted mb-3">
                For bus-related queries, route changes, or complaints:
              </p>
              <div className="row text-center">
                <div className="col-md-3">
                  <h6 className="text-primary">Transport Office</h6>
                  <p className="text-muted">7895236188</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-primary">Bus Coordinator</h6>
                  <p className="text-muted">7895236189</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-primary">Email</h6>
                  <p className="text-muted">transport@genesisschool.com</p>
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

export default BusRules;