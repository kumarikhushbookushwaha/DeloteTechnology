import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api/login', credentials)
      .then((response) => {
        toast.success('Login successful', { position: 'top-right' });
        navigate('/dashboard');
      })
      .catch(error => toast.error('Login failed', { position: 'top-right' }));
  };

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
      <Row className='w-100'>
        <Col md={6} lg={4} className='mx-auto'>
          <div className='login p-4 border rounded bg-white'>
            <h3 className='text-center mb-4'>Login</h3>
            <Form onSubmit={submitForm}>
              <Form.Group className='mb-3' controlId='username'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' onChange={inputHandler} name='username' autoComplete='off' placeholder='Username' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' onChange={inputHandler} name='password' autoComplete='off' placeholder='Password' />
              </Form.Group>
              <Button variant='primary' type='submit' className='w-100'>LOGIN</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
