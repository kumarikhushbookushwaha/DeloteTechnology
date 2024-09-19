import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Add from './components/adduser/Add';
import Edit from './components/updateuser/Edit';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState("John Doe");

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/add",
      element: <Add />,
    },
    {
      path: "/edit/:id",
      element: <Edit />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/employeelist",
      element: <EmployeeList />,
    },
  ]);

  return (
    <RouterProvider router={route}>
      <div className="App">
        <Navbar username={username} />
      </div>
    </RouterProvider>
  );
}

export default App;
