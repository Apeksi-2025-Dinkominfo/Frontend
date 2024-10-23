import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';

const MobileNavbar = () => {
  const [value, setValue] = useState(0);
  const isMobile = useMediaQuery('(max-width:600px)'); // Show only on mobile screens

  if (!isMobile) return null; // Return null if it's not mobile view

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, zIndex: 1000 }}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        sx={{ backgroundColor: '#16325B' }}
      >
        <BottomNavigationAction
          label="Home"
          icon={
            <Link href="#home" passHref>
              <HomeIcon sx={{ color: '#D8EFD3' }} />
            </Link>
          }
          sx={{ color: '#fff', fontFamily: 'Poppins, sans-serif' }} // White text with Poppins font
        />

        <BottomNavigationAction
          label="Sejarah"
          icon={
            <Link href="#sejarah" passHref>
              <HistoryIcon sx={{ color: '#D8EFD3' }} />
            </Link>
          }
          sx={{ color: '#fff', fontFamily: 'Poppins, sans-serif' }} // White text with Poppins font
        />

        <BottomNavigationAction
          label="Jadwal"
          icon={
            <Link href="#jadwal" passHref>
              <ScheduleIcon sx={{ color: '#D8EFD3' }} />
            </Link>
          }
          sx={{ color: '#fff', fontFamily: 'Poppins, sans-serif' }} // White text with Poppins font
        />

        <BottomNavigationAction
          label="Agenda"
          icon={
            <Link href="#Agenda" passHref>
              <EventIcon sx={{ color: '#D8EFD3' }} />
            </Link>
          }
          sx={{ color: '#fff', fontFamily: 'Poppins, sans-serif' }} // White text with Poppins font
        />

        <BottomNavigationAction
          label="Gallery"
          icon={
            <Link href="#gallery" passHref>
              <PhotoLibraryIcon sx={{ color: '#D8EFD3' }} />
            </Link>
          }
          sx={{ color: '#fff', fontFamily: 'Poppins, sans-serif' }} // White text with Poppins font
        />
      </BottomNavigation>
    </Box>
  );
};

export default MobileNavbar;
