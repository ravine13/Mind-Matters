import React from 'react';
import { Button } from 'flowbite-react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MainContent from './MainContent';

const UserDashboard = () => {
  const navigate = useNavigate();

  const bookAppointment = () => {
    // Logic to book appointment
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <section id="content">
        <Navbar />
        <MainContent />
        <main className="px-4 my-12">
          <h1 className="text-3xl font-semibold text-center">User Dashboard</h1>
          <div className="flex flex-col items-center my-8">
            <Button gradientDuoTone="purpleToBlue" onClick={bookAppointment}>
              Book Appointment
            </Button>
            <Calendar className="mt-8" />
          </div>
        </main>
      </section>
    </div>
  );
};

export default UserDashboard;
