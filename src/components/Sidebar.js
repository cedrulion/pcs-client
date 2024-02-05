import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes, FaPaw, FaUser, FaSignOutAlt, FaPlus, FaCogs ,FaCheck ,FaWrench} from 'react-icons/fa';
import axios from 'axios';

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const[userRole,setUserRole] =useState(null);

  const handleItemClick = (path) => {
    navigate(path);
    // Close the sidebar when an item is clicked
    onClose();
  };
  useEffect(() => {
    // Fetch user data based on the token
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('Token');
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserRole(response.data.data.user.role );
 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  console.log("role",userRole);
    
  return (
    <>
      <div className="fixed top-0 bottom-0 rounded-lg w-1/8  bg-gradient-to-r from-teal-800  to-gray-500 text-white">
        <div className="flex justify-between items-center mt-20">
          <FaPaw className="text-9xl" />
          <h1 className="text-6xl">PCS</h1>
          <FaTimes onClick={onClose} className="cursor-pointer text-2xl mt-0" />
        </div>
        {userRole && userRole =="user" && (
            <>
        <ul className="pt-9 space-y-8 text-3xl mt-5">
          
          <li className='mt-auto p-2'>
            <Link
              to="/dashboard/PetsPage"
              onClick={() => handleItemClick('/dashboard/PetsPage')}
              className="flex items-center space-x-2 p-2 rounded-md transition-colors hover:bg-gray-800"
            >
              <FaCogs className="mr-2" />
              PETS
            </Link>
          </li>
          <li className='mt-auto p-2'>
            <Link
              to="/dashboard/appointment"
              onClick={() => handleItemClick('/dashboard/appointment')}
              className="flex items-center space-x-2 p-2 rounded-md transition-colors hover:bg-gray-800"
            >
                <FaPlus className="mr-2" />
              Appointment
            </Link>
          </li>
          <li className='mt-auto p-2'>
            <Link
              to="/dashboard/myappointment"
              onClick={() => handleItemClick('/dashboard/myappointment')}
              className="flex items-center space-x-2 p-2 rounded-md transition-colors hover:bg-gray-800"
            >
                <FaCheck className="mr-2" />
              Myappointment
            </Link>
          </li>
          </ul>
          </>
          ) }
          {userRole && userRole !=="user" && (
            <>
            <ul className="pt-9 space-y-8 text-3xl mt-5">
            <li className='mt-auto p-4'>
            <Link
              to="/dashboard/allappointment"
              onClick={() => handleItemClick('/dashboard/allappointment')}
              className="flex items-center space-x-5 p-2 rounded-md transition-colors hover:bg-gray-800"
            >
              <FaWrench className="mr-2" />
              MANAGE APPOINTMENTS
            </Link>
          </li>
            <li className='mt-auto p-4'>
            <Link
              to="/dashboard/services"
              onClick={() => handleItemClick('/dashboard/services')}
              className="flex items-center space-x-5 p-2 rounded-md transition-colors hover:bg-gray-800"
            >
              <FaWrench className="mr-2" />
              Services
            </Link>
          </li>

          <li className='mt-auto p-2'>
            {/* Dropdown for Clients and Staff */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 p-2 rounded-md transition-colors hover:bg-gray-800 focus:outline-none"
              >
                <FaUser className="mr-2" />
                System User
              </button>
              {isOpen && (
                <div className="absolute z-10 top-full left-0 mt-2 bg-gray-700 rounded-md shadow-lg">
                  <Link
                    to="/dashboard/client"
                    onClick={() => handleItemClick('/dashboard/client')}
                    className="block px-4 py-2 text-white hover:bg-gray-600"
                  >
                    Our Clients
                  </Link>
                  <Link
                    to="/dashboard/staff"
                    onClick={() => handleItemClick('/dashboard/staff')}
                    className="block px-4 py-2 text-white hover:bg-gray-600"
                  >
                    Staff
                  </Link>
                </div>
              )}
            </div>
          </li>
          </ul>
          </>
          ) }
        
        
      </div>
    </>
  );
};

export default Sidebar;