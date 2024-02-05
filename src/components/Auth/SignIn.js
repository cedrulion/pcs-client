import React, { useState, useEffect } from 'react';
import { FaPaw,  FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
      if (response.data && response.data.user && response.data.user.email) {
        localStorage.setItem('Profile', JSON.stringify(response.data));
      }
      const { token } = response.data;
      localStorage.setItem('Token', token);
      console.log('Login successful! Token:', token);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center gap-9 justify-center bg-gradient-to-r from-gray-600 to-teal-800">
       <div className="text-5xl font-bold mb-4 text-white ">
          <FaPaw className="inline-block mr-2 text-8xl" />
         <h2> Pets Care System </h2> 
        </div>
      <div className="bg-white p-8  rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Sign In</h2>
        <form onSubmit={handleSubmit} >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              <FaEnvelope className="inline-block mr-2" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='enter your email...'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              <FaLock className="inline-block mr-2" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder='enter your password...'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="input-field pr-3"
                required
              />
              <div
                className="absolute text-3xl top-1 right-9 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
  <button
    type="submit"
    className="text-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
  >
    Sign In
  </button>
</div>

        </form>
      </div>
    </div>
  );
}

export default SignIn;
