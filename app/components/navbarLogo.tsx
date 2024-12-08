'use client';

import { useRouter } from 'next/navigation';
import { useThemeMode } from '../layout'; // Pastikan konteks tema diimpor
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';

export default function Navbar() {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useThemeMode();

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <nav
      className="sticky top-0 z-1000"
      style={{
        backgroundColor: isDarkMode
          ? 'rgba(18, 18, 18, 0.5)' // Transparansi untuk dark mode
          : 'rgba(255, 255, 255, 0.5)', // Transparansi untuk light mode
        backdropFilter: 'blur(10px)', // Efek blur di belakang navbar
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
        color: isDarkMode ? 'white' : 'black',
      }}
    >
      <div className="container mx-auto flex justify-between items-center ">
        {/* Home Icon on the left */}
        {/* <div className="flex items-center">
          <HomeIcon
            onClick={handleHomeClick}
            className="cursor-pointer"
            fontSize="large"
            style={{
              color: isDarkMode ? '#ffffff' : '#000000',
              transition: 'color 0.3s ease',
            }}
          />
        </div> */}

        {/* Logo in the center */}
        <div className="transform -translate-x-1/2">
          <img
            src={isDarkMode ? '/logoNew.png' : '/logoNew.png'} // Gunakan logo berbeda untuk dark mode jika tersedia
            alt="Logo"
            className="h-12 w-15"
          />
        </div>

        {/* Dark mode toggle button on the right */}
        <div>
          <IconButton
            onClick={toggleDarkMode}
            sx={{
              color: isDarkMode ? '#ffffff' : '#000000',
              transition: 'color 0.3s ease',
            }}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </IconButton>
        </div>
      </div>
    </nav>
  );
}
