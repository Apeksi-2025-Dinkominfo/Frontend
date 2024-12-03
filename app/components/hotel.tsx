'use client';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
interface Accommodation {
  id: number;
  name: string;
  address: string;
  description: string;
  link: string;
  websiteLink: string;
  phoneNumber: number;
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

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm = R * c;
    if (distanceInKm < 1) {
      return `${(distanceInKm * 1000).toFixed(0)} meters`;
    }
    return `${distanceInKm.toFixed(2)} km`;
  };

  const calculateDistanceInMeters = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
    const R = 6371 * 1000; // Radius of Earth in meters
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
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

        const referenceLat = -7.261528192788436;
        const referenceLon = 112.75042301106396;

        // Sort accommodations by distance in meters
        const sortedAccommodations = data.data.data.sort(
          (a: Accommodation, b: Accommodation) => {
            const distanceA = calculateDistanceInMeters(
              referenceLat,
              referenceLon,
              a.latitude,
              a.longitude
            );
            const distanceB = calculateDistanceInMeters(
              referenceLat,
              referenceLon,
              b.latitude,
              b.longitude
            );

            return distanceA - distanceB;
          }
        );

        setAccommodations(sortedAccommodations);
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

  const formatDistance = (distanceInMeters: number) => {
    if (distanceInMeters < 1000) {
      return `${distanceInMeters.toFixed(0)} meters`;
    }
    return `${(distanceInMeters / 1000).toFixed(2)} km`;
  };

  return (
    <div className="w-full p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-4xl font-semibold text-body">Hotel di Surabaya</h2>
        <button
          onClick={() => router.push('/hotels')}
          className="text-light hover:underline hidden md:block"
        >
          Lihat semua
        </button>
      </div>

      <div className="block md:hidden">
        {accommodations.slice(0, 5).map((item) => (
          <Link href={item.websiteLink} key={item.id} passHref>
            <div
              className="relative bg-white shadow-lg rounded-lg overflow-hidden mb-4 block"
              style={{ height: '420px', width: '100%' }}
            >
              <div className="absolute top-[200px] left-4 bg-light text-white px-3 py-1 rounded-lg flex items-center">
                <LocationOnIcon className="mr-1" fontSize="small" />
                <span className="text-sm">
                  {formatDistance(
                    calculateDistanceInMeters(
                      referenceLat,
                      referenceLon,
                      item.latitude,
                      item.longitude
                    )
                  )}
                </span>
              </div>

              <img
                src={item.hotelThumbnail.link}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-gray-600 text-sm">{item.address}</p>
              </div>

              <div className="absolute bottom-4 left-4 flex items-center">
                <HotelOutlinedIcon className="mr-1" />
                <span className="font-light text-sm">
                  {item.hotelCategory.starNumberName}
                </span>
                <div className="flex ml-24">
                  <PhoneOutlinedIcon className="mr-1 text-gray-500" />
                  <span className="font-light text-sm">{item.phoneNumber}</span>
                </div>
              </div>
            </div>
          </Link>
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
    <Link href={item.websiteLink} passHref>
      <div
        className="relative bg-white shadow-lg rounded-lg overflow-hidden"
        style={{ height: '420px', width: '100%' }}
      >
        <div className="absolute top-[220px] left-4 bg-light text-white px-3 py-1 rounded-lg flex items-center">
          <LocationOnIcon className="mr-1" fontSize="small" />
          <span className="text-sm">
            {calculateDistance(
              referenceLat,
              referenceLon,
              item.latitude,
              item.longitude
            )}
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
          <div className="flex items-center ml-2">
            <PhoneOutlinedIcon className="mr-1" />
            <span className="font-light">{item.phoneNumber}</span>
          </div>
          <HotelOutlinedIcon className=" ml-20" />
          <span className="font-light">
            {item.hotelCategory.starNumberName}
          </span>
        </div>
      </div>
    </Link>
  </SwiperSlide>
))}

        </Swiper>
      </div>
    </div>
  );
};

export default AccommodationSlider;
