import React from 'react';
import Image from 'next/image';
import logoNew from '../../public/logoNew.png';

export default function CardSejarah() {
  return (
    <div className="flex justify-center mt-10 px-4 md:px-10 lg:px-20">
      {/* Card Sejarah dengan Bentuk Huruf "L" */}
      <div className="relative bg-gradient-to-br from-[#78B7D0] to-[#4A90E2] text-white p-10 rounded-3xl shadow-2xl w-full lg:w-3/4 xl:w-2/3 min-h-[450px] flex flex-col items-start">
        
        {/* Logo di Kanan Atas yang Menyatu dengan Card */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
          <Image
            src={logoNew}
            alt="Logo Apeksi"
            layout="fill"
            className="object-contain scale-109 md:scale-117 lg:scale-120 opacity-20"
            style={{ transformOrigin: 'top right' }}
          />
        </div>

        {/* Judul dan Garis Pembatas */}
        <h2 className="text-3xl font-bold mb-4 text-left leading-tight z-10">
          Sejarah Asosiasi Pemerintah <br /> Kota Seluruh Indonesia
        </h2>
        <div className="w-16 h-1 bg-white my-2 rounded-full z-10"></div>

        {/* Konten dalam Bentuk "L" */}
        <div className="flex flex-col md:flex-row z-10">
          
          {/* Kolom Kiri (Bagian Vertikal dari "L") */}
          <ul className="space-y-4 text-sm md:text-base text-left w-full md:w-1/2 list-disc list-inside pr-4 md:pr-8">
            <li>
              <strong>13 - 24 Juni 2000</strong>: Rapat Panitia Kerja Walikota menyusun proposal yang diserahkan pada pertemuan para Walikota yang diselenggarakan pada akhir Juni.
            </li>
            <li>
              <strong>22 - 23 Juni 2000</strong>: Munas I di Surabaya, menetapkan AD/ART Apeksi. Wali Kota Surabaya, Sunarto Sumoprawiro, terpilih sebagai Ketua Dewan Pengurus pertama.
            </li>
            <li>
              <strong>31 Juli - 1 Agustus 2000</strong>: Munas II di Surabaya memilih Wali Kota Tarakan, Jusuf Serang Kasim, sebagai Ketua Dewan Pengurus periode 2004 - 2008.
            </li>
            <li>
              <strong>22 - 24 Juli 2008</strong>: Munas III di Surakarta memilih Wali Kota Palembang, Eddy Santana Putra, sebagai Ketua Dewan Pengurus periode 2008 - 2012.
            </li>
          </ul>

          {/* Kolom Kanan (Bagian Horizontal dari "L") */}
          <ul className="space-y-4 text-sm md:text-base text-left w-full md:w-1/2 list-disc list-inside mt-4 md:mt-0 md:pl-8">
            <li>
              <strong>30 Mei - 2 Juni 2012</strong>: Munas IV di Manado memilih Wali Kota Manado, GS Vicky Lumentut, untuk periode 2012 - 2016.
            </li>
            <li>
              <strong>26 - 28 Juli 2016</strong>: Munas V di Jambi menunjuk Wali Kota Tangerang Selatan, Airin Rachmi Diany, sebagai Ketua Dewan Pengurus 2016 - 2020.
            </li>
            <li>
              <strong>11 Februari 2021</strong>: Munas VI di Jakarta memilih Wali Kota Bogor, Bima Arya Sugiarto, sebagai Ketua Dewan Pengurus 2021 - 2024.
            </li>
            <li>
              <strong>14 - 15 Desember 2023</strong>: Munaslub VII di Bogor memilih Wali Kota Surabaya, Eri Cahyadi, sebagai Ketua Dewan Pengurus untuk 2023 - 2025.
            </li>
            <li>
              <strong>2025</strong>: Munas VIII akan diadakan di Kota Surabaya.
            </li>
          </ul>
        </div>

        {/* Sumber dengan Animasi Hover */}
        <div className="mt-8 w-full text-center md:text-left z-10">
          <a
            href="https://apeksi.id/profil/"
            className="text-white underline hover:text-gray-200 transition duration-200"
          >
            Sumber: apeksi.id/profil/
          </a>
        </div>
      </div>
    </div>
  );
}
