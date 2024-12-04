import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import './OurCares.css'; // Specific CSS for Our Cares section

const caresInfo = [
  {
    title: "Sustainability",
    description: "At Zenlooks, we believe in sustainable fashion. Our products are made from eco-friendly materials and processes...",
    icon: "leaf"
  },
  {
    title: "Ethical Practices",
    description: "We ensure fair wages and ethical treatment for all workers involved in the production process, ensuring safe working conditions...",
    icon: "handshake"
  },
  {
    title: "Customer Support",
    description: "Our team is always available to assist you with any issues, ensuring a smooth and delightful shopping experience...",
    icon: "headset"
  }
];

const OurCares = () => {
  return (
    <Container className="cares-container">
      <h2 className="cares-title">Our Cares</h2>
      <p className="cares-description">
        At Zenlooks, we care deeply about our customers, our planet, and ethical fashion practices. Here’s how we show it:
      </p>
      <Row>
        {caresInfo.map((care, index) => (
          <Col key={index} md={4}>
            <Card className="cares-card">
              <Card.Body>
                <div className="icon-container">
                  <ion-icon name={care.icon} size="large"></ion-icon>
                </div>
                <Card.Title>{care.title}</Card.Title>
                <Card.Text>{care.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default OurCares;
