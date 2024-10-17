import Image from 'next/image';
import apeksiLogo from '../../public/apeksi.png'; // Sesuaikan path jika diperlukan

export default function CardSejarah() {
  return (
    <div className="flex flex-col md:flex-row items-stretch gap-6 mt-10 px-4 md:px-10 lg:px-20">
      {/* Left Section sebagai Card Terpisah */}
      <div className="bg-[#78B7D0] text-white p-6 rounded-3xl shadow-lg md:w-1/2 flex flex-col">
        <h2 className="text-3xl font-bold mb-4">
          Sejarah Asosiasi Pemerintah <br />Kota Seluruh Indonesia
        </h2>
        <ul className="space-y-4 text-sm flex-grow">
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

      {/* Right Section */}
      <div className="flex flex-col md:w-1/2 items-center space-y-6 justify-between">
        {/* Gambar yang lebih besar */}
        <div className="bg-[#E4E4E4] p-4 rounded-xl shadow-md w-full flex justify-center">
          <Image
            src={apeksiLogo}
            alt="Apeksi Logo"
            width={400}
            height={200}
            className="object-contain"
          />
        </div>

        {/* Grid untuk Statistik */}
        <div className="bg-white p-7 rounded-xl shadow-md w-full grid grid-cols-2 gap-2 md:gap-4 flex-grow">
          <div className="bg-[#F3F4F6] rounded-lg p-2 md:p-4 text-center flex flex-col items-center justify-center">
            <p className="text-2xl md:text-3xl font-bold">34</p>
            <p className="text-sm md:text-lg">Total Provinsi</p>
          </div>
          <div className="bg-[#F3F4F6] rounded-lg p-2 md:p-4 text-center flex flex-col items-center justify-center">
            <p className="text-2xl md:text-3xl font-bold">98</p>
            <p className="text-sm md:text-lg">Total Kota</p>
          </div>
          <div className="bg-[#F3F4F6] rounded-lg p-2 md:p-4 text-center flex flex-col items-center justify-center">
            <p className="text-2xl md:text-3xl font-bold">416</p>
            <p className="text-sm md:text-lg">Total Kabupaten</p>
          </div>
          <div className="bg-[#F3F4F6] rounded-lg p-2 md:p-4 text-center flex flex-col items-center justify-center">
            <p className="text-2xl md:text-3xl font-bold">7.094</p>
            <p className="text-sm md:text-lg">Total Kecamatan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
