import React, { useState, useEffect, useContext } from 'react';
import { Container, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../context/AuthContext'; // Assuming you have an AuthContext
import { Auth } from 'aws-amplify'; // Import AWS Amplify Auth

const NavBar = ({ updateAuthStatus }) => {
  const { cartList } = useSelector((state) => state.cart); // Get cart state from Redux
  const { currentUser, isAuthenticated } = useContext(AuthContext); // Get user data from context
  const navigate = useNavigate();

  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle scroll to fix the Navbar
  const scrollHandler = () => {
    setIsFixed(window.scrollY >= 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  // Handle Sign Out using AWS Amplify Auth.signOut method
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      updateAuthStatus(false); // Update authentication status in the App component
      navigate('/'); // Redirect to home after sign-out
    } catch (error) {
      console.error('Error signing out: ', error.message); // Log errors
    }
  };

  return (
    <Navbar fixed="top" expand="md" className={isFixed ? 'navbar fixed' : 'navbar'} bg="light">
      <Container className="navbar-container">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <ion-icon name="bag" className="me-2"></ion-icon>
          <h1 className="logo mb-0">Zenlooks</h1>
        </Navbar.Brand>

        {/* Search Form */}
        {/* <Form className="d-flex me-auto" onSubmit={handleSearchSubmit}>
          <FormControl
            type="text"
            placeholder="Search products"
            className="me-2"
            style={{ width: '300px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form> */}

        {/* Navbar Toggle for small screens */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpand(expand ? false : 'expanded')}
        />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Item>
              <Link className="navbar-link nav-link mx-3" to="/" onClick={() => setExpand(false)}>
                Home
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link className="navbar-link nav-link mx-3" to="/shop" onClick={() => setExpand(false)}>
                Shop
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link className="navbar-link nav-link mx-3" to="/cart" onClick={() => setExpand(false)}>
                Cart ({cartList.length})
              </Link>
            </Nav.Item>

            {/* Conditionally render Sign In or Sign Out */}
            {isAuthenticated ? (
              <>
                <Nav.Item className="mx-3">
                  <span className="navbar-link nav-link">Welcome, {currentUser?.email}</span>
                </Nav.Item>
                <Nav.Item>
                  <Button className="btn btn-outline-danger mx-3" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </Nav.Item>
              </>
            ) : (
              <Nav.Item>
                <Link className="navbar-link nav-link mx-3" to="/sign-in">
                  Sign In
                </Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
