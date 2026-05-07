import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
  // Replace this with your actual authentication logic. 
  // For now, we'll try to get the user from localStorage.
  const user = JSON.parse(localStorage.getItem('user')); 

  // If there is no user logged in at all, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if the user has the required role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If they don't have permission, maybe send them back to their specific dashboard
    return <Navigate to="/login" replace />; 
  }

  // If authenticated and authorized, render the child routes
  return <Outlet />;
};

export default PrivateRoute;