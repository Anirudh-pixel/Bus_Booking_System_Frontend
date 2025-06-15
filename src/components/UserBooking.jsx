import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserBooking = ({token, userId}) => {
    const [bookings, setBookings] = useState([])
    const [bookingError, setBookingError] = useState(null) 

useEffect(()=>{
    const fetchBookings = async()=>{
        if(!token || !userId){
            return
        }
        try {
            const response = await axios.get(`https://travease-backend.onrender.com/api/user/${userId}/bookings/`,
                {
                    headers:{
                        Authorization : `Token ${token}`
                    }
            }
        )
        console.log("Booking Data = ", response.data)
        setBookings(response.data)
        console.log("Checking for user bookings =",response.data)

        } catch (error) {
            console.log("Fetching Details failed",error)
            setBookingError(
                error.response?.data?.message
            )
        }
    }
    fetchBookings()
}, [userId, token])

return (
    <div>
        {bookingError && <div style={{ color: 'red' }}>Error: {bookingError}</div>}

        {bookings.map((item)=>{
        return(
            <div>
                {item.user}-
                {item.bus.bus_name}-
                {item.seat.seat_number}-
                {item.booking_time}
            </div>
        )
    })}
    </div>   
  )
}

export default UserBooking