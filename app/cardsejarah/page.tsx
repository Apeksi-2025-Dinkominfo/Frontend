import React from 'react';
import Image from 'next/image';
import apeksiLogo from '../../public/apeksi.png'; // Pastikan path ke gambar benar

export default function CardSejarah() {
  return (
    <div className="flex justify-center mt-10 px-4 md:px-10 lg:px-20">
      {/* Card Sejarah sebagai Persegi Panjang */}
      <div className="bg-[#78B7D0] text-white p-8 rounded-3xl shadow-lg w-full lg:w-3/4 xl:w-2/3 min-h-[400px] flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Sejarah Asosiasi Pemerintah <br />Kota Seluruh Indonesia
        </h2>
        <ul className="space-y-4 text-sm flex-grow text-left w-full">
          <li>
            <strong>13 - 24 Juni 2000</strong>: Rapat Panitia Kerja Walikota menyusun proposal yang diserahkan pada pertemuan para Walikota yang diselenggarakan pada akhir Juni.
          </li>
          <li>
            <strong>22 - 23 Juni 2000</strong>: Musyawarah Nasional (Munas) I digelar di Kota Surabaya dan menyelesaikan serta mengesahkan Anggaran Dasar dan Anggaran Rumah Tangga Apeksi. Wali Kota Surabaya, Sunarto Sumoprawiro, terpilih menjadi Ketua Dewan Pengurus periode 2000 - 2004 dan menjadi wakil Asosiasi Pemerintah Daerah di Dewan Pertimbangan Otonomi Daerah (DPOD).
          </li>
          <li>
            <strong>31 Juli - 1 Agustus 2000</strong>: Munas II di Surabaya memutuskan Wali Kota Tarakan, Jusuf Serang Kasim, menjadi Ketua Dewan Pengurus periode 2004 - 2008 menggantikan Sunarto Sumoprawiro.
          </li>
          <li>
            <strong>22 - 24 Juli 2008</strong>: Munas III digelar di Surakarta dan memutuskan Wali Kota Palembang, Eddy Santana Putra, menjadi Ketua Dewan Pengurus periode 2008 - 2012.
          </li>
          
          {/* Logo Apeksi di tengah */}
          <div className="flex justify-center my-4">
            <Image
              src={apeksiLogo}
              alt="Apeksi Logo"
              width={400} // Sesuaikan ukuran logo sesuai kebutuhan
              height={500} // Sesuaikan ukuran logo sesuai kebutuhan
              className="object-contain" // Menjaga proporsi gambar
            />
          </div>

          <li>
            <strong>30 Mei - 2 Juni 2012</strong>: Munas IV digelar di Manado dan memutuskan Wali Kota Manado, GS Vicky Lumentut, menjadi Ketua Dewan Pengurus untuk periode 2012 - 2016.
          </li>
          <li>
            <strong>26 - 28 Juli 2016</strong>: Munas V digelar di Jambi. Wali Kota Tangerang Selatan, Airin Rachmi Diany, menjadi Ketua Dewan Pengurus 2016 - 2020.
          </li>
          <li>
            <strong>11 Februari 2021</strong>: Munas VI digelar di Jakarta. Wali Kota Bogor, Bima Arya Sugiarto, terpilih menjadi Ketua Dewan Pengurus 2021 - 2024.
          </li>
          <li>
            <strong>14 - 15 Desember 2023</strong>: Munaslub (Musyawarah Nasional Luar Biasa) VII digelar di Bogor untuk keberlanjutan kepengurusan dengan berakhirnya masa jabatan sesuai Undang-Undang terkait Pilkada. Wali Kota Surabaya, Eri Cahyadi, terpilih menjadi Ketua Dewan Pengurus untuk periode 2023 - 2025.
          </li>
          <li>
            <strong>2025</strong>: Munas VIII Apeksi akan digelar di Kota Surabaya pada tahun 2025. Penetapan Surabaya sebagai tuan rumah diputuskan dalam Rakernas XVII Apeksi 2024 yang digelar pada 1 - 6 Juni 2024 di Kota Balikpapan.
          </li>
        </ul>
        <div className="mt-6">
          <a
            href="https://apeksi.id/profil/"
            className="text-white underline hover:text-gray-200"
          >
            Sumber: apeksi.id/profil/
          </a>
        </div>
      </div>
    </div>
  );
}
