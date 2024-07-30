import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Implement the logout logic if needed
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <a href="#" className="flex items-center p-4 text-lg font-semibold">
        <i className='bx bxs-smile text-yellow-500' id="smiley"></i>
        <span className="ml-2">Telehealth</span>
      </a>
      <ul className="mt-4">
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => `flex items-center p-4 ${isActive ? 'bg-gray-700' : ''}`}>
            <i className='bx bxs-dashboard'></i>
            <span className="ml-2">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/peer-mentors" className={({ isActive }) => `flex items-center p-4 ${isActive ? 'bg-gray-700' : ''}`}>
            <i className='bx bxs-shopping-bag-alt'></i>
            <span className="ml-2">Peer Mentors</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/requests" className={({ isActive }) => `flex items-center p-4 ${isActive ? 'bg-gray-700' : ''}`}>
            <i className='bx bxs-doughnut-chart'></i>
            <span className="ml-2">Requests</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/messages" className={({ isActive }) => `flex items-center p-4 ${isActive ? 'bg-gray-700' : ''}`}>
            <i className='bx bxs-message-dots'></i>
            <span className="ml-2">Message</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/doctors" className={({ isActive }) => `flex items-center p-4 ${isActive ? 'bg-gray-700' : ''}`}>
            <i className='bx bxs-group'></i>
            <span className="ml-2">Book Appointment</span>
          </NavLink>
        </li>
      </ul>
      <ul className="mt-auto">
        <li>
          <NavLink to="/settings" className={({ isActive }) => `flex items-center p-4 ${isActive ? 'bg-gray-700' : ''}`}>
            <i className='bx bxs-cog'></i>
            <span className="ml-2">Settings</span>
          </NavLink>
        </li>
        <li>
          <button onClick={logout} className="flex items-center p-4 w-full text-left">
            <i className='bx bxs-log-out-circle'></i>
            <span className="ml-2">Logout</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
