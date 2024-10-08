import React from 'react';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../DoctorDashBoard/SideBar'

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const viewAppointments = () => {
  };

  const logout = () => {
    navigate('/login');
  };

  return (
    <main className="px-4 my-12">
      <SideBar />
      <div className="flex flex-col items-center my-8">
        <Button gradientDuoTone="purpleToBlue" onClick={viewAppointments}>
          View Appointments
        </Button>
      </div>
    </main>
  );
};

export default DoctorDashboard;
