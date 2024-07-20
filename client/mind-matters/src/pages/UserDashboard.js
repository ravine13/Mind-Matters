import React from 'react';
import { Button } from 'flowbite-react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  const bookAppointment = () => {
    // Logic to book appointment
  };

  const logout = () => {
    // Logic to logout
    navigate('/login');
  };

  return (
    <main className="px-4 my-12">
      <h1 className="text-3xl font-semibold text-center">User Dashboard</h1>
      <div className="flex flex-col items-center my-8">
        <Button gradientDuoTone="purpleToBlue" onClick={bookAppointment}>
          Book Appointment
        </Button>
        <Button gradientDuoTone="cyanToBlue" onClick={logout} className="mt-4">
          Logout
        </Button>
        <Calendar className="mt-8" />
      </div>
    </main>
  );
};

export default UserDashboard;
