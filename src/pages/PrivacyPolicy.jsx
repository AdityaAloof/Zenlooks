import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import './PrivacyPolicy.css'; // Specific CSS for Privacy Policy section

const PrivacyPolicy = () => {
  return (
    <Container className="privacy-container">
      <h2 className="privacy-title">Privacy Policy</h2>
      <Row>
        <Col md={12}>
          <Card className="privacy-card">
            <Card.Body>
              <p className="privacy-content">
                At Zenlooks, we prioritize the privacy and security of our customers. This policy outlines how we collect, use, and protect your personal information.
              </p>
              <p className="privacy-content">
                <strong>1. Information Collection:</strong> We collect information such as name, email, and payment details to process your orders.
              </p>
              <p className="privacy-content">
                <strong>2. Use of Information:</strong> Your information is used for order processing, customer support, and marketing purposes with your consent.
              </p>
              <p className="privacy-content">
                <strong>3. Data Security:</strong> We implement robust security measures to protect your data from unauthorized access.
              </p>
              <p className="privacy-content">
                If you have any concerns regarding your privacy, please reach out to our team for further assistance.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
