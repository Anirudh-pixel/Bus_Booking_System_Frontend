import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
     

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center flex-grow text-center px-4 py-20 bg-gradient-to-br from-blue-100 to-white">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800">Your Journey Begins with Travease</h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-xl mb-8">
          Discover affordable, comfortable, and on-time bus services across the country.
        </p>
        <Link to="/buslist">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition">
            Book Now
          </button>
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-12 px-6 bg-white">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">Why Choose Us?</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-blue-50 rounded-xl shadow text-center">
            <h4 className="text-xl font-semibold text-blue-600 mb-2">Comfortable Buses</h4>
            <p className="text-gray-600">Clean, air-conditioned, and spacious buses for a smooth ride.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl shadow text-center">
            <h4 className="text-xl font-semibold text-blue-600 mb-2">Punctual Service</h4>
            <p className="text-gray-600">On-time departures and arrivals to keep your plans on track.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl shadow text-center">
            <h4 className="text-xl font-semibold text-blue-600 mb-2">Easy Booking</h4>
            <p className="text-gray-600">Seamless and fast online booking from the comfort of your home.</p>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default HomePage;
