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

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiEndpoint}/appointments`, formData);
            setFormData({
                appointment_date: '',
                appointment_time: '',
                client_id: '',
                notes: '',
            });
        } catch (error) {
            console.error('Error booking appointment:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
                Book an Appointment
            </div>
            <form className="py-4 px-6" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="appointment_date">
                        Date
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="appointment_date"
                        type="date"
                        onChange={handleInputChange}
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
