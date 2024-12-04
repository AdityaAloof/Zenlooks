import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import './OurStores.css'; // Specific CSS for OurStores section

const stores = [
  { 
    city: "New York", 
    address: "123 Fifth Avenue, New York, NY", 
    phone: "+1 123 456 7890", 
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.908474142616!2d-74.00166318429406!3d40.73225357932914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259abdcbb9bb5%3A0x8a84ef4e6b3bc6c4!2s70+Washington+Square+S%2C+New+York%2C+NY+10012%2C+USA!5e0!3m2!1sen!2sin!4v1630579786423!5m2!1sen!2sin"
  },
  { 
    city: "Los Angeles", 
    address: "456 Sunset Blvd, Los Angeles, CA", 
    phone: "+1 987 654 3210", 
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.220034865896!2d-118.34302018429556!3d34.10148208059783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf42b31cdbb3%3A0x9f4d9be5e4b1e9f5!2s456+Sunset+Blvd%2C+Los+Angeles%2C+CA+90026%2C+USA!5e0!3m2!1sen!2sin!4v1630648315786!5m2!1sen!2sin"
  },
  { 
    city: "Chicago", 
    address: "789 Michigan Avenue, Chicago, IL", 
    phone: "+1 555 444 3333", 
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23742.14856976828!2d-87.62429880523336!3d41.87811401444395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c938b4e9e7f%3A0x1de5975a3babe7c3!2s789+Michigan+Ave%2C+Chicago%2C+IL+60611%2C+USA!5e0!3m2!1sen!2sin!4v1630648372248!5m2!1sen!2sin"
  }
];

const OurStores = () => {
  return (
    <Container className="stores-container">
      <h2 className="stores-title">Our Stores</h2>
      <p className="stores-description">
        Find a Zenlooks store near you. We’re always happy to welcome you to experience our latest collections in person.
      </p>
      <Row>
        {stores.map((store, index) => (
          <Col key={index} md={4}>
            <Card className="store-card">
              <Card.Body>
                <Card.Title>{store.city}</Card.Title>
                <Card.Text>
                  <strong>Address:</strong> {store.address}
                  <br />
                  <strong>Phone:</strong> {store.phone}
                </Card.Text>
                <div className="map-container">
                  <iframe
                    src={store.mapSrc}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title={store.city}
                  ></iframe>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default OurStores;
