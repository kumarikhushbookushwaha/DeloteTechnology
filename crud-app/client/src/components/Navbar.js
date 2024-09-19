import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const CustomNavbar = ({ username }) => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear any authentication tokens or user data here
    toast.success('Logged out successfully', { position: 'top-right' });
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/employees">Employee Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/employees">Employee List</Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text className="me-3">
              Welcome, {username}
            </Navbar.Text>
            <Button variant="outline-light" onClick={logout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
