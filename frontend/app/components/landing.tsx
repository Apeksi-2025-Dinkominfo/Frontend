'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/register');
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen bg-gray-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center z-0"
        aria-hidden="true"
      ></div>
      <div className="relative z-20 max-w-5xl px-6 lg:px-12 ml-6">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-body">
          SELAMAT DATANG <br />
          MUNAS VII ASOSIASI <br />
          PEMERINTAH KOTA <br />
          SELURUH INDONESIA <br />
          DI SURABAYA
        </h1>
        <p className="text-lg text-light font-semibold">25 – 27 Mei 2025</p>
        <p className="mt-9 text-second">
        Dari Surabaya Untuk Indonesia!
        </p>
        <div className="mt-8">
        <button
            onClick={handleButtonClick}
            className="relative z-20 bg-[#78B7D0] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#67A6BE] transition duration-300"
          >
            Registrasi Acara
          </button>
        </div>
      </div>
      <div className="relative z-10 mt-1 lg:mt-[-120px] lg:absolute lg:right-50">
        <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
          <img
            src="/PakEri.png"
            alt="Eri Cahyadi, Walikota Surabaya"
            className="object-contain w-full max-w-[80%] sm:max-w-[70%] md:max-w-[50%] lg:max-w-[32%] relative z-10"
            style={{ height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
}
