import React from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';

const Fees = () => {
  const feeStructure = [
    {
      grade: "Pre-K (Ages 3-4)",
      tuition: "$8,500",
      registration: "$500",
      books: "$300",
      activities: "$200",
      total: "$9,500",
      notes: "Half-day program available"
    },
    {
      grade: "Kindergarten (Ages 5-6)",
      tuition: "$9,500",
      registration: "$500",
      books: "$400",
      activities: "$250",
      total: "$10,650",
      notes: "Full-day program"
    },
    {
      grade: "Grades 1-2",
      tuition: "$10,500",
      registration: "$500",
      books: "$500",
      activities: "$300",
      total: "$11,800",
      notes: "Includes basic supplies"
    },
    {
      grade: "Grades 3-5",
      tuition: "$11,500",
      registration: "$500",
      books: "$600",
      activities: "$350",
      total: "$12,950",
      notes: "Includes technology fee"
    },
    {
      grade: "Grades 6-8",
      tuition: "$12,500",
      registration: "$500",
      books: "$700",
      activities: "$400",
      total: "$14,100",
      notes: "Includes lab fees"
    },
    {
      grade: "Grades 9-12",
      tuition: "$13,500",
      registration: "$500",
      books: "$800",
      activities: "$500",
      total: "$15,300",
      notes: "Includes college prep materials"
    }
  ];

  const additionalFees = [
    { item: "Transportation (Annual)", amount: "$1,200", description: "Bus service to designated areas" },
    { item: "Lunch Program (Annual)", amount: "$800", description: "Optional hot lunch program" },
    { item: "After School Care", amount: "$2,400", description: "Extended care until 6:00 PM" },
    { item: "Summer Camp", amount: "$1,500", description: "4-week summer enrichment program" },
    { item: "Sports Participation", amount: "$150", description: "Per sport, per season" },
    { item: "Music Lessons", amount: "$600", description: "Individual lessons, per semester" },
    { item: "Field Trips", amount: "$200", description: "Annual field trip fund" },
    { item: "Technology Fee", amount: "$300", description: "One-time fee for device usage" }
  ];

  const paymentOptions = [
    {
      method: "Full Payment",
      discount: "5%",
      description: "Pay entire year's tuition by August 1st",
      benefits: ["5% discount on tuition", "Priority enrollment", "No payment plan fees"]
    },
    {
      method: "Semester Payment",
      discount: "2%",
      description: "Pay in two installments",
      benefits: ["2% discount on tuition", "Two payments per year", "Reduced payment plan fees"]
    },
    {
      method: "Monthly Payment",
      discount: "0%",
      description: "Pay in 10 monthly installments",
      benefits: ["Flexible monthly payments", "Automatic payment options", "No late fees if paid on time"]
    }
  ];

  return (
    <Container className="py-5">
      <h1 className="text-center school-primary mb-5">Fee Structure</h1>
      
      {/* Introduction */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h3 className="school-primary mb-3">Tuition & Fees Information</h3>
              <p className="text-muted">
                Srijan School is committed to providing quality education at competitive rates. 
                Our fee structure is designed to be transparent and affordable for families. 
                All fees are annual unless otherwise specified.
              </p>
              <p className="text-muted">
                <strong>Note:</strong> All fees are subject to annual review and may be adjusted 
                based on operational costs and program enhancements.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Fee Structure */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="school-bg-primary text-white">
              <h4 className="mb-0">Annual Tuition & Fees by Grade</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Grade Level</th>
                    <th>Tuition</th>
                    <th>Registration</th>
                    <th>Books & Supplies</th>
                    <th>Activities</th>
                    <th>Total Annual</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructure.map((fee, index) => (
                    <tr key={index}>
                      <td><strong>{fee.grade}</strong></td>
                      <td>{fee.tuition}</td>
                      <td>{fee.registration}</td>
                      <td>{fee.books}</td>
                      <td>{fee.activities}</td>
                      <td><Badge bg="primary">{fee.total}</Badge></td>
                      <td><small className="text-muted">{fee.notes}</small></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Payment Options */}
      <Row className="mb-5">
        <Col>
          <h3 className="school-primary mb-4">Payment Options</h3>
          <Row className="g-4">
            {paymentOptions.map((option, index) => (
              <Col md={4} key={index}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Header className={`text-center ${index === 0 ? 'school-bg-primary text-white' : 'bg-light'}`}>
                    <h5 className="mb-0">{option.method}</h5>
                    {option.discount !== "0%" && (
                      <Badge bg="success" className="mt-2">
                        {option.discount} Discount
                      </Badge>
                    )}
                  </Card.Header>
                  <Card.Body>
                    <p className="text-muted mb-3">{option.description}</p>
                    <h6 className="school-secondary">Benefits:</h6>
                    <ul className="text-muted">
                      {option.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex}>{benefit}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Additional Fees */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="school-bg-primary text-white">
              <h4 className="mb-0">Additional Optional Fees</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Service/Program</th>
                    <th>Annual Cost</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {additionalFees.map((fee, index) => (
                    <tr key={index}>
                      <td><strong>{fee.item}</strong></td>
                      <td><Badge bg="secondary">{fee.amount}</Badge></td>
                      <td><small className="text-muted">{fee.description}</small></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Financial Aid */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h3 className="school-primary mb-3">Financial Aid & Scholarships</h3>
              <Row>
                <Col md={6}>
                  <h5 className="school-secondary">Need-Based Financial Aid</h5>
                  <ul className="text-muted">
                    <li>Available for families demonstrating financial need</li>
                    <li>Application deadline: March 1st</li>
                    <li>Requires completion of financial aid application</li>
                    <li>Awards range from 10% to 50% of tuition</li>
                    <li>Renewable annually with continued need</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h5 className="school-secondary">Merit Scholarships</h5>
                  <ul className="text-muted">
                    <li>Academic Excellence Scholarship</li>
                    <li>Leadership Scholarship</li>
                    <li>Arts & Music Scholarship</li>
                    <li>Sports Scholarship</li>
                    <li>Community Service Scholarship</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Important Dates */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h3 className="school-primary mb-3">Important Dates & Deadlines</h3>
              <Row>
                <Col md={6}>
                  <h5 className="school-secondary">2024-2025 Academic Year</h5>
                  <ul className="text-muted">
                    <li><strong>March 1:</strong> Financial aid application deadline</li>
                    <li><strong>April 15:</strong> Enrollment contracts due</li>
                    <li><strong>May 1:</strong> First payment due (if on payment plan)</li>
                    <li><strong>August 1:</strong> Full payment discount deadline</li>
                    <li><strong>August 15:</strong> Final enrollment deadline</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h5 className="school-secondary">Payment Schedule</h5>
                  <ul className="text-muted">
                    <li><strong>Full Payment:</strong> Due August 1st</li>
                    <li><strong>Semester 1:</strong> Due August 1st</li>
                    <li><strong>Semester 2:</strong> Due January 1st</li>
                    <li><strong>Monthly:</strong> 1st of each month, Aug-May</li>
                    <li><strong>Late Fee:</strong> $25 after 10-day grace period</li>
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
              <h5 className="school-primary mb-3">Questions About Fees?</h5>
              <p className="text-muted mb-3">
                Our admissions team is here to help you understand our fee structure 
                and explore financial aid options.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <a href="/contact" className="btn btn-primary btn-school-primary">
                  Contact Admissions
                </a>
                <a href="tel:+15551234568" className="btn btn-outline-primary">
                  Call: (555) 123-4568
                </a>
                <a href="mailto:admissions@genesisschool.com" className="btn btn-outline-primary">
                  Email Admissions
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Fees;

