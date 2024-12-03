import Image from 'next/image';
import Link from 'next/link'; // Import the Link component from Next.js
import batikImage from '../../public/sjrh.png';
import apeksiLogo from '../../public/logoNew.png';

export default function CardSejarah() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 px-19 py-3 rounded-lg shadow-md md:mx-10 mt-10">
      <div className="hidden md:block md:w-1/3"> 
        <Image
          src={batikImage}
          alt="Batik"
          width={205}
          height={564}
          className="object-contain"
        />
      </div>
      <div className="md:w-6/3 text-left font-poppins md:text-left mb-10 md:mb-15">
        <h1 className="text-518x132 text-5xl ml-12 font-Poppins font-bold text-[#16325B] mb-10 mt-10">
          Sejarah <br /> Asosiasi Pemerintah <br /> Kota Seluruh Indonesia
        </h1>
        <p className="md:w-4/6 mb-15 font-Poppins font-bold text-410x375 text-l ml-12 text-[#78B7D0]">
          25 Mei 2000
          Asosiasi Pemerintah Kota Seluruh Indonesia berdiri sesuai Undang- Undang No.22 Tahun 1999 tentang Pemerintahan Daerah dan Keputusan Presiden No. 49 Tahun 2000 tentang Pembentukan Dewan Pertimbangan Otonomi Daerah (DPOD)
          <br/> Panitia Kerja Walikota dibentuk guna mempertimbangkan dan membuat rekomendasi tentang pembentukan Asosiasi Kota-Kota dan diberi nama Asosiasi Pemerintah Kota Seluruh Indonesia (Apeksi) atau Association of Indonesia Municipalities (AIM)
        </p>
        <div className="ml-12">
          <Link href="/cardsejarah" legacyBehavior>
            <a className="mb-20 text-[#78B7D0] font-semibold hover:underline">
              Lihat Selengkapnya....
            </a>
          </Link>
        </div>
      </div>
      <div className="md:w-7/3 mt-15"> 
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
