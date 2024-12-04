import { Auth } from 'aws-amplify';  // Correct import for Auth
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function RegisterPage() {
    const navigate = useNavigate();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State to hold error message

    // Function to handle user registration
    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear error message before submitting

        try {
            console.log("Registering user");

            // Use the signUp function from AWS Amplify's Auth
            const { user } = await Auth.signUp({
                username: username,
                password: password,
                attributes: {
                    email: email,
                    given_name: fname,  // First Name
                    family_name: lname  // Last Name
                }
            });

            console.log('User registered: ', user);
            navigate('/ValidatePage');  // Redirect to the validate page after registration
        } catch (err) {
            if (err.code === 'UsernameExistsException') {
                setErrorMessage('User already exists. Please try logging in.');  // Specific error message
            } else {
                setErrorMessage(`Registration failed: ${err.message}`);  // General error message
            }
        }
    };

    return (
        <Container>
            <Row className="px-4 my-5">
                <Col><h1>Register</h1></Col>
            </Row>
            <Row className="px-4 my-5">
                <Col sm={6}>
                    <Form onSubmit={handleRegister}>
                        {/* First Name Field */}
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name"
                                onChange={evt => setFname(evt.target.value)} />
                        </Form.Group>

                        {/* Last Name Field */}
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last Name"
                                onChange={evt => setLname(evt.target.value)} />
                        </Form.Group>

                        {/* Username Field */}
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter User Name"
                                onChange={evt => setUserName(evt.target.value)} />
                        </Form.Group>

                        {/* Email Field */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                onChange={evt => setEmail(evt.target.value)} />
                            <Form.Text className='text-muted'>
                                We'll never share your email!
                            </Form.Text>
                        </Form.Group>

                        {/* Password Field */}
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password"
                                onChange={evt => setPassword(evt.target.value)} />
                        </Form.Group>

                        {/* Display error message if it exists */}
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                        <Button variant="primary" type="submit">Register &gt;&gt;</Button>

                        &nbsp;&nbsp;
                        {/* Update this link to match the correct path */}
                        <Link to='/sign-in'>
                            <Button variant="outline-primary">Login</Button>
                        </Link>
                        &nbsp;&nbsp;
                        <Link to='/'>
                            <Button variant="outline-primary">Cancel</Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterPage;
