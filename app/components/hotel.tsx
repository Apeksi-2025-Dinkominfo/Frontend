import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from "next/navigation";
import { accommodationsData } from "../utils/accommodations"; 
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";

interface Accommodation {
  id: number;
  price: string;
  title: string;
  address: string;
  beds: number;
  baths: number;
  distance: string;
  image: string;
}

const AccommodationSlider: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const router = useRouter();

  useEffect(() => {
    setAccommodations(accommodationsData);
  }, []);

  return (
    <div className="w-full p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-green-700">Penginapan</h2>
        <button
          onClick={() => router.push("/hotels")}
          className="text-blue-500 hover:underline hidden md:block"
        >
          Lihat semua
        </button>
      </div>

      <div className="block md:hidden">
        {accommodations.slice(0, 5).map((item) => (
          <div key={item.id} className="relative bg-white shadow-lg rounded-lg overflow-hidden mb-4">
            <div className="absolute top-[200px] left-4 bg-light text-white px-3 py-1 rounded-lg flex items-center">
              <LocationOnIcon className="mr-1" fontSize="small" />
              <span className="text-sm">{item.distance}</span>
            </div>

            <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-t-lg" />
            <div className="p-4">
              <h6 className="text-xl font-bold">{item.price}</h6>
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-gray-600">{item.address}</p>
              <div className="flex items-center mt-2">
                {/* Menambahkan icon Bed dan Bath dengan jarak lebih kecil */}
                <span className="text-sm flex items-center mr-4">
                  <BedOutlinedIcon className="mr-1" fontSize="small" />
                  {item.beds} Beds
                </span>
                <span className="text-sm flex items-center ">
                  <BathtubOutlinedIcon className="mr-1" fontSize="small" />
                  {item.baths} Baths
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.push("/hotels")}
            className="bg-transparent border border-light text-body font-bold py-2 px-4 rounded-full hover:bg-second hover:text-body transition-colors w-full max-w-xs"
          >
            View more properties
          </button>
        </div>
      </div>

      <div className="hidden md:block">
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          breakpoints={{
            640: { slidesPerView: 1 }, 
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {accommodations.slice(0, 6).map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="absolute top-[220px] left-4 bg-light text-white px-3 py-1 rounded-lg flex items-center">
                  <LocationOnIcon className="mr-1" fontSize="small" />
                  <span className="text-sm">{item.distance}</span>
                </div>

                <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h6 className="text-xl font-bold">{item.price}</h6>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-gray-600">{item.address}</p>
                  <div className="flex items-center mt-2">
                {/* Menambahkan icon Bed dan Bath dengan jarak lebih kecil */}
                <span className="text-sm flex items-center mr-4">
                  <BedOutlinedIcon className="mr-1" fontSize="small" />
                  {item.beds} Beds
                </span>
                <span className="text-sm flex items-center ">
                  <BathtubOutlinedIcon className="mr-1" fontSize="small" />
                  {item.baths} Baths
                </span>
              </div>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default AccommodationSlider;
