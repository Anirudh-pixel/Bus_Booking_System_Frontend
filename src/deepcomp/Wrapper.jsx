import React from 'react'
import { Link } from 'react-router-dom'

const Wrapper = ({ token, handleLogout, children }) => {
  const logout = () => {
    handleLogout()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation bar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-200">
          Travease
        </Link>

        <div className="flex gap-4 items-center">
          {!token && (
            <>
              <Link to="/register">
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
                  Sign In
                </button>
              </Link>
            </>
          )}

          {token && (
            <>
              <Link to="/my-bookings">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
                  My Bookings
                </button>
              </Link>
              <Link to="/">
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
              </Link>              
            </>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow p-6">
        {children}
      </main>

      {/* Footer (optional) */}
      <footer className="bg-gray-800 shadow-inner text-center py-4 text-white text-sm">
        © {new Date().getFullYear()} Bus Travels. All rights reserved.
      </footer>
    </div>
  )
}

export default Wrapper
