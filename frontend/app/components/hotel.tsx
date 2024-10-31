"use client"
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import { useRouter } from 'next/navigation';

interface Accommodation {
  id: number;
  name: string;
  address: string;
  description: string;
  link: string;
  hotelThumbnail: {
    link: string;
  };
  hotelCategory: {
    starNumberName: string;
  };
  latitude: number;
  longitude: number;
}

const AccommodationSlider: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    const R = 6371; 
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm = R * c;
    if (distanceInKm < 1) {
      return `${(distanceInKm * 1000).toFixed(0)} meters`;
    }
    return `${distanceInKm.toFixed(2)} km`;
  };

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch(
          'https://tourism.surabaya.go.id/api/kominfo/hotel?page=1'
        );
        const data = await response.json();
  
        if (data.status.code !== 200) {
          throw new Error('Failed to fetch data');
        }
  
        setAccommodations(data.data.data);
        setLoading(false);
      } catch (err: unknown) {  
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };
  
    fetchAccommodations();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const referenceLat = -7.261528192788436;
  const referenceLon = 112.75042301106396;

  return (
    <div className="w-full p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-4xl font-semibold text-body">Penginapan</h2>
        <button
          onClick={() => router.push('/hotels')}
          className="text-light hover:underline hidden md:block"
        >
          Lihat semua
        </button>
      </div>

      <div className="block md:hidden">
        {accommodations.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden mb-4"
            style={{ height: '420px', width: '100%' }}
          >
            <div className="absolute top-[200px] left-4 bg-light text-white px-3 py-1 rounded-lg flex items-center">
              <LocationOnIcon className="mr-1" fontSize="small" />
              <span className="text-sm">
                {calculateDistance(referenceLat, referenceLon, item.latitude, item.longitude)}
              </span>
            </div>

            <img
              src={item.hotelThumbnail.link}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p className="text-gray-600">{item.address}</p>
            </div>
            <div className="absolute bottom-4 left-4 flex items-center">
              <HotelOutlinedIcon className=" mr-1" />
              <span className="font-light">
                {item.hotelCategory.starNumberName}
              </span>
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.push('/hotels')}
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
              <div
                className="relative bg-white shadow-lg rounded-lg overflow-hidden"
                style={{ height: '420px', width: '100%' }}
              >
                <div className="absolute top-[220px] left-4 bg-light text-white px-3 py-1 rounded-lg flex items-center">
                  <LocationOnIcon className="mr-1" fontSize="small" />
                  <span className="text-sm">
                    {calculateDistance(referenceLat, referenceLon, item.latitude, item.longitude)}
                  </span>
                </div>
                <img
                  src={item.hotelThumbnail.link}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-gray-600">
                    {item.description.length > 150
                      ? item.description.substring(0, 80) + '...'
                      : item.description}
                  </p>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center">
                  <HotelOutlinedIcon className=" mr-1" />
                  <span className="font-light">
                    {item.hotelCategory.starNumberName}
                  </span>
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
