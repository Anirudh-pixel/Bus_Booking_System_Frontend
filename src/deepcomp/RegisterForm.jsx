import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import axios from 'axios';

const RegisterForm = () => {
    const [form, setForm] = useState({
        username: '', email: '', password: ''
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // initialize the navigation hook

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/register/', form);
            setMessage('✅ Registration successful!');
            setTimeout(() => {
                navigate('/buslist'); // redirect to home after a short delay
            }, 1000);
        } catch (error) {
            const errMsg = error.response?.data?.username || error.message;
            setMessage('❌ Registration failed: ' + errMsg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
            <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
                    Travease - Register
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm transition duration-200"
                    >
                        Register
                    </button>
                </form>
                {message && (
                    <p className="mt-4 text-center text-sm font-medium text-red-600">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default RegisterForm;
