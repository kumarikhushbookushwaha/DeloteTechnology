import './App.css';
import { Form, Button ,Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <div class="container d-flex justify-content-center align-items-center vh-100">
    <div className='card p-4 w-50 text-center d-flex'> 
    <Form>
      <Form.Group controlId='inputForm'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' placeholder='Enter your Name'></Form.Control>
        <Form.Label>Phone number</Form.Label>
        <Form.Control type='text' placeholder='Enter your Phone Number'></Form.Control>
        <Form.Label>Email Address</Form.Label>
        <Form.Control type='email' placeholder='Enter your Email Address'></Form.Control>
      </Form.Group>
    </Form>
    </div>
    <Container className="mt-5">
      <Row>
        <Col xs={12} md={8} className="bg-primary text-white p-3">
          Column 1
        </Col>
        <Col xs={6} md={4} className="bg-secondary text-white p-3">
          Column 2
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={6} className="bg-success text-white p-3">
          Column 3
        </Col>
        <Col xs={6} className="bg-danger text-white p-3">
          Column 4
        </Col>
      </Row>
    </Container>
    </div>

  )
}

export default App;
