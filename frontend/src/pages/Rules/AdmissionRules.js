import React from 'react';
import { Container, Row, Col, Card, ListGroup, Table, Badge } from 'react-bootstrap';

const AdmissionRules = () => {
  const admissionCriteria = [
    { class: "Nursery", age: "3-4 years", documents: "Birth Certificate, Medical Certificate" },
    { class: "LKG", age: "4-5 years", documents: "Birth Certificate, Medical Certificate" },
    { class: "UKG", age: "5-6 years", documents: "Birth Certificate, Medical Certificate" },
    { class: "Class I", age: "6-7 years", documents: "Birth Certificate, Transfer Certificate" },
    { class: "Class II-V", age: "As per class", documents: "Transfer Certificate, Report Card" },
    { class: "Class VI-X", age: "As per class", documents: "Transfer Certificate, Report Card, Character Certificate" },
    { class: "Class XI-XII", age: "As per class", documents: "Transfer Certificate, Class X Certificate" }
  ];

  const requiredDocuments = [
    "Birth Certificate (Original + 2 Photocopies)",
    "Transfer Certificate (for Class I onwards)",
    "Medical Certificate from registered doctor",
    "Character Certificate from previous school",
    "Passport size photographs (4 copies)",
    "Aadhaar Card (Student & Parents)",
    "Address Proof (Electricity Bill/Rent Agreement)",
    "Income Certificate (if applying for fee concession)",
    "Caste Certificate (if applicable)",
    "Migration Certificate (for Class XI-XII)"
  ];

  const admissionProcess = [
    {
      step: 1,
      title: "Application Submission",
      description: "Submit completed application form with all required documents",
      duration: "Within specified dates"
    },
    {
      step: 2,
      title: "Document Verification",
      description: "School administration verifies all submitted documents",
      duration: "2-3 working days"
    },
    {
      step: 3,
      title: "Interaction/Assessment",
      description: "Student and parent interaction with school authorities",
      duration: "As scheduled"
    },
    {
      step: 4,
      title: "Admission Decision",
      description: "School notifies admission status to parents",
      duration: "Within 1 week"
    },
    {
      step: 5,
      title: "Fee Payment",
      description: "Pay admission and first term fees",
      duration: "Within 3 days of confirmation"
    },
    {
      step: 6,
      title: "Orientation",
      description: "Attend orientation program for new students and parents",
      duration: "Before school starts"
    }
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="text-primary mb-3">Admission Rules</h1>
            <p className="lead text-muted">
              Comprehensive guidelines and procedures for student admission to Srijan School
            </p>
          </div>
        </Col>
      </Row>

      {/* Admission Criteria */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Admission Criteria by Class</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Class</th>
                    <th>Age Requirement</th>
                    <th>Required Documents</th>
                  </tr>
                </thead>
                <tbody>
                  {admissionCriteria.map((criteria, index) => (
                    <tr key={index}>
                      <td><Badge bg="primary">{criteria.class}</Badge></td>
                      <td>{criteria.age}</td>
                      <td>{criteria.documents}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Admission Process */}
      <Row className="mb-5">
        <Col>
          <h3 className="text-primary mb-4">Admission Process</h3>
          <Row className="g-4">
            {admissionProcess.map((process, index) => (
              <Col md={6} key={index}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-start">
                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                           style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                        <span className="fw-bold">{process.step}</span>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="text-primary mb-2">{process.title}</h5>
                        <p className="text-muted mb-2">{process.description}</p>
                        <small className="text-muted">
                          <strong>Duration:</strong> {process.duration}
                        </small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Required Documents */}
      <Row className="mb-5">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Required Documents</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {requiredDocuments.map((doc, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">📄</i>
                    {doc}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Important Guidelines</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="border-0 px-0 py-2">
                  <i className="text-primary me-2">✅</i>
                  Admission is subject to availability of seats
                </ListGroup.Item>
                <ListGroup.Item className="border-0 px-0 py-2">
                  <i className="text-primary me-2">✅</i>
                  Priority given to siblings of existing students
                </ListGroup.Item>
                <ListGroup.Item className="border-0 px-0 py-2">
                  <i className="text-primary me-2">✅</i>
                  All documents must be original and attested
                </ListGroup.Item>
                <ListGroup.Item className="border-0 px-0 py-2">
                  <i className="text-primary me-2">✅</i>
                  Admission fee is non-refundable
                </ListGroup.Item>
                <ListGroup.Item className="border-0 px-0 py-2">
                  <i className="text-primary me-2">✅</i>
                  School reserves the right to refuse admission
                </ListGroup.Item>
                <ListGroup.Item className="border-0 px-0 py-2">
                  <i className="text-primary me-2">✅</i>
                  Parents must attend orientation program
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Fee Structure */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Fee Structure (2024-25)</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h5 className="text-primary mb-3">One-time Charges</h5>
                  <ul className="text-muted">
                    <li>Admission Fee: ₹5,000</li>
                    <li>Development Fee: ₹10,000</li>
                    <li>Security Deposit: ₹5,000 (Refundable)</li>
                    <li>Uniform & Books: ₹8,000</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h5 className="text-primary mb-3">Annual Charges</h5>
                  <ul className="text-muted">
                    <li>Tuition Fee: ₹60,000 - ₹80,000</li>
                    <li>Transport Fee: ₹15,000 - ₹25,000</li>
                    <li>Examination Fee: ₹3,000</li>
                    <li>Library Fee: ₹2,000</li>
                  </ul>
                </Col>
              </Row>
              <div className="alert alert-info mt-3">
                <strong>Note:</strong> Fee structure may vary based on class and facilities availed. 
                Contact school office for detailed fee breakdown.
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
              <h4 className="text-primary mb-3">Need Help with Admission?</h4>
              <p className="text-muted mb-3">
                Our admission team is here to assist you with the admission process.
              </p>
              <div className="row text-center">
                <div className="col-md-4">
                  <h6 className="text-primary">Phone</h6>
                  <p className="text-muted">7895236185</p>
                </div>
                <div className="col-md-4">
                  <h6 className="text-primary">Email</h6>
                  <p className="text-muted">admissions@genesisschool.com</p>
                </div>
                <div className="col-md-4">
                  <h6 className="text-primary">Office Hours</h6>
                  <p className="text-muted">9:00 AM - 3:00 PM</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdmissionRules;


