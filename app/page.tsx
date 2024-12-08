import LandingPage from './components/landing';
import CountdownComponent from './components/coutdown';
import Sejarah from './components/CardSejarah';
import Surabaya from './components/sapaSurabaya';
import Hotel from './components/hotel';
import WalikotaVideo from './components/walkitvid';
import Jadwal from './components/jadwal';
import Walikota from './components/organizationMember';
import Berita from './components/Berita';
import Galeri from './components/gallery';
import { Box, Typography } from '@mui/material';
import Image from 'next/image'; 
import React from 'react';

export const metadata = {
  title: 'Apeksi Rakernas Surabaya 2025',
  description: 'Your site description.',
};

export default function Home() {
  return (
    <>
    
      <Box id="home">
        <LandingPage />     
      </Box>
      <Box
        sx={{
          position: 'absolute', // Posisi absolut
          top: '85%', // Berada di atas layar
          left: '50%', // Tengah horizontal
          transform: 'translateX(-50%)', // Menyeimbangkan posisi agar benar-benar di tengah
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '8px', // Opsional: Tambahkan padding agar terlihat lebih rapi
          zIndex: 30, // Pastikan di depan elemen lain
        }}
      >
        <CountdownComponent />
      </Box>

      <Box sx={{ mt: { xs: 2, md: 20 } }} id="sejarah">
        <Sejarah />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: { xs: 2, md: 10 },
        }}
      >
        <Box sx={{ maxWidth: '40%', width: '50%' }}>
          <Image
            src="/kata.png" // Replace with your image path
            alt="Centered Image"
            width={400}  // Adjust width as needed
            height={500} // Adjust height as needed
            layout="responsive"
          />
        </Box>
      </Box>

     
      <Box sx={{ mt: { md: 20 } }}>
        <Walikota />
      </Box>
      

      <Box sx={{ mt: { xs: 2, md: 20 } }}>
        <Surabaya />
      </Box>

      <Box sx={{ mt: { xs: 50, md: 10 } }}>
        <Hotel />
      </Box>

      <Box sx={{ mt: { xs: 4, md: 20 } }}>
        <WalikotaVideo />
      </Box>

      <Box
        sx={{
          mt: { xs: 20, md: 25 },
          zIndex: 1,
          position: 'relative',
        }}
        id="jadwal"
      >
        <Jadwal />
      </Box>

      <Box sx={{ mt: { xs: 10, md: 20 } }}>
        <Berita />
      </Box>

      <Box sx={{ mt: { xs: 4, md: 20 } }} id="gallery">
        <Galeri />
      </Box>
    </>
  );
}
