import React, { useState } from 'react'
//import RegisterForm from './components/RegisterForm'
//import LoginForm from './components/LoginForm'
import { Routes,Route } from 'react-router-dom'
//import BusList from './components/BusList'
//import BusSeats from './components/BusSeats'
//import UserBooking from './components/UserBooking'
//import Wrapper from './components/Wrapper'
import LoginForm from './deepcomp/Loginform'
import RegisterForm from './deepcomp/RegisterForm'
import BusList from './deepcomp/BusList'
import BusSeats from './deepcomp/BusSeats'
import UserBooking from './deepcomp/UserBooking'
import Wrapper from './deepcomp/Wrapper'
import HomePage from './deepcomp/HomePage'
import Checkout from './deepcomp/Checkout'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const handleLogin =(token, userId)=>{
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    setToken(token);
    setUserId(userId);
  }

  const handleLogout =()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setToken(null);
    setUserId(null);
  }
  return (
    <div>
      <Wrapper handleLogout={handleLogout} token={token}>      
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        {/*<Route path='/' element={<BusList/>} />*/}
        <Route path='/buslist' element={<BusList/>} />
        {/*<Route path='/register' element={<RegisterForm />} />*/}
        <Route path='/register' element={<RegisterForm />} />
        {/*<Route path='/login' element={<LoginForm onLogin={handleLogin}/>} /> */}
        <Route path='/login' element={<LoginForm onLogin={handleLogin}/>} />
        {/*<Route path='/bus/:busId' element={<BusSeats token={token}/>} /> */}
        <Route path='/bus/:busId' element={<BusSeats token={token}/>} />
        {/*<Route path='/my-bookings' element={<UserBooking token={token} userId={userId}/>} /> */}
        <Route path='/my-bookings' element={<UserBooking token={token} userId={userId}/>} />
        <Route path="/checkout/:seatId" element={<Checkout token={token} />} />

      </Routes>

      </Wrapper>
    </div>
  )
}

export default App   