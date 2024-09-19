import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {

  const users = {
    name: "",
    email: "",
    password: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    imgUpload: null
  }

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const checkboxHandler = (e) => {
    const { name, checked, value } = e.target;
    if (checked) {
      setUser({ ...user, [name]: [...user[name], value] });
    } else {
      setUser({ ...user, [name]: user[name].filter(item => item !== value) });
    }
  }

  const fileHandler = (e) => {
    setUser({ ...user, imgUpload: e.target.files[0] });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in user) {
      formData.append(key, user[key]);
    }
    await axios.post("http://localhost:8000/api/create", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch(error => console.log(error));
  }

  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h3>Add new user</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input type="text" onChange={inputHandler} id="name" name="name" autoComplete='off' placeholder='Name' />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={inputHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input type="password" onChange={inputHandler} id="password" name="password" autoComplete='off' placeholder='password' />
        </div>
        <div className="inputGroup">
          <label htmlFor="mobile">Mobile No</label>
          <input type="text" onChange={inputHandler} id="mobile" name="mobile" autoComplete='off' placeholder='Mobile No' />
        </div>
        <div className="inputGroup">
          <label htmlFor="designation">Designation</label>
          <input type="text" onChange={inputHandler} id="designation" name="designation" autoComplete='off' placeholder='Designation' />
        </div>
        <div className="inputGroup">
          <label>Gender</label>
          <div>
            <input type="radio" onChange={inputHandler} id="male" name="gender" value="Male" />
            <label htmlFor="male">Male</label>
            <input type="radio" onChange={inputHandler} id="female" name="gender" value="Female" />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div className="inputGroup">
          <label>Course</label>
          <div>
            <input type="checkbox" onChange={checkboxHandler} id="mca" name="course" value="MCA" />
            <label htmlFor="mca">MCA</label>
            <input type="checkbox" onChange={checkboxHandler} id="bca" name="course" value="BCA" />
            <label htmlFor="bca">BCA</label>
            <input type="checkbox" onChange={checkboxHandler} id="bsc" name="course" value="BSC" />
            <label htmlFor="bsc">BSC</label>
          </div>
        </div>
        <div className="inputGroup">
          <label htmlFor="imgUpload">Img Upload</label>
          <input type="file" onChange={fileHandler} id="imgUpload" name="imgUpload" />
        </div>
        <div className="inputGroup">
          <button type="submit">ADD USER</button>
        </div>
      </form>
    </div>
  )
}

export default Add;
