import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import Navbar from './Navbar'; 

const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="px-4 py-12 flex-1">
          <h1 className="text-3xl font-semibold text-center"> client Dashboard</h1>
          <div className="flex flex-col items-center my-8">
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
