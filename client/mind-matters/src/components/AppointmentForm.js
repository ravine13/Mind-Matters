import React, { useState } from 'react';
import axios from 'axios';

const apiEndpoint = 'http://127.0.0.1:5555';

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        appointment_date: '',
        appointment_time: '',
        client_id: '',
        notes: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem('authToken');
            const clientId = sessionStorage.getItem('userId'); 
    
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
    
           
            const [hours, minutes] = formData.appointment_time.split(':');
            const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
    
            const formDataWithClientId = {
                ...formData,
                appointment_time: formattedTime, 
                client_id: clientId, 
            };
    
            await axios.post(`${apiEndpoint}/appointments`, formDataWithClientId, config);
            setFormData({
                appointment_date: '',
                appointment_time: '',
                notes: '',
            });
            setSuccessMessage('Appointment booked successfully!'); 
            setErrorMessage(''); 
        } catch (error) {
            setSuccessMessage(''); 
            setErrorMessage('Error booking appointment. Please try again.'); 
        }
    };
    
    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
                Book an Appointment
            </div>
            {successMessage && (
                <div className="bg-green-200 text-green-800 p-4 mb-4 rounded">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="bg-red-200 text-red-800 p-4 mb-4 rounded">
                    {errorMessage}
                </div>
            )}
            <form className="py-4 px-6" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="appointment_date">
                        Date
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="appointment_date"
                        type="date"
                        onChange={handleInputChange}
                        value={formData.appointment_date}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="appointment_time">
                        Time
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="appointment_time"
                        type="time"
                        onChange={handleInputChange}
                        value={formData.appointment_time}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="notes">
                        Message
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="notes"
                        rows="4"
                        placeholder="Enter any additional information"
                        onChange={handleInputChange}
                        value={formData.notes}
                    ></textarea>
                </div>
                <div className="flex items-center justify-center mb-4">
                    <button
                        className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Book Appointment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;
