import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function UserForm({ addUser, updateUser, editingUser }) {
  const [user, setUser] = useState({ id: null, name: '', email: '' });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
      updateUser(user);
    } else {
      addUser({ ...user, id: Date.now() });
    }
    setUser({ id: null, name: '', email: '' });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group controlId="formName">
        <Form.Control
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="mb-2"
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Control
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="mb-2"
        />
      </Form.Group>
      <Button variant="success" type="submit">
        {user.id ? 'Update' : 'Add'}
      </Button>
    </Form>
  );
}

export default UserForm;
