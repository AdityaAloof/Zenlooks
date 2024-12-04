import { useLocation, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function WelcomePage() {
    const location = useLocation();
    const { username } = location.state || {};  // Get the username passed from ValidatePage

    return (
        <Container>
            <Row className="px-4 my-5">
                <Col><h1>Welcome, {username}!</h1></Col>
            </Row>
            <Row className="px-4 my-5">
                <Col>
                    <p>Your account has been successfully validated. You can now sign in.</p>
                    <Link to="/sign-in">
                        <Button variant="primary">Sign In</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default WelcomePage;
