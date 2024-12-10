'use client';


import CountdownComponent from './coutdown';
import { useRouter } from 'next/navigation';
import { useThemeMode } from '../layout'; // Pastikan konteks tema diimpor
import { IconButton } from '@mui/material'; // Pastikan IconButton diimpor

export default function LandingPage() {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useThemeMode(); // Mengambil konteks tema untuk dark mode

  const handleButtonClick = () => {
    router.push('/register');
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-50 overflow-hidden">
      {/* Navbar Transparan */}
      <div
        className="absolute top-0 left-0 w-full z-20 flex justify-between items-center px-6 py-4"
        style={{
          background: 'none', // Tidak ada latar belakang
          boxShadow: 'none', // Tidak ada bayangan
        }}
      >
        {/* Logo atau Judul */}
        <img
          src={isDarkMode ? '/logoNew.png' : '/logoNew.png'} // Gunakan logo berbeda untuk dark mode jika tersedia
          alt="Logo"
          className="h-12 w-15"
        />

        {/* Tombol Dark Mode */}
        <IconButton
          onClick={toggleDarkMode}
          sx={{
            backgroundColor:'white',
            color: isDarkMode ? '#ffffff' : '#000000',
            transition: 'color 0.3s ease',
          }}
        >
          {isDarkMode ? '🌙' : '☀️'}
        </IconButton>
      </div>

      {/* Fullscreen looping video */}
      <video
        src="/Surabaya.mp4" // Sesuaikan path video jika berbeda
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay content */}
      <div className="relative z-10 text-center p-8 rounded-3xl max-w-5xl mx-auto">
        <img
          src="/landingimg1.png" // Sesuaikan path gambar jika berbeda
          alt="Selamat datang di Surabaya"
          className="w-full h-auto rounded-lg"
        />
        <button
          onClick={handleButtonClick}
          className="bg-[#fff] text-[#16325B] px-6 py-3 rounded-full shadow-md hover:bg-[#67A6BE] transition duration-300"
        >
          Daftar disini!
        </button>
      </div>
    </div>
    
  );
}
