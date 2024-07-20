import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import UserProvider from './context/UserContext';
import UserDashboard from './pages/UserDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import './index.css'; 

export default function App() {
  return (
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          </Route>
        </Routes>
      </UserProvider>
  );
}
