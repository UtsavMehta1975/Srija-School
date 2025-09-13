import React from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';

const SchoolTimings = () => {
  // Removed dailySchedule as it's not being used

  const classTimings = [
    { class: "N/S, PKG & KG", summer: "7:30 AM - 11:30 AM", winter: "8:25 AM - 12:10 PM", days: "Monday - Friday" },
    { class: "Class I to VIII", summer: "7:30 AM - 1:00 PM", winter: "8:25 AM - 1:50 PM", days: "Monday - Friday" }
  ];

  const examinationSchedule = [
    { period: "I U.T.", timing: "II week of May" },
    { period: "Half yearly exam", timing: "III week of Sept." },
    { period: "II U.T.", timing: "I week of Dec." },
    { period: "Annual Exam", timing: "IV week of Feb." }
  ];

  const ptmSchedule = [
    { period: "I P.T.M.", timing: "II week of May" },
    { period: "II P.T.M.", timing: "II week of July" },
    { period: "III P.T.M.", timing: "II week of September" },
    { period: "IV P.T.M. (Result declaration)", timing: "II week of October" },
    { period: "V P.T.M.", timing: "II week of December" },
    { period: "VI P.T.M.", timing: "II week of February" },
    { period: "VII P.T.M. (Result declaration)", timing: "III week of March" }
  ];

  const interactionTimings = [
    { type: "Principal's Visiting Hours", timing: "Monday to Friday: 9:00 AM to 11:00 AM" },
    { type: "Office Hours (Summer)", timing: "7:30 AM to 12:30 PM" },
    { type: "Office Hours (Winter)", timing: "8:20 AM to 1:30 PM" },
    { type: "Fee Timing (Summer)", timing: "7:30 AM to 12:30 PM" },
    { type: "Fee Timing (Winter)", timing: "8:20 AM to 1:30 PM" },
    { type: "P.T.M. Timing", timing: "8:30 AM to 11:00 AM" }
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="text-primary mb-3">School Timings</h1>
            <p className="lead text-muted">
              Daily schedule, class timings, and academic calendar information for Srijan School
            </p>
          </div>
        </Col>
      </Row>

      {/* Class-wise Timings */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Class-wise School Timings</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Class</th>
                    <th>Summer Timing</th>
                    <th>Winter Timing</th>
                    <th>Days</th>
                  </tr>
                </thead>
                <tbody>
                  {classTimings.map((timing, index) => (
                    <tr key={index}>
                      <td><Badge bg="primary">{timing.class}</Badge></td>
                      <td className="fw-bold text-primary">{timing.summer}</td>
                      <td className="fw-bold text-primary">{timing.winter}</td>
                      <td>{timing.days}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Examination Schedule */}
      <Row className="mb-5">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Examination Schedule</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Examination</th>
                    <th>Timing</th>
                  </tr>
                </thead>
                <tbody>
                  {examinationSchedule.map((exam, index) => (
                    <tr key={index}>
                      <td className="fw-bold">{exam.period}</td>
                      <td className="text-primary">{exam.timing}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Parent Teacher Meeting (P.T.M.)</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>P.T.M.</th>
                    <th>Timing</th>
                  </tr>
                </thead>
                <tbody>
                  {ptmSchedule.map((ptm, index) => (
                    <tr key={index}>
                      <td className="fw-bold">{ptm.period}</td>
                      <td className="text-primary">{ptm.timing}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Interaction Time */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Interaction Time</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Type</th>
                    <th>Timing</th>
                  </tr>
                </thead>
                <tbody>
                  {interactionTimings.map((timing, index) => (
                    <tr key={index}>
                      <td className="fw-bold">{timing.type}</td>
                      <td className="text-primary">{timing.timing}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Important Guidelines */}
      <Row className="mb-5">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Attendance Guidelines</h4>
            </Card.Header>
            <Card.Body>
              <ul className="text-muted">
                <li>Students must arrive 10 minutes before school starts</li>
                <li>Late arrival requires permission from Principal</li>
                <li>Minimum 75% attendance required for promotion</li>
                <li>Medical leave requires doctor's certificate</li>
                <li>Leave applications must be submitted in advance</li>
                <li>Absence without prior notice is not acceptable</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Holiday Guidelines</h4>
            </Card.Header>
            <Card.Body>
              <ul className="text-muted">
                <li>School follows CBSE holiday calendar</li>
                <li>National and religious holidays are observed</li>
                <li>Summer vacation: Mid-May to Mid-June</li>
                <li>Winter vacation: Last week of December</li>
                <li>Emergency holidays will be notified in advance</li>
                <li>Make-up classes may be scheduled if needed</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Emergency Procedures */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 text-center">
              <h4 className="text-primary mb-3">Emergency Procedures</h4>
              <p className="text-muted mb-3">
                In case of emergency or unexpected school closure, parents will be notified through:
              </p>
              <div className="row text-center">
                <div className="col-md-3">
                  <h6 className="text-primary">SMS</h6>
                  <p className="text-muted">School Management System</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-primary">Phone Call</h6>
                  <p className="text-muted">Direct communication</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-primary">Website</h6>
                  <p className="text-muted">Official school website</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-primary">Notice Board</h6>
                  <p className="text-muted">School notice board</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SchoolTimings;


