import Image from 'next/image';
import Link from 'next/link'; // Import the Link component from Next.js
import batikImage from '../../public/sjrh.png';
import apeksiLogo from '../../public/logoNew.png';

export default function CardSejarah() {
  return (
    <div className="flex flex-col justify-center self-center md:flex-row items-center bg-white p-6 py-3 rounded-lg shadow-md w-full mt-10">
      <div className="md:w-6/3 text-left mb-10 md:mb-15 w-5/6">
        <h1 className="text-5xl ml-12  font-semibold text-[#16325B] mb-10 mt-10">
          Sejarah <br /> Asosiasi Pemerintah <br /> Kota Seluruh Indonesia
        </h1>
        <p className="md:w-4/6 mb-15  text-l ml-12 text-[#126A22] mb-4">
          25 Mei 2000
          Asosiasi Pemerintah Kota Seluruh Indonesia berdiri sesuai Undang- Undang No.22 Tahun 1999 tentang Pemerintahan Daerah dan Keputusan Presiden No. 49 Tahun 2000 tentang Pembentukan Dewan Pertimbangan Otonomi Daerah (DPOD)<br/>
          <br /> Panitia Kerja Walikota dibentuk guna mempertimbangkan dan membuat rekomendasi tentang pembentukan Asosiasi Kota-Kota dan diberi nama Asosiasi Pemerintah Kota Seluruh Indonesia (Apeksi) atau Association of Indonesia Municipalities (AIM)
        </p>
        <div className="ml-12">
          <Link href="/cardsejarah" legacyBehavior>
            <button className="bg-[#023E74] text-[#fff] px-6 py-3 rounded-full shadow-md hover:bg-[#67A6BE] transition duration-300">
              Lihat Selengkapnya...
            </button>
          </Link>
        </div>
      </div>
      <div className="md:w-7/3 mt-15 pr-10">
        <Image
          src={apeksiLogo}
          alt="Apeksi Logo"
          width={1091}
          height={620}
          className="object-contain"
        />
      </div>
    </div>
  );
}
