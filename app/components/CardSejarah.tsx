import Image from 'next/image';
import batikImage from '../../public/batik.png.png'; // Import image
import apeksiLogo from '../../public/apeksi.png'; // Import logo

export default function CardSejarah() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 px-19 py-3 rounded-lg shadow-md md:mx-10 mt-10"> {/* Added margin at the top */}
      {/* Batik Image */}
      <div className="hidden md:block md:w-1/3"> {/* Adjusted width to allow space */}
        <Image
          src={batikImage}
          alt="Batik"
          width={205}
          height={564}
          className="object-contain"
        />
      </div>

      {/* Text Section */}
      <div className="md:w-6/3 text-left font-poppins md:text-left mb-3 md:mb-15">
        <h1 className="text-518x132 text-5xl font-Poppins font-bold text-[#16325B] mb-10 mt-10">
          Sejarah <br /> Asosiasi Pemerintah <br /> Kota Seluruh Indonesia
        </h1>
        <p className="md:w-4/6 mb-20 font-Poppins text-410x375 text-l text-[#78B7D0]">
          Ut eros dolor, tincidunt sed felis id, consectetur sagittis ante. Pellentesque habitant morbi tristique senectus.
          <br /><br />elementum. Nam vitae mi consectetur ex  felis. Nunc iaculis placerat tristique. Pellentesque ullamcorper ut metus in elementum. Nam vitae mi consectetur ex. felis.
        </p>
        <button className="mb-20 px-12 py-3 bg-[#78B7D0] text-white font-semibold rounded-full">
          We Are Surabaya Smart City!
        </button>
      </div>

      {/* Logo Image */}
      <div className="md:w-7/3 mt-15"> {/* Adjusted width for spacing */}
        <Image
          src={apeksiLogo}
          alt="Apeksi Logo"
          width={891}
          height={620}
          className="object-contain"
        />
      </div>
    </div>
  );
}
