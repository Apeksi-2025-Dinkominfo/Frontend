'use client';
import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
interface Accommodation {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: string;
  websiteLink: string;
  phoneNumber: number;
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
  const [sortOrder, setSortOrder] = useState<string>('default');
  const [starOptions, setStarOptions] = useState<string[]>([]);
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

        const uniqueStarOptions = Array.from(
          new Set(
            allAccommodations.map((hotel) => hotel.hotelCategory.starNumberName)
          )
        ).sort((a, b) => a.localeCompare(b));

        setStarOptions(uniqueStarOptions);
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

  const sortedAccommodations = () => {
    if (sortOrder === 'default') {
      return accommodations;
    }
    return accommodations.filter(
      (hotel) => hotel.hotelCategory.starNumberName === sortOrder
    );
  };

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

  const paginatedAccommodations = sortedAccommodations().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (sortedAccommodations().length <= itemsPerPage) {
      return null;
    }

    const totalPages = Math.ceil(sortedAccommodations().length / itemsPerPage);
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
    <div className="p-5 ">
      <div className="hero-section bg-white py-10 flex flex-col md:flex-row items-center justify-between">
        <div className="text-content md:w-1/2 w-full text-center md:text-left">
          <h1 className="text-5xl font-semibold text-body mb-4">
            Mau menginap dimana?
          </h1>
          <p className="text-xl text-second mb-5">
            Temukan informasi dan alternatif hotel dan penginapan selama gelaran
            Munas VIII Apeksi 2025 di Kota Surabaya.
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

      {/* Menyatukan Filter dan Judul dengan Flexbox */}
      <div className="flex justify-between items-center mt-5">
        <h1 className="text-5xl font-bold mb-10 text-body">
          Penginapan Di Surabaya
        </h1>
        <div className="flex items-center bg-[#78B7D0] text-black p-2 mb-7 rounded-lg shadow-md">
          <span className="mr-2 font-bold">Filter :</span>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="bg-[#78B7D0] text-black">
                {sortOrder === 'Default' ? 'default' : sortOrder}{' '}

              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Filter Hotel"
              items={[
                { key: 'default', label: 'All' },
                ...starOptions.map((option) => ({
                  key: option,
                  label: option,
                })),
              ]}
            >
              {(item) => (
                <DropdownItem
                  key={item.key}
                  onClick={() => setSortOrder(item.key)}
                  className={`text-black ${
                    item.key === sortOrder
                      ? 'bg-blue-200 text-blue-500'
                      : 'bg-[#78B7D0] hover:bg-[#78B7D0]'
                  }`}
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* Hotel Listings */}
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
                    parseFloat(item.longitude)
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
                  <div className="flex items-center space-x-1 ml-auto">
                    {' '}
                    {/* ml-auto for pushing it to the right */}
                    <PhoneOutlinedIcon
                      style={{ fontSize: '24px', color: '#4A4A4A' }}
                    />
                    <span className="text-sm md:text-base">
                      {item.phoneNumber}
                    </span>{' '}
                    {/* text size adjustment for mobile */}
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
