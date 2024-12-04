import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./slidercard.css";

const SlideCard = ({ title, desc, cover }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRedirect = () => {
    navigate('/shop'); // Redirect to the shop page
  };

  return (
    <Container className="box">
      <Row>
        <Col md={6}>
          <h1>{title}</h1>
          <p>{desc}</p>
          <button className="btn-primary" onClick={handleRedirect}>
            Visit Collections
          </button>
        </Col>
        <Col md={6}>
          <img src={cover} alt="collection" />
        </Col>
      </Row>
    </Container>
  );
};

export default SlideCard;
