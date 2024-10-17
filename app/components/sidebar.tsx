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
    <div className="flex">
      {/* Button to toggle sidebar on mobile */}
      <IconButton
        onClick={toggleSidebar}
        className="md:hidden text-white fixed top-4 left-4 z-50"
        aria-label="Toggle Sidebar"
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white p-22 fixed top-0 left-0 h-screen md:h-auto md:relative w-64 md:block transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
        style={{ maxHeight: 'calc(100vh - 80px)' }} // Adjust to prevent overflow beyond header/footer
      >
        {/* Close Button for Sidebar */}
        <IconButton
          onClick={toggleSidebar}
          className="md:hidden text-white mb-4"
          aria-label="Close Sidebar"
        >
          <CloseIcon />
        </IconButton>

        <h2 className="text-lg font-bold mt-20">MANAGEMENT MUNAS</h2>
        <ul className="space-y-4">
          <li>
            <Link href="/admin">
              <div
                className={`sidebar-link px-4 py-2 rounded cursor-pointer ${
                  activeButton === 1
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => handleItemClick(1)}
              >
                Dashboard
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/dataregistrasi">
              <div
                className={`sidebar-link px-4 py-2 rounded cursor-pointer ${
                  activeButton === 2
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => handleItemClick(2)}
              >
                Data Registrasi
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/addnews">
              <div
                className={`sidebar-link px-4 py-2 rounded cursor-pointer ${
                  activeButton === 3
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => handleItemClick(3)}
              >
                Add News
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/addgaleri">
              <div
                className={`sidebar-link px-4 py-2 rounded cursor-pointer ${
                  activeButton === 4
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => handleItemClick(4)}
              >
                Add Gallery
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:ml-64">
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
