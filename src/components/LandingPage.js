import React from 'react';
import { FaPaw, FaBone, FaHeart, FaPencilAlt, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    //bg-gradient-to-r from-green-400 to-blue-500
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-600 to-teal-800">
      <div className="text-white text-center">
        <div className="text-5xl font-bold mb-4">
          <FaPaw className="inline-block mr-2 text-8xl" />
          Pets Care System
        </div>
        <p className="text-lg mb-8">
          Your trusted platform for quality pet care services. Connecting pet owners with the best caregivers.
        </p>
        <div className="mb-8">
          <Link to="/signup" className="btn-primary mr-4 hover:bg-gray-700">
            Sign Up
          </Link>
          <Link to="/signin" className="btn-secondary hover:bg-gray-700">
            Sign In
          </Link>
        </div>
        <div className="flex justify-center mb-12 text-lg">
          {renderFeature('Premium Nutrition', FaBone)}
          {renderFeature('Loving Care', FaHeart)}
          {renderFeature('Pet Diaries', FaPencilAlt)}
          {renderFeature('Appointment Scheduling', FaCalendarAlt)}
          {/* Add more feature components as needed */}
        </div>
        <div className="text-sm opacity-80">
          © 2024 Pets Care System. All rights reserved.
        </div>
      </div>
    </div>
  );
};

const renderFeature = (text, Icon) => (
  <div className="flex flex-col items-center mx-4">
    <Icon className="text-3xl mb-2" />
    <p className="text-sm">{text}</p>
  </div>
);

export default LandingPage;
