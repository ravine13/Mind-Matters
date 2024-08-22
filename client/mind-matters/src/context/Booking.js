import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiEndpoint = 'http://127.0.0.1:5555';

const Bookings = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = sessionStorage.getItem('authToken');
                const clientId = sessionStorage.getItem('userId');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get(`${apiEndpoint}/appointments?client_id=${clientId}`, config);
                setAppointments(response.data);
            } catch (err) {
                setError('Error fetching appointments. Please try again.');
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Your Appointments</h2>
            {error && (
                <div className="bg-red-200 text-red-800 p-4 mb-4 rounded">
                    {error}
                </div>
            )}
            {appointments.length > 0 ? (
                <ul className="space-y-4">
                    {appointments.map((appointment) => (
                        <li key={appointment.id} className="bg-white shadow p-4 rounded">
                            <p className="font-bold">Date: {appointment.appointment_date}</p>
                            <p>Time: {appointment.appointment_time}</p>
                            <p>Message: {appointment.notes}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">No appointments found.</p>
            )}
        </div>
    );
};

export default Bookings;
