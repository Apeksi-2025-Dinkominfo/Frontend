// app/page.tsx
import LandingPage from './components/landing';
import Sejarah from './components/CardSejarah';
import Surabaya from './components/sapaSurabaya';
import Hotel from './components/hotel';
import WalikotaVideo from './components/walkitvid';
import Jadwal from './components/jadwal';
import Berita from './components/Berita';
import Galeri from './components/gallery';
import { Box } from '@mui/material';

export const metadata = {
  title: 'Apeksi Rakernas Surabaya 2025',
  description: 'Your site description.',
};

export default function Home() {
  return (
    <>
      <Box sx={{ mt: { xs: 2, md: 4 } }}>
        <LandingPage />
      </Box>

    {/* Bagian Untuk foto Walikota */}

      <Box sx={{ mt: { xs: 2, md: 4 } }}>
        <Sejarah />
      </Box>

      <Box sx={{ mt: { xs: 4, md: 6 } }}>
        <Surabaya />
      </Box>

      <Box sx={{ mt: { xs: 250, md: 50 } }}>
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
      >
        <Jadwal />
      </Box>

      <Box sx={{ mt: { xs: 250, md: 50 } }}>
        <Berita />
      </Box>

      <Box sx={{ mt: { xs: 4, md: 20 } }}>
        <Galeri />
      </Box>
    </>
  );
}
