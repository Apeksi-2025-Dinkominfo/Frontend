// pages/index.js
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-12">
      {/* Bagian Logo dan Teks */}
      <div className="flex items-center space-x-6 mb-5">
        {/* Logo */}
        <div className="relative w-28 h-28"> {/* Ukuran gambar logo diperbesar */}
          <Image
            src="/wargaku.png" // Ganti dengan path logo Anda
            alt="Logo Surabaya"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* Teks */}
        <h1 className="text-6xl font-semibold text-[#FF8D00]">
          Dari Surabaya untuk <br />
          <span className="text-[#FF8D00]">Indonesia Maju</span>
        </h1>
      </div>

      {/* Gambar Peserta Munas */}
     
        <Image
          src="/PesertaMunas.png" // Ganti dengan path gambar Anda
          alt="Foto Walikota"
          width={800} // Lebar gambar diperbesar
          height={600} // Tinggi gambar diperbesar
          layout="responsive"
        />
    </div>
  );
}
