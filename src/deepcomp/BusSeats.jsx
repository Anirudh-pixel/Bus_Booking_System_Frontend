import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const BusSeats = ({token}) => {
    const [bus, setBus] = useState(null)
    const [seats, setSeats] = useState([])

    const {busId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBusDetails = async () => {
            try {
                const response = await axios(`https://travease-backend.onrender.com/api/buses/${busId}`)
                setBus(response.data)
                setSeats(response.data.seats || [])
            } catch (error) {
                console.log('Error in fetching details', error)
            }
        }
        fetchBusDetails()
    }, [busId])

    const handleBook = (seatId, seatNumber) => {
        if (!token) {
            alert("Please Login for booking a seat")
            navigate('/login')
            return
        }
        // Pass seatId and seatNumber via state
        navigate(`/checkout/${seatId}`, { state: { seatNumber } })
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {bus && (
                <div className="mb-6 bg-white p-4 rounded-xl shadow">
                    <h2 className="text-2xl font-semibold">{bus.bus_name}</h2>
                    <p>{bus.number}</p>
                    <p>{bus.origin} → {bus.destination}</p>
                    <p>{bus.start_time} - {bus.reach_time}</p>
                </div>
            )}
            <div className="grid grid-cols-4 gap-4">
                {seats.map((seat) => (
                    <button key={seat.id} onClick={() => handleBook(seat.id, seat.seat_number)}
                        className={`p-3 rounded text-white font-semibold ${seat.is_booked ? 'bg-red-500' : 'bg-green-500'} hover:opacity-90`}>
                        Seat {seat.seat_number}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default BusSeats
