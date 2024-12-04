import React from "react"; // Import React
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Col, Container, Row } from "react-bootstrap"; // Import Bootstrap components
import "./style.css"; // Import CSS file

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="footer-row">
          <Col md={3} sm={5} className="box">
            <div className="logo">
              <ion-icon name="bag"></ion-icon>
              <h1>Zenlooks</h1>
            </div>
            <p>
              Discover your unique style with Zenlooks, where fashion meets comfort. 
              Our curated collection offers the latest trends in clothing, designed for the modern individual. 
              Elevate your wardrobe and express yourself with confidence!
            </p>
          </Col>

          <Col md={3} sm={5} className="box">
            <h2>About Us</h2>
            <ul>
              <li><Link to="/our-stores">Our Stores</Link></li>
              <li><Link to="/our-cares">Our Cares</Link></li>
              <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </Col>

          <Col md={3} sm={5} className="box">
            <h2>Customer Care</h2>
            <ul>
              <li><Link to="/help-center">Help Center</Link></li>
              <li><Link to="/how-to-buy">How to Buy</Link></li>
              <li><Link to="/track-order">Track Your Order</Link></li>
              <li><Link to="/corporate-purchasing">Corporate & Bulk Purchasing</Link></li>
              <li><Link to="/returns-refunds">Returns & Refunds</Link></li>
            </ul>
          </Col>

          <Col md={3} sm={5} className="box">
            <h2>Contact Us</h2>
            <ul>
              <li>Dempster Hall, 1121 Greek Dr, Cape Girardeau, MO 63701, United States</li>
              <li>Email: load.balancers@gmail.com</li>
              <li>Phone: +1 4444 456 666</li>
            </ul>
          </Col>
        </Row>

        {/* Centered footer text */}
        <div className="footer-bottom">
          <p className="footer-highlight">Programming by The Load Balancers</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
