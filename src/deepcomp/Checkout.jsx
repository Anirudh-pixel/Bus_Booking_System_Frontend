import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const Checkout = ({ token }) => {
    const { seatId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const seatNumber = location.state?.seatNumber || '';  // receive seat number

    const [form, setForm] = useState({
        name: '',
        phone: '',
        age: '',
        gender: 'Male',
        paymentMethod: 'card'
    });

    const [isSeatBooked, setIsSeatBooked] = useState(false);

    useEffect(() => {
        const checkSeat = async () => {
            try {
                const response = await axios.get(`https://travease-backend.onrender.com/api/seats/${seatId}`);
                if (response.data.is_booked) {
                    alert("Seat already booked. Please choose another seat.");
                    setIsSeatBooked(true);
                    navigate(-1);
                }
            } catch (error) {
                console.error("Error checking seat:", error);
            }
        }
        checkSeat();
    }, [seatId, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            alert("Please Login to proceed");
            navigate('/login');
            return;
        }

        try {
            await axios.post("https://travease-backend.onrender.com/api/booking/", 
                {
                    seat: seatId,
                    name: form.name,
                    phone: form.phone,
                    age: form.age,
                    gender: form.gender,
                    payment_method: form.paymentMethod
                },
                {
                    headers: { Authorization: `Token ${token}` }
                }
            );
            alert("Booking Successful!");
            navigate('/my-bookings');
        } catch (error) {
            alert(error.response?.data?.error || "Booking Failed");
        }
    };

    if (isSeatBooked) return null;

    return (
        <div className="p-8 bg-gray-50 min-h-screen flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">Seat Number</label>
                        <input type="text" value={seatNumber} readOnly
                            className="w-full p-2 border rounded bg-gray-100" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange}
                            className="w-full p-2 border rounded" required />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Phone Number</label>
                        <input type="text" name="phone" value={form.phone} onChange={handleChange}
                            className="w-full p-2 border rounded" required />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Age</label>
                        <input type="number" name="age" value={form.age} onChange={handleChange}
                            className="w-full p-2 border rounded" required />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Gender</label>
                        <select name="gender" value={form.gender} onChange={handleChange}
                            className="w-full p-2 border rounded">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Payment Method</label>
                        <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}
                            className="w-full p-2 border rounded">
                            <option value="card">Credit/Debit Card</option>
                            <option value="upi">UPI</option>
                            <option value="netbanking">Net Banking</option>
                            <option value="cod">Cash On Delivery</option>
                        </select>
                    </div>

                    <button type="submit"
                        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
