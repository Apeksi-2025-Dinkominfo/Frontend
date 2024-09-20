"use client";
import LandingPage from './components/landing';
import NavLogo from './components/navbarLogo';
import Surabaya from './components/sapaSurabaya';
import Hotel from './components/hotel';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <>
      <NavLogo />
      
      {/* Adjusted margin-top for LandingPage */}
      <Box sx={{ mt: { xs: 2, md: 4 } }}> 
        <LandingPage />
      </Box>
      
      {/* Adjusted margin-top for Surabaya */}
      <Box sx={{ mt: { xs: 4, md: 6 } }}>
        <Surabaya />
      </Box>

      {/* Adjusted margin-top for Hotel */}
      <Box sx={{ mt: { xs: 250, md: 60 } }}>
        <Hotel />
      </Box>
    </>
  );
}
