'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/register');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 overflow-hidden">
      <div className="relative max-w-5x3 w-full px-6 lg:px-12 py-20 text-center rounded-3xl shadow-lg bg-white">
        
        {/* Gambar utama di bagian atas */}
        <div className="flex justify-center mb-8">
          <img
            src="/lndingp.png"  // Sesuaikan path gambar jika berbeda
            alt="Selamat Datang di Surabaya"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="mt-8">
          <button
            onClick={handleButtonClick}
            className="bg-[#78B7D0] text-white px-6 py-3 mb-19 rounded-full shadow-md hover:bg-[#67A6BE] transition duration-300"
          >
            Registrasi Acara
          </button>
        </div>
      </div>
    </div>
  );
}
