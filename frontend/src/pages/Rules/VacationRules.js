import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

const VacationRules = () => {
  const academicCalendar = [
    { month: "April", events: "New Academic Year Begins, Orientation Program", holidays: "Good Friday" },
    { month: "May", events: "Summer Vacation (Mid-May to Mid-June)", holidays: "Labour Day" },
    { month: "June", events: "School Reopens, First Term Examinations", holidays: "No major holidays" },
    { month: "July", events: "Parent-Teacher Meetings, Sports Day", holidays: "No major holidays" },
    { month: "August", events: "Independence Day Celebrations, Mid-term Break", holidays: "Independence Day" },
    { month: "September", events: "Half-yearly Examinations", holidays: "No major holidays" },
    { month: "October", events: "Gandhi Jayanti, Diwali Holidays", holidays: "Gandhi Jayanti, Diwali" },
    { month: "November", events: "Annual Sports Meet, Cultural Events", holidays: "No major holidays" },
    { month: "December", events: "Winter Break, Christmas Celebrations", holidays: "Christmas" },
    { month: "January", events: "School Reopens, Pre-board Examinations", holidays: "New Year, Republic Day" },
    { month: "February", events: "Board Examinations (Class X & XII)", holidays: "No major holidays" },
    { month: "March", events: "Annual Examinations, Results, Academic Year Ends", holidays: "Holi" }
  ];

  const vacationPolicies = [
    "All vacations are planned in advance and communicated to parents",
    "No classes are held during official vacation periods",
    "School office remains open during vacations for administrative work",
    "Teachers may be called for training during vacation periods",
    "Students are expected to complete vacation homework",
    "Emergency contact information must be updated before vacations",
    "School transport services are suspended during vacations",
    "Library and computer lab access may be limited during vacations"
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="text-primary mb-3">Vacation Rules</h1>
            <p className="lead text-muted">
              Holiday schedule, vacation policies, and academic calendar for Srijan School
            </p>
          </div>
        </Col>
      </Row>

      {/* Academic Calendar */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Academic Calendar 2024-25</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Month</th>
                    <th>Events</th>
                    <th>Holidays</th>
                  </tr>
                </thead>
                <tbody>
                  {academicCalendar.map((month, index) => (
                    <tr key={index}>
                      <td className="fw-bold text-primary">{month.month}</td>
                      <td>{month.events}</td>
                      <td>{month.holidays}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Vacation Policies */}
      <Row className="mb-5">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Vacation Policies</h4>
            </Card.Header>
            <Card.Body>
              <ul className="text-muted">
                {vacationPolicies.map((policy, index) => (
                  <li key={index} className="mb-2">{policy}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Important Guidelines</h4>
            </Card.Header>
            <Card.Body>
              <ul className="text-muted">
                <li className="mb-2">Vacation dates are subject to change due to unforeseen circumstances</li>
                <li className="mb-2">Parents will be notified of any changes via SMS and website</li>
                <li className="mb-2">Students must return to school on the specified reopening date</li>
                <li className="mb-2">Late return from vacation may result in disciplinary action</li>
                <li className="mb-2">Vacation homework must be completed and submitted on time</li>
                <li className="mb-2">School uniform and books should be ready before reopening</li>
                <li className="mb-2">Medical certificates required for extended absence</li>
                <li className="mb-2">Transport services resume from the first day of school</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Major Vacations */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Major Vacation Periods</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <div className="text-center p-3">
                    <h5 className="text-primary">Summer Vacation</h5>
                    <p className="text-muted">Mid-May to Mid-June</p>
                    <small className="text-muted">Approximately 4 weeks</small>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center p-3">
                    <h5 className="text-primary">Diwali Vacation</h5>
                    <p className="text-muted">October (5-7 days)</p>
                    <small className="text-muted">Festival break</small>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center p-3">
                    <h5 className="text-primary">Winter Vacation</h5>
                    <p className="text-muted">Last week of December</p>
                    <small className="text-muted">Christmas and New Year</small>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Emergency Procedures */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 text-center">
              <h4 className="text-primary mb-3">Emergency During Vacations</h4>
              <p className="text-muted mb-3">
                In case of emergency or urgent school matters during vacation:
              </p>
              <div className="row text-center">
                <div className="col-md-3">
                  <h6 className="text-primary">Principal</h6>
                  <p className="text-muted">7895236185</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-primary">Office</h6>
                  <p className="text-muted">7895236186</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-primary">Email</h6>
                  <p className="text-muted">info@genesisschool.com</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-primary">Website</h6>
                  <p className="text-muted">www.genesisschool.com</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VacationRules;