import Link from 'next/link';
import React, { useState } from 'react';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface SidebarProps {
  activeButton: number;
  onButtonClick: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeButton, onButtonClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (id: number) => {
    onButtonClick(id);
    setIsOpen(false); // Close the sidebar when an item is clicked
  };

  return (
    <div className="relative">
      {/* Button to toggle sidebar on mobile */}
      <IconButton
        onClick={toggleSidebar}
        className="md:hidden text-white" // Ensures icon is white
        aria-label="Toggle Sidebar"
      >
        <MenuIcon /> {/* MUI Hamburger Icon */}
      </IconButton>

      {/* Sidebar */}
      <div
        className={`sidebar bg-gray-800 text-white h-screen p-4 absolute md:relative transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Close Button for Sidebar */}
        <IconButton
          onClick={toggleSidebar}
          className="md:hidden text-white mb-4" // Ensures close button is white
          aria-label="Close Sidebar"
        >
          <CloseIcon /> {/* MUI Close Icon */}
        </IconButton>
        
        <h2 className="text-lg font-bold mt-20">MANAGEMENT MUNAS</h2>
        <ul className="space-y-4">
          <li>
            <Link href="/admin">
              <div
                className={`sidebar-link px-4 py-2 rounded cursor-pointer ${activeButton === 1 ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                onClick={() => handleItemClick(1)} // Call handleItemClick here
              >
                Dashboard
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/dataregistrasi">
              <div
                className={`sidebar-link px-4 py-2 rounded cursor-pointer ${activeButton === 2 ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                onClick={() => handleItemClick(2)} // Call handleItemClick here
              >
                Data Registrasi
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/addnews">
              <div
                className={`sidebar-link px-4 py-2 rounded cursor-pointer ${activeButton === 3 ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                onClick={() => handleItemClick(3)} // Call handleItemClick here
              >
                Add News
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/addgaleri">
              <div
                className={`sidebar-link px-4 py-2 rounded cursor-pointer ${activeButton === 4 ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                onClick={() => handleItemClick(4)} // Call handleItemClick here
              >
                Add Gallery
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
