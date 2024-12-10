import Image from 'next/image'
import { managementBoard, supervisoryBoard, regionalCommissioners } from '.././utils/walikota'
import ScrollingMembers from './scrolling-member'

export default function OrganizationStructure() {
  return (
    
    <div className="min-h-screen p-4 md:p-8">
        <div className="flex justify-center items-center space-x-6 mb-10">
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
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Management Board */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">DEWAN PENGURUS</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              {managementBoard.slice(0, 1).map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mb-2">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-center text-sm md:text-base">{member.name}</h3>
                  <p className="text-xs md:text-sm text-gray-600 text-center">{member.position}</p>
                </div>
              ))}
            </div>
            {managementBoard.slice(1, 5).map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-2">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-center text-sm md:text-base">{member.name}</h3>
                <p className="text-xs md:text-sm text-gray-600 text-center">{member.position}</p>
              </div>
            ))}
            {managementBoard.slice(5, 9).map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-2">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-center text-sm md:text-base">{member.name}</h3>
                <p className="text-xs md:text-sm text-gray-600 text-center">{member.position}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Supervisory Board */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">DEWAN PENGAWAS</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="col-span-2 md:col-span-3 flex justify-center">
              {supervisoryBoard.slice(0, 1).map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mb-2">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-center text-sm md:text-base">{member.name}</h3>
                  <p className="text-xs md:text-sm text-gray-600 text-center">{member.position}</p>
                </div>
              ))}
            </div>
            <div className="col-span-2 md:col-span-3 grid grid-cols-2 gap-4 justify-center">
              {supervisoryBoard.slice(1).map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mb-2">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-center text-sm md:text-base">{member.name}</h3>
                  <p className="text-xs md:text-sm text-gray-600 text-center">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Regional Commissioners */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">KETUA KOMISARIAT WILAYAH I-VI</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {regionalCommissioners.map((commissioner, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-2">
                <Image
                  src={commissioner.image}
                  alt={commissioner.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-center text-sm md:text-base">{commissioner.name}</h3>
              <p className="text-xs md:text-sm text-gray-600 text-center">{commissioner.position}</p>
              <p className="text-xs md:text-sm text-gray-600 text-center">{commissioner.region}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling Members */}
      <ScrollingMembers />
    </div>
  )
}

