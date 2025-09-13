import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

const SchoolUniform = () => {
  const uniformRules = [
    "Students must wear the complete school uniform during school hours",
    "Uniform should be clean, well-fitted, and properly maintained",
    "School shoes must be black leather shoes with proper socks",
    "Hair should be neat and well-groomed",
    "No jewelry except for small stud earrings for girls",
    "School bag must be the designated school bag",
    "Uniform should be worn with pride and respect"
  ];

  const uniformItems = [
    { item: "Shirt", color: "White", notes: "Short sleeves for summer, long sleeves for winter" },
    { item: "Trousers/Skirt", color: "Dark Navy Blue", notes: "Boys: Trousers, Girls: Skirt or Trousers" },
    { item: "Sweater", color: "Dark Navy Blue", notes: "School logo embroidered" },
    { item: "Shoes", color: "Black", notes: "Leather shoes, no sports shoes" },
    { item: "Socks", color: "White", notes: "Ankle length" },
    { item: "Belt", color: "Black", notes: "Plain black leather belt" }
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="text-primary mb-3">School Uniform</h1>
            <p className="lead text-muted">
              Uniform guidelines, dress code, and appearance standards for Srijan School
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Uniform Requirements</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <Table responsive className="mb-0">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Color</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {uniformItems.map((item, index) => (
                    <tr key={index}>
                      <td className="fw-bold">{item.item}</td>
                      <td>{item.color}</td>
                      <td className="text-muted">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Uniform Rules</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <ul className="list-unstyled">
                {uniformRules.map((rule, index) => (
                  <li key={index} className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    {rule}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h5 className="text-primary mb-3">Important Notes</h5>
              <div className="row">
                <div className="col-md-6">
                  <h6>Uniform Purchase</h6>
                  <p className="text-muted">
                    School uniforms are available at the school store. 
                    Parents are advised to purchase uniforms before the start of the academic year.
                  </p>
                </div>
                <div className="col-md-6">
                  <h6>Uniform Care</h6>
                  <p className="text-muted">
                    Proper care of uniforms is essential. 
                    Wash according to care instructions and iron regularly.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SchoolUniform;