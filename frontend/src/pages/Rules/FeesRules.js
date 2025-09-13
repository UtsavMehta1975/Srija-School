import React from 'react';
import { Container, Row, Col, Card, Table, ListGroup } from 'react-bootstrap';

const FeesRules = () => {
  const feeStructure = [
    { class: "Nursery - UKG", tuition: "₹2,500", transport: "₹1,500", total: "₹4,000" },
    { class: "Class I - V", tuition: "₹3,500", transport: "₹1,500", total: "₹5,000" },
    { class: "Class VI - VIII", tuition: "₹4,500", transport: "₹1,500", total: "₹6,000" },
    { class: "Class IX - X", tuition: "₹5,500", transport: "₹1,500", total: "₹7,000" },
    { class: "Class XI - XII", tuition: "₹6,500", transport: "₹1,500", total: "₹8,000" }
  ];

  const additionalFees = [
    { item: "Admission Fee", amount: "₹5,000", frequency: "One-time" },
    { item: "Development Fee", amount: "₹10,000", frequency: "One-time" },
    { item: "Security Deposit", amount: "₹5,000", frequency: "Refundable" },
    { item: "Library Fee", amount: "₹2,000", frequency: "Annual" },
    { item: "Laboratory Fee", amount: "₹3,000", frequency: "Annual" },
    { item: "Examination Fee", amount: "₹3,000", frequency: "Annual" },
    { item: "Sports Fee", amount: "₹2,000", frequency: "Annual" },
    { item: "Computer Fee", amount: "₹2,500", frequency: "Annual" }
  ];

  const paymentRules = [
    "Fees must be paid by the 10th of every month",
    "Late payment charges of ₹50 per day will be applied after due date",
    "Payment can be made through cash, cheque, or online transfer",
    "Cheques should be drawn in favor of 'Srijan School'",
    "Online payment details will be provided separately",
    "Receipt must be obtained for all payments",
    "Fee structure is subject to revision with prior notice",
    "No fees will be refunded after the academic year begins"
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="text-primary mb-3">Fees Rules</h1>
            <p className="lead text-muted">
              Fee structure, payment schedules, and financial policies for Srijan School
            </p>
          </div>
        </Col>
      </Row>

      {/* Monthly Fee Structure */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Monthly Fee Structure (2024-25)</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Class</th>
                    <th>Tuition Fee</th>
                    <th>Transport Fee</th>
                    <th>Total Monthly</th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructure.map((fee, index) => (
                    <tr key={index}>
                      <td className="fw-bold text-primary">{fee.class}</td>
                      <td>{fee.tuition}</td>
                      <td>{fee.transport}</td>
                      <td className="fw-bold">{fee.total}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Additional Fees */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Additional Fees</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Fee Item</th>
                    <th>Amount</th>
                    <th>Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {additionalFees.map((fee, index) => (
                    <tr key={index}>
                      <td>{fee.item}</td>
                      <td className="fw-bold text-primary">{fee.amount}</td>
                      <td>{fee.frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Payment Rules */}
      <Row className="mb-5">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Payment Rules</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {paymentRules.map((rule, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <i className="text-primary me-2">💰</i>
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
              <h4 className="mb-0">Payment Methods</h4>
            </Card.Header>
            <Card.Body>
              <ul className="text-muted">
                <li className="mb-2">Cash payment at school office</li>
                <li className="mb-2">Cheque payment (payable to Srijan School)</li>
                <li className="mb-2">Online bank transfer</li>
                <li className="mb-2">UPI payment (PhonePe, Google Pay, Paytm)</li>
                <li className="mb-2">Credit/Debit card payment</li>
                <li className="mb-2">Monthly auto-debit facility available</li>
                <li className="mb-2">Annual payment discount (5% off)</li>
                <li className="mb-2">Sibling discount (10% for second child)</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Fee Concession */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Fee Concession & Scholarships</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h5 className="text-primary mb-3">Merit-Based Scholarships</h5>
                  <ul className="text-muted">
                    <li>Academic Excellence: 25% fee waiver</li>
                    <li>Sports Achievement: 20% fee waiver</li>
                    <li>Cultural Activities: 15% fee waiver</li>
                    <li>Community Service: 10% fee waiver</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h5 className="text-primary mb-3">Need-Based Concessions</h5>
                  <ul className="text-muted">
                    <li>Economic hardship: Up to 50% concession</li>
                    <li>Single parent: 25% concession</li>
                    <li>Armed forces personnel: 20% concession</li>
                    <li>Government employees: 15% concession</li>
                  </ul>
                </Col>
              </Row>
              <div className="mt-3">
                <h6 className="text-primary">Application Process</h6>
                <p className="text-muted">
                  Submit application with supporting documents to the Principal's office. 
                  Applications are reviewed monthly and decisions are communicated within 15 days.
                </p>
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
              <h4 className="text-primary mb-3">Fee Inquiries</h4>
              <p className="text-muted mb-3">
                For fee-related queries, payment issues, or concession applications:
              </p>
              <div className="row text-center">
                <div className="col-md-3">
                  <h6 className="text-primary">Accounts Office</h6>
                  <p className="text-muted">7895236190</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-primary">Fee Collection</h6>
                  <p className="text-muted">7895236191</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-primary">Email</h6>
                  <p className="text-muted">fees@genesisschool.com</p>
                </div>
                <div className="col-md-3">
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

export default FeesRules;