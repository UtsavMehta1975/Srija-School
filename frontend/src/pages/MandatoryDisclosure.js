import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

const MandatoryDisclosure = () => {
  const disclosureData = [
    {
      category: "School Information",
      items: [
        { field: "School Name", value: "Srijan School" },
        { field: "UDICE Code", value: "05110413202" },
        { field: "Address", value: "Haldwani, Uttarakhand" },
        { field: "Phone", value: "7895236185" },
        { field: "Email", value: "srijanschool@gmail.com" },
        { field: "Website", value: "www.srijanschool.com" },
        { field: "Year of Establishment", value: "2018" },
        { field: "Type of School", value: "Co-educational" },
        { field: "Affiliation", value: "Anglo-Indian Board, Government of Uttarakhand" },
        { field: "Principal Name", value: "Kailash Koranga" },
        { field: "Founder & Director", value: "Dr. G.S. Mehra" },
        { field: "Managing Society", value: "Shree Shiv Singh Memorial Education Society" }
      ]
    },
    {
      category: "Academic Information",
      items: [
        { field: "Classes Offered", value: "Nursery to Class VIII" },
        { field: "Total Students", value: "500+" },
        { field: "Total Teachers", value: "25+" },
        { field: "Student-Teacher Ratio", value: "20:1" },
        { field: "Library Books", value: "5,000+" },
        { field: "Computer Lab", value: "Modern computer laboratory" },
        { field: "Science Labs", value: "Well-equipped science laboratory" },
        { field: "Smart Classes", value: "Technology-enabled learning" }
      ]
    },
    {
      category: "Infrastructure",
      items: [
        
        { field: "Total Classrooms", value: "40" },
        { field: "Playground Area", value: "5000 sq. ft." },
        { field: "Library Area", value: "2000 sq. ft." },
        { field: "Laboratory Area", value: "1500 sq. ft." },
        { field: "Computer Lab Area", value: "800 sq. ft." },
        { field: "Auditorium", value: "500 seating capacity" },
        { field: "Cafeteria", value: "200 seating capacity" },
        { field: "Transport Facility", value: "15 buses" }
      ]
    },
    {
      category: "Financial Information",
      items: [
        { field: "Annual Fee Structure", value: "Available on request" },
        { field: "Fee Payment Mode", value: "Online/Offline" },
        { field: "Scholarship Available", value: "Merit-based scholarships" },
        { field: "Financial Aid", value: "Need-based assistance" },
        { field: "Fee Refund Policy", value: "As per CBSE guidelines" }
      ]
    },
    {
      category: "Staff Information",
      items: [
        { field: "Total Teaching Staff", value: "25+" },
        { field: "Non-Teaching Staff", value: "10+" },
        { field: "Support Staff", value: "8+" },
        { field: "Qualified Teachers", value: "100%" },
        { field: "Teachers with B.Ed", value: "85%" },
        { field: "Teachers with M.Ed", value: "40%" },
        { field: "Average Experience", value: "5 years" }
      ]
    },
    {
      category: "Safety & Security",
      items: [
        { field: "CCTV Coverage", value: "100% campus coverage" },
        { field: "Security Guards", value: "6 guards (24/7)" },
        { field: "Fire Safety", value: "Fire extinguishers in all areas" },
        { field: "First Aid", value: "Medical room with nurse" },
        { field: "Emergency Procedures", value: "Regular drills conducted" },
        { field: "Parent Access", value: "ID card required" }
      ]
    }
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="text-primary mb-3">Mandatory Public Disclosure</h1>
            <p className="lead text-muted">
              As per the Right to Information Act, 2005, we provide complete transparency about our school's information, policies, and procedures.
            </p>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        {disclosureData.map((category, categoryIndex) => (
          <Col lg={6} key={categoryIndex}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">{category.category}</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive className="mb-0">
                  <tbody>
                    {category.items.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td className="fw-bold text-primary border-end" style={{ width: '40%' }}>
                          {item.field}
                        </td>
                        <td className="text-muted">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Additional Information */}
      <Row className="mt-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-5">
              <h3 className="text-primary text-center mb-4">Additional Information</h3>
              <Row>
                <Col md={6}>
                  <h5 className="text-primary mb-3">School Policies</h5>
                  <ul className="text-muted">
                    <li>Admission Policy - Merit-based with transparent process</li>
                    <li>Attendance Policy - Minimum 75% attendance required</li>
                    <li>Discipline Policy - Zero tolerance for bullying</li>
                    <li>Examination Policy - Continuous assessment system</li>
                    <li>Transport Policy - Safe and punctual service</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h5 className="text-primary mb-3">Contact for Information</h5>
                  <div className="text-muted">
                    <p><strong>Principal:</strong> Kailash Koranga</p>
                    <p><strong>Founder & Director:</strong> Dr. G.S. Mehra</p>
                    <p><strong>Managing Society:</strong> Shree Shiv Singh Memorial Education Society</p>
                    <p><strong>Phone:</strong> 7895236185</p>
                    <p><strong>Email:</strong> srijanschool@gmail.com</p>
                    <p><strong>Office Hours:</strong> 8:30 AM - 11:00 AM (Mon-Fri)</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Last Updated */}
      <Row className="mt-4">
        <Col>
          <div className="text-center">
            <small className="text-muted">
              Last Updated: {new Date().toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </small>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MandatoryDisclosure;


