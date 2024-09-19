// UpdateEmployee.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: '', email: '', password: '', mobile: '', designation: '', gender: '', course: [], imgUpload: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/employees/${id}`)
      .then(response => setEmployee(response.data))
      .catch(error => console.log(error));
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const checkboxHandler = (e) => {
    const { name, checked, value } = e.target;
    if (checked) {
      setEmployee({ ...employee, [name]: [...employee[name], value] });
    } else {
      setEmployee({ ...employee, [name]: employee[name].filter(item => item !== value) });
    }
  };

  const fileHandler = (e) => {
    setEmployee({ ...employee, imgUpload: e.target.files[0] });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in employee) {
      formData.append(key, employee[key]);
    }
    await axios.put(`http://localhost:8000/api/employees/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        toast.success('Employee updated', { position: 'top-right' });
        navigate('/employees');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='updateEmployee'>
      <h3>Update Employee</h3>
      <form onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input type="text" onChange={inputHandler} id="name" name="name" value={employee.name} autoComplete='off' placeholder='Name' />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={inputHandler} id="email" name="email" value={employee.email} autoComplete='off' placeholder='Email' />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input type="password" onChange={inputHandler} id="password" name="password" value={employee.password} autoComplete='off' placeholder='Password' />
        </div>
        <div className="inputGroup">
          <label htmlFor="mobile">Mobile No</label>
          <input type="text" onChange={inputHandler} id="mobile" name="mobile" value={employee.mobile} autoComplete='off' placeholder='Mobile No' />
        </div>
        <div className="inputGroup">
          <label htmlFor="designation">Designation</label>
          <input type="text" onChange={inputHandler} id="designation" name="designation" value={employee.designation} autoComplete='off' placeholder='Designation' />
        </div>
        <div className="inputGroup">
          <label>Gender</label>
          <div>
            <input type="radio" onChange={inputHandler} id="male" name="gender" value="Male" checked={employee.gender === 'Male'} />
            <label htmlFor="male">Male</label>
            <input type="radio" onChange={inputHandler} id="female" name="gender" value="Female" checked={employee.gender === 'Female'} />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div className="inputGroup">
          <label>Course</label>
          <div>
            <input type="checkbox" onChange={checkboxHandler} id="mca" name="course" value="MCA" checked={employee.course.includes('MCA')} />
            <label htmlFor="mca">MCA</label>
            <input type="checkbox" onChange={checkboxHandler} id="bca" name="course" value="BCA" checked={employee.course.includes('BCA')} />
            <label htmlFor="bca">BCA</label>
            <input type="checkbox" onChange={checkboxHandler} id="bsc" name="course" value="BSC" checked={employee.course.includes('BSC')} />
            <label htmlFor="bsc">BSC</label>
          </div>
        </div>
        <div className="inputGroup">
          <label htmlFor="imgUpload">Img Upload</label>
          <input type="file" onChange={fileHandler} id="imgUpload" name="imgUpload" />
        </div>
        <div className="inputGroup">
          <button type="submit">UPDATE EMPLOYEE</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployee;
