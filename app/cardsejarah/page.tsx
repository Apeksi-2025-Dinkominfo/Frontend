"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import logoNew from '../../public/logoNew.png';

const dataSejarah = [
  { 
    tahun: "13 - 24 Juni 2000",
    deskripsi: "Rapat Panitia Kerja Walikota menyusun proposal yang diserahkan pada pertemuan para Walikota yang diselenggarakan pada akhir Juni.",
  },
  {
    tahun: "22 - 23 Juni 2000",
    deskripsi: "Munas I di Surabaya, menetapkan AD/ART Apeksi. Wali Kota Surabaya, Sunarto Sumoprawiro, terpilih sebagai Ketua Dewan Pengurus pertama.",
  },
  // Tambahkan data lainnya...
];

export default function CardSejarah() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : dataSejarah.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < dataSejarah.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="flex justify-center mt-10 px-4 md:px-10 lg:px-20 relative">
      {/* Button Kiri */}
      <button
        onClick={handlePrevious}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600"
      >
        &lt;
      </button>

      {/* Card Sejarah */}
      <div className="relative bg-gradient-to-br from-[#78B7D0] to-[#4A90E2] text-white p-10 rounded-3xl shadow-2xl w-full lg:w-3/4 xl:w-2/3 min-h-[450px] flex flex-col items-start">
        
        {/* Logo */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
          <Image
            src={logoNew}
            alt="Logo Apeksi"
            layout="fill"
            className="object-contain scale-109 md:scale-117 lg:scale-120 opacity-20"
            style={{ transformOrigin: 'top right' }}
          />
        </div>

        {/* Konten Sejarah */}
        <h2 className="text-3xl font-bold mb-4 text-left leading-tight z-10">
          {dataSejarah[currentIndex].tahun}
        </h2>
        <p className="text-sm md:text-base text-left z-10">
          {dataSejarah[currentIndex].deskripsi}
        </p>

        {/* Sumber */}
        <div className="mt-8 w-full text-center md:text-left z-10">
          <a
            href="https://apeksi.id/profil/"
            className="text-white underline hover:text-gray-200 transition duration-200"
          >
            Sumber: apeksi.id/profil/
          </a>
        </div>
      </div>

      {/* Button Kanan */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600"
      >
        &gt;
      </button>
    </div>
  );
}
