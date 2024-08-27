import React, { useState } from 'react';
import UserForm from './UserForm';
import UserTable from './UserTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUser(null);
  };

  return (
    <div className="App container bg-primary text-white p-5">
      <h1 className="mb-4">User Input Form</h1>
      <UserForm addUser={addUser} updateUser={updateUser} editingUser={editingUser} />
      <UserTable users={users} setEditingUser={setEditingUser} />
    </div>
  );
}

export default App;
