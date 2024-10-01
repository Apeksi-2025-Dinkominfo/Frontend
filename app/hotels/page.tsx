'use client';
import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';

interface Accommodation {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  websiteLink: string;
  hotelThumbnail: { link: string };
  hotelCategory: {
    starNumberName: string;
    starNumber: number;
  };
}

const Hotels: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchAccommodations = async () => {
      const allAccommodations: Accommodation[] = [];
      try {
        for (let page = 1; page <= 11; page++) {
          const response = await fetch(
            `https://tourism.surabaya.go.id/api/kominfo/hotel?page=${page}`
          );
          const data = await response.json();

          if (data.status.code !== 200) {
            throw new Error('Failed to fetch data');
          }

          allAccommodations.push(...data.data.data);
        }
        setAccommodations(allAccommodations);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
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

  const truncateAddress = (address: string, wordLimit: number) => {
    const words = address.split(' ');
    if (words.length <= wordLimit) return address;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

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

  const referenceLat = -7.261528192788436;
  const referenceLon = 112.75042301106396;

  const totalPages = Math.ceil(accommodations.length / itemsPerPage);

  const paginatedAccommodations = accommodations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center mt-5">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`mx-1 px-4 py-2 rounded-md transition-colors duration-300 ${
              currentPage === pageNumber
                ? 'bg-light text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-light hover:text-white'
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="p-5 font-poppins">
      <div className="hero-section bg-white py-10 flex flex-col md:flex-row items-center justify-between">
        <div className="text-content md:w-1/2 w-full text-center md:text-left">
          <h1 className="text-6xl font-semibold text-body mb-4">
            Hotel Suroboyo <br />
            Rek
          </h1>
          <p className="text-lg text-second mb-5">
            Cari Hotel yang sempurna untuk menginap di Surabaya. Menawarkan
            kenyamanan terbaik, layanan personal, dan fasilitas lengkap untuk
            memastikan setiap tamu merasa istimewa. Baik untuk liburan romantis,
            perjalanan bisnis, atau liburan keluarga, kami menghadirkan
            kemewahan dan kenyamanan di setiap sudut.
          </p>
        </div>
        <div className="image-content md:w-1/2 w-full flex justify-center">
          <img
            src="/Hotel.jpeg"
            alt="Hospital illustration"
            className="h-60 md:h-80 lg:h-96 w-auto"
          />
        </div>
      </div>

      {/* Hotel Listings */}
      <h1 className="text-5xl font-bold mb-5 text-body">Hotel Suroboyo Rek</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedAccommodations.map((item) => (
          <div
            key={item.id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <a
              href={item.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={item.hotelThumbnail.link}
                alt={item.name}
                className="w-full h-64 object-cover transition duration-300 hover:opacity-90"
              />

              <div className="absolute top-[220px] left-2 bg-light text-white text-sm px-2 py-1 rounded-lg flex items-center">
                <LocationOnIcon
                  style={{ fontSize: '16px', marginRight: '4px' }}
                />
                <span>
                  {calculateDistance(
                    referenceLat,
                    referenceLon,
                    item.latitude,
                    item.longitude
                  )}
                </span>
              </div>

              <div className="p-4">
                <h4 className="text-lg font-semibold transition-colors duration-300 hover:text-second">
                  {item.name}
                </h4>
                <p className="text-gray-600">
                  {truncateAddress(item.address, 8)}
                </p>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center space-x-1">
                    <HotelOutlinedIcon
                      style={{ fontSize: '24px', color: '#4A4A4A' }}
                    />
                    <span>{item.hotelCategory.starNumberName}</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      {renderPagination()}
    </div>
  );
};

export default Hotels;
