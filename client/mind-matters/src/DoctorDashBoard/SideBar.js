import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/appointments');
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
      </main>
    </div>
  );
};

export default Sidebar;
