import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaBars, FaUser, FaSignOutAlt } from 'react-icons/fa';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex h-screen">
      {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}

      <div className={`flex-grow ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="fixed top-0 right-0 w-full rounded-lg bg-gradient-to-r from-teal-800 to-gray-600 text-teal-100">
          <ul className="text-2xl flex justify-end mx">
            <li>
              <div className="relative mt-3">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <FaUser className="ml-9" />
                  <span className="hover:text-white">User Actions</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 top-full right-0 mt-2 bg-gray-700 rounded-md shadow-lg">
                    <Link
                      to="/dashboard/profile"
                      onClick={() => handleItemClick('/dashboard/profile')}
                      className="block px-4 py-2 text-white hover:bg-gray-600"
                    >
                      View Profile
                    </Link>
                    <Link
                      to="/signin"
                      onClick={() => handleItemClick('/signin')}
                      className="block px-4 py-2 text-white hover:bg-gray-600"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </li>
          </ul>
          <button onClick={toggleSidebar} style={{ fontSize: '24px', marginLeft: '10px' }}>
            <FaBars />
          </button>
        </div>
        <div className="mx-8 my-4 p-6 border rounded-lg bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
