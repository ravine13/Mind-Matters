import React from 'react';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const viewAppointments = () => {
    // Logic to view appointments
  };

  const logout = () => {
    // Logic to logout
    navigate('/login');
  };

  return (
    <main className="px-4 my-12">
      <h1 className="text-3xl font-semibold text-center">Doctor Dashboard</h1>
      <div className="flex flex-col items-center my-8">
        <Button gradientDuoTone="purpleToBlue" onClick={viewAppointments}>
          View Appointments
        </Button>
        <Button gradientDuoTone="cyanToBlue" onClick={logout} className="mt-4">
          Logout
        </Button>
        {/* Add logic to display user notes for each appointment */}
      </div>
    </main>
  );
};

export default DoctorDashboard;
