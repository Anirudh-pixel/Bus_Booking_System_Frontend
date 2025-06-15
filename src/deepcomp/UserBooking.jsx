import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserBooking = ({ token, userId }) => {
    const [bookings, setBookings] = useState([])
    const [bookingError, setBookingError] = useState(null)
    const [expandedBooking, setExpandedBooking] = useState(null)  // ✅ For toggling details

    useEffect(() => {
        const fetchBookings = async () => {
            if (!token || !userId) return;

            try {
                const response = await axios.get(`https://travease-backend.onrender.com/api/user/${userId}/bookings/`,
                    {
                        headers: {
                            Authorization: `Token ${token}`
                        }
                    }
                );
                setBookings(response.data);
            } catch (error) {
                console.log("Fetching Details failed", error);
                setBookingError(error.response?.data?.message);
            }
        };
        fetchBookings();
    }, [userId, token]);

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;

        try {
            await axios.delete(`https://travease-backend.onrender.com/api/booking/${bookingId}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            setBookings((prev) => prev.filter((b) => b.id !== bookingId));
        } catch (error) {
            alert('❌ Failed to cancel booking: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
            {bookings.map((item) => (
                <div key={item.id} className="relative bg-white p-4 mb-6 rounded shadow min-h-[150px]">
                    <div>
                        <p><strong>Bus:</strong> {item.bus.bus_name}</p>
                        <p><strong>Seat:</strong> {item.seat.seat_number}</p>
                        <p><strong>Booking Time:</strong> {item.booking_time}</p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => setExpandedBooking(expandedBooking === item.id ? null : item.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow"
                        >
                            {expandedBooking === item.id ? "Hide Details" : "Passenger Details"}
                        </button>

                        <button
                            onClick={() => handleCancelBooking(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
                        >
                            Cancel Booking
                        </button>
                    </div>

                    {/* Passenger Details Section */}
                    {expandedBooking === item.id && item.passenger && (
    <div className="mt-4 bg-gray-100 p-4 rounded-md">
        <p><strong>Passenger Name:</strong> {item.passenger.name}</p>
        <p><strong>Phone:</strong> {item.passenger.phone}</p>
        <p><strong>Age:</strong> {item.passenger.age}</p>
        <p><strong>Gender:</strong> {item.passenger.gender}</p>
        <p><strong>Payment Method:</strong> {item.passenger.payment_method}</p>
    </div>
)}

                </div>
            ))}

            {bookingError && <p className="text-red-600">{bookingError}</p>}
        </div>
    );
}

export default UserBooking
