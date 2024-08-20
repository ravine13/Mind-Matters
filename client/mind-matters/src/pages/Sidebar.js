import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import AppointmentForm from '../components/AppointmentForm';

const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/login');
  };

  const handleProfileClick = () => {
    setActiveComponent('profile');
  };

  const handleSettingClick = () => {
    setActiveComponent('settings');
  };

  const handleAppointmentClick = () => {
    setActiveComponent('appointment');
  };

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white min-h-screen">
        <a href="#" className="flex items-center p-4 text-lg font-semibold">
          <i className="bx bxs-smile text-yellow-500" id="smiley"></i>
          <span className="ml-2">Mind Matters</span>
        </a>
        <ul className="mt-4">
          <li>
            <button onClick={handleProfileClick} className="flex items-center p-4 w-full text-left">
              <i className="bx bxs-doughnut-chart"></i>
              <span className="ml-2">Profile</span>
            </button>
          </li>
          <li>
            <button onClick={handleAppointmentClick} className="flex items-center p-4 w-full text-left">
              <i className="bx bxs-group"></i>
              <span className="ml-2">Book Appointment</span>
            </button>
          </li>
        </ul>
        <ul className="mt-auto">
          <li>
            <button onClick={handleSettingClick} className="flex items-center p-4 w-full text-left">
              <i className="bx bxs-cog"></i> 
              <span className="ml-2">Settings</span>
            </button>
          </li>
        </ul>
      </aside>

      <main className="flex-grow p-6">
        {activeComponent === 'profile' && <Profile />}
        {activeComponent === 'settings' && <Settings />} 
        {activeComponent === 'appointment' && <AppointmentForm />}
      </main>
    </div>
  );
};

export default Sidebar;
