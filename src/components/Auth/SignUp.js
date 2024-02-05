import React, { useState } from 'react';
import { FaPaw, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname:'',
    lastname:'',
    username: '',
    phonenumber:'',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      console.log('Signup successful');
      alert('Signup successful!');
      navigate('/signin');
    } catch (error) {
      console.error('Signup failed', error);
      alert('Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-600 to-teal-800">
      <div className="text-5xl mr-9 font-bold mb-4 text-white ">
          <FaPaw className="inline-block mr-2 text-8xl" />
         <h2> Pets Care System </h2> 
        </div>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-gray-700 text-sm font-bold mb-2">
              <FaUser className="inline-block mr-2" />
              Firstname
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder='enter firstname...'
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">
              <FaUser className="inline-block mr-2" />
              Lastname
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder='enter lastname...'
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              <FaUser className="inline-block mr-2" />
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder='enter username...'
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phonenumber" className="block text-gray-700 text-sm font-bold mb-2">
              <FaUser className="inline-block mr-2" />
              Phonenumber
            </label>
            <input
              type="text"
              id="phonenumber"
              name="phonenumber"
              placeholder='enter phone number'
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              <FaEnvelope className="inline-block mr-2" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='enter email...'
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              <FaLock className="inline-block mr-2" />
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='enter password...'
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          <div className="flex items-center justify-center">
  <button
    type="submit"
    className="text-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
  >
    Signup
  </button>
</div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
