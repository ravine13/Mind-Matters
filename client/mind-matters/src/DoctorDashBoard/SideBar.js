import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';

const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('https://mind-matters-mn7b.onrender.com/appointments');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const logout = () => {
    navigate('/login');
  };

  const handleAppointmentsClick = () => {
    setActiveComponent('appointments');
  };

  const handleProfileClick = () => {
    setActiveComponent('profile');
  };

  const handlePatientsClick = () => {
    setActiveComponent('patients');
  };

  const handleSettingClick = () => {
    setActiveComponent('settings');
  };

  const handleMessagesClick = () => {
    setActiveComponent('messages');
  };

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white min-h-screen">
        <a href="#" className="flex items-center p-4 text-lg font-semibold">
          <i className="bx bxs-smile text-yellow-500" id="smiley"></i>
          <span className="ml-2">Doctor Dashboard</span>
        </a>
        <ul className="mt-4">
          <li>
            <button onClick={handleAppointmentsClick} className="flex items-center p-4 w-full text-left">
              <i className="bx bxs-calendar"></i>
              <span className="ml-2">Appointments</span>
            </button>
          </li>
          <li>
            <button onClick={handleProfileClick} className="flex items-center p-4 w-full text-left">
              <i className="bx bxs-user"></i>
              <span className="ml-2">Profile</span>
            </button>
          </li>
          {/* <li>
            <button onClick={handlePatientsClick} className="flex items-center p-4 w-full text-left">
              <i className="bx bxs-group"></i>
              <span className="ml-2">Patients</span>
            </button>
          </li> */}
          <li>
            <button onClick={handleSettingClick} className="flex items-center p-4 w-full text-left">
              <i className="bx bxs-cog"></i> 
              <span className="ml-2">Settings</span>
            </button>
          </li>
        </ul>
        <ul className="mt-auto">
          <li>
            <button onClick={logout} className="flex items-center p-4 w-full text-left">
              <i className="bx bxs-log-out-circle"></i>
              <span className="ml-2">Logout</span>
            </button>
          </li>
        </ul>
      </aside>

      <main className="flex-grow p-6">
        {activeComponent === 'appointments' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Appointments</h2>
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                  <p><strong>Patient ID:</strong> {appointment.client_id}</p>
                  <p><strong>Date:</strong> {appointment.appointment_date}</p>
                  <p><strong>Time:</strong> {appointment.appointment_time}</p>
                  <p><strong>Notes:</strong> {appointment.notes}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeComponent === 'profile' && <Profile />}
        {activeComponent === 'settings' && <Settings />} 
        {activeComponent === 'messages' && <div>Messages Component</div>}
      </main>
    </div>
  );
};

export default Sidebar;
