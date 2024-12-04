import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import './TermsConditions.css'; // Specific CSS for Terms & Conditions section

const TermsConditions = () => {
  return (
    <Container className="terms-container">
      <h2 className="terms-title">Terms & Conditions</h2>
      <Row>
        <Col md={12}>
          <Card className="terms-card">
            <Card.Body>
              <p className="terms-content">
                Welcome to Zenlooks! By accessing and using our website, you agree to the following terms and conditions.
              </p>
              <p className="terms-content">
                <strong>1. Use of the Website:</strong> You agree to use our website for lawful purposes only.
              </p>
              <p className="terms-content">
                <strong>2. Intellectual Property:</strong> All content on this website, including text, images, and designs, is owned by Zenlooks.
              </p>
              <p className="terms-content">
                <strong>3. User Accounts:</strong> You are responsible for maintaining the confidentiality of your account and password.
              </p>
              <p className="terms-content">
                For more details, feel free to contact our support team.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsConditions;
