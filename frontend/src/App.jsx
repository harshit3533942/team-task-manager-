import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// Auth Imports
import Login from "./pages/Auth/Login" 
import Signup from "./pages/Auth/Signup"

// Admin Imports (Make sure these match your exact file names!)
import Dashboard from "./pages/Admin/Dashboard"
import ManageTasks from "./pages/Admin/Managetask"
import ManageUsers from "./pages/Admin/Manageuser"
import CreateTask from "./pages/Admin/Createtask"

// You will need to create this PrivateRoute component if you haven't already!
import PrivateRoute from "./components/PrivateRoute" 
import UserDashboard from './pages/users/userDashboard'
import MyTask from './pages/users/MyTask'
import TaskDetails from './pages/users/TaskDetails'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Automatically redirect root to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Protected Routes */}
          {/* Note: Comment out the PrivateRoute wrapper for a second if you haven't built it yet, 
              or the app will crash because PrivateRoute doesn't exist! */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}> 
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
          </Route> 
          <Route element={<PrivateRoute allowedRoles={['user']}/>}>
          <Route path="/user/dashboard" element={<UserDashboard/>}/>
          <Route path="/user/tasks" element={<MyTask/>}/>
          <Route path="/user/task-details/:id" element={<TaskDetails/>}/>
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App