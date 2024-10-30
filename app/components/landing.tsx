'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/register');
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-50 overflow-hidden">
      {/* Fullscreen looping video */}
      <video
        src="/profilesby.mp4"  // Sesuaikan path video jika berbeda
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay content */}
      <div className="relative z-10 text-center p-8 rounded-3xl shadow-lg max-w-5xl mx-auto">
        {/* Replace text with an image */}
        <img
          src="/landingimg.png" // Sesuaikan path gambar jika berbeda
          alt="Selamat datang di Surabaya"
          className="w-full h-auto rounded-lg"
        />
        <button
          onClick={handleButtonClick}
          className="bg-[#78B7D0] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#67A6BE] transition duration-300"
        >
          Daftar disini!
        </button>
      </div>
    </div>
  );
}
