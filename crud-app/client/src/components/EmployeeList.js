import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Container, Table, Button } from 'react-bootstrap';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.log(error));
  }, []);

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:8000/api/employees/${id}`)
      .then(response => {
        toast.success('Employee deleted', { position: 'top-right' });
        setEmployees(employees.filter(employee => employee.id !== id));
      })
      .catch(error => console.log(error));
  };

  return (
    <Container className='mt-5'>
      <h3 className='text-center mb-4'>Employee List</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course.join(', ')}</td>
              <td><img src={employee.imgUpload} alt={employee.name} width="50" /></td>
              <td>
                <Link to={`/update/${employee.id}`} className='btn btn-warning btn-sm me-2'>Edit</Link>
                <Button variant='danger' size='sm' onClick={() => deleteEmployee(employee.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EmployeeList;
