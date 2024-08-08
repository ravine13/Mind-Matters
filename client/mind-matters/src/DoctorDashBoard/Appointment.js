import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch the appointments from the backend
    axios.get('http://127.0.0.1:5555/appointments')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the appointments!', error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id} className="mb-2 p-4 bg-gray-100 rounded">
            <p><strong>Client ID:</strong> {appointment.client_id}</p>
            <p><strong>Date:</strong> {appointment.appointment_date}</p>
            <p><strong>Time:</strong> {appointment.appointment_time}</p>
            {appointment.notes && <p><strong>Notes:</strong> {appointment.notes}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
