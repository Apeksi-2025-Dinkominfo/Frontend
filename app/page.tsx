import LandingPage from './components/landing';
import Sejarah from './components/CardSejarah';
import Surabaya from './components/sapaSurabaya';
import Hotel from './components/hotel';
import WalikotaVideo from './components/walkitvid';
import Jadwal from './components/jadwal';
import Agenda from './components/agenda';
import Berita from './components/Berita';
import Galeri from './components/gallery';
import { Box } from '@mui/material';
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

    {/* Bagian Untuk foto Walikota */}

    <Box
        sx={{
          mt: { xs: 2, md: 20 }, // Margin top untuk mobile (xs) dan desktop (md)
          display: 'flex',
          justifyContent: 'center', // Posisikan gambar di tengah
        }}
      >
        <Box sx={{ maxWidth: '80%', width: '100%' }}> {/* Maksimal 80% lebar layar */}
          <Image
            src="/PesertaMunas.png" // Ganti dengan path gambar kamu
            alt="Foto Walikota"
            width={600} // Set ukuran gambar
            height={400} // Set tinggi gambar
            layout="responsive" // Agar responsif
          />
        </Box>
      </Box>


      <Box sx={{ mt: { xs: 2, md: 20 } }} id="sejarah">
        <Sejarah />
      </Box>

      <Box sx={{ mt: { xs: 4, md: 6 } }}>
        <Surabaya />
      </Box>

      <Box sx={{ mt: { xs: 250, md: 95 } }}>
        <Hotel />
      </Box>

      <Box sx={{ mt: { xs: 4, md: 20 } }}>
        <WalikotaVideo />
      </Box>

      <Box
        sx={{
          mt: { xs: '-120px', md: '-100px' },
          zIndex: -1,
          position: 'relative',
        }}
        id="jadwal"
      >
        <Jadwal />
      </Box>

      <Box sx={{ mt: { xs: 250, md: 25 } }} id="Agenda">
        <Agenda />
      </Box>

      <Box sx={{ mt: { xs: 250, md: 20 } }}>
        <Berita />
      </Box>

      <Box sx={{ mt: { xs: 4, md: 20 } }} id="gallery">
        <Galeri />
      </Box>
    </>
  );
}
