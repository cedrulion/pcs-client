// DashboardLayout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Usidebar from './Usidebar';
import { FaBars } from 'react-icons/fa';

const UdashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {isSidebarOpen && <Usidebar onClose={toggleSidebar} />}
      <div className={`flex-grow ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <button onClick={toggleSidebar} style={{ fontSize: '24px' }}>
          <FaBars />
        </button>
       
        <Outlet />
      </div>
    </div>
  );
};

export default UdashboardLayout;
