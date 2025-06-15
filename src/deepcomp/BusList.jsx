import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BusList = () => {
    const [buses, setBuses] =useState([])
    const [sortBy, setSortBy] = useState(''); 
    const navigate =useNavigate()

    useEffect(()=>{
        const fetchBuses = async()=>{
            try{
                const response= await axios.get("https://travease-backend.onrender.com/api/buses/")
                setBuses(response.data)
            }catch(error){
                console.log('error in fetching the bus',error)
            }
        }
        fetchBuses()
    }, [])

    const handleViewSeats=(id)=>{
        navigate(`/bus/${id}`)
    }

    const sortedBuses = [...buses].sort((a, b) => {
        if (sortBy === 'priceLowHigh') return a.price - b.price;
        if (sortBy === 'priceHighLow') return b.price - a.price;
        if (sortBy === 'startTime') return a.start_time.localeCompare(b.start_time);
        return 0;
    })

    return (
    <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-semibold mb-6">Available Buses</h1>

        <div className="mb-6">
                <label className="mr-2 font-medium">Sort By:</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">-- Select --</option>
                    <option value="priceLowHigh">Price: Low to High</option>
                    <option value="priceHighLow">Price: High to Low</option>
                    <option value="startTime">Start Time</option>
                </select>
            </div>
        
        <div className="grid gap-6">
        {sortedBuses.map((item)=>(
            <div key={item.id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold">{item.bus_name} ({item.bus_number})</h2>
                <p>From: {item.origin} → To: {item.destination}</p>
                <p>Start: {item.start_time} | Reach: {item.reach_time}</p>
                <p className="text-gray-600">Price: ₹{item.price}</p>
                <button onClick={()=>handleViewSeats(item.id)}
                        className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    View Seats
                </button>
            </div>
        ))}
        </div>
    </div>
  )
}

export default BusList;