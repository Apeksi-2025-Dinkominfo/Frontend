'use client';
import React, { useState, useEffect } from 'react';
import { Grid, Button, Box, Container } from '@mui/material';

interface TouristDestinationFile {
  link: string;
}

interface Destination {
  id: string;
  nameIndonesia: string;
  address: string;
  descriptionIndonesia: string;
  latitude: number;
  longitude: number;
  touristDestinationFiles: TouristDestinationFile[];
}

export default function WisataPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const allDestinations: Destination[] = [];
      for (let page = 1; page <= 7; page++) {
        const res = await fetch(
          `https://tourism.surabaya.go.id/api/kominfo/destination?page=${page}`
        );
        const result = await res.json();
        allDestinations.push(...(result.data?.data || []));
      }
      setDestinations(allDestinations);
    };
    fetchData();
  }, []);

  const excludedIds = [
    '9c4228f7-64ad-43dc-96e8-f71d62f445a6',
    '9c422b84-3beb-40f3-bbc2-a3bb014848f1',
    '52be927c-1312-4170-a332-f6ea07713d02',
    '9c4231e5-ebed-48c0-95b8-ae2d248875bf',
    '9192cdb5-1a97-420a-9b24-0957ba842fb3',
    '91e8027f-1948-47e7-98f3-c55c1b143e8f',
    '7bab8aa8-e51f-4a00-9611-df9e2fe636a3',
    '9995f578-5f5d-4379-a104-f1ff1d988715',
    '5f29a051-4673-4fd7-bf7e-9f4508e958e5',
    '83a3b4ae-387a-4d29-90ff-9525df6c2c49',
    '9996d65c-53d6-4d6b-9c77-3498c3fc528f',
    'e5291779-2864-4a01-9590-1b507ea7ed4f',
    'b02cfe95-a65a-4888-9c60-9875c1dd3d08',
    '8ff3eb3d-da1d-49f6-a259-379623f7bf7c',
    "9d27a64c-644e-419d-9b33-c83c7c180cd1",
    "9d27ab50-f518-4107-87e0-fc13a577188e",
  ];

  const filteredDestinations = destinations
    .filter(
      (destination) =>
        destination.touristDestinationFiles.length > 0 &&
        excludedIds.includes(destination.id)
    )
    .sort((a, b) => {
      // Prioritize moving specific IDs to the end
      const lastIds = [
        '9d27a64c-644e-419d-9b33-c83c7c180cd1',
        '9d27ab50-f518-4107-87e0-fc13a577188e',
      ];
      if (lastIds.includes(a.id)) return 1; // Move these to the end
      if (lastIds.includes(b.id)) return -1; 
      return 0;
    });

  const truncateDescription = (description: string) => {
    return description.length > 222
      ? description.slice(0, 222) + '...'
      : description;
  };

  const openLocationInMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        mb={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        {filteredDestinations.length > 0 && (
          <>
            <img
              src={
                filteredDestinations[currentIndex].touristDestinationFiles[0]
                  .link
              }
              alt={filteredDestinations[currentIndex].nameIndonesia}
              style={{
                width: '100%',
                height: '500px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              position="absolute"
              left="20px"
              bottom="20px"
              width="auto"
            >
              <Button
                onClick={() =>
                  setCurrentIndex((prevIndex) =>
                    prevIndex === 0
                      ? filteredDestinations.length - 1
                      : prevIndex - 1
                  )
                }
                variant="outlined"
                style={{
                  borderRadius: '50%',
                  minWidth: '40px',
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0',
                  borderColor: 'white',
                  color: 'white',
                }}
              >
                <span style={{ fontSize: '20px', lineHeight: '0' }}>&lt;</span>
              </Button>
              <Button
                onClick={() =>
                  setCurrentIndex((prevIndex) =>
                    prevIndex === filteredDestinations.length - 1
                      ? 0
                      : prevIndex + 1
                  )
                }
                variant="outlined"
                style={{
                  borderRadius: '50%',
                  minWidth: '40px',
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0',
                  borderColor: 'white',
                  color: 'white',
                  marginLeft: '10px',
                }}
              >
                <span style={{ fontSize: '20px', lineHeight: '0' }}>&gt;</span>
              </Button>
            </Box>
          </>
        )}
      </Box>

      <Grid container spacing={4}>
        {filteredDestinations.map((destination) => (
          <Grid item xs={12} sm={6} md={4} key={destination.id}>
            <div className="bg-[#add8e6] rounded-lg shadow-md p-4 flex flex-col justify-between h-full">
              {destination.touristDestinationFiles.length > 0 && (
                <img
                  src={destination.touristDestinationFiles[0].link}
                  alt={destination.nameIndonesia}
                  className="w-full h-56 object-cover rounded-t-lg"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
              <div
                className="p-4"
                style={{ minHeight: '300px', position: 'relative' }}
              >
                <h3 className="text-lg font-bold text-black mb-2">
                  {destination.nameIndonesia}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {truncateDescription(destination.descriptionIndonesia)}
                </p>
                <button
                  onClick={() =>
                    openLocationInMaps(
                      destination.latitude,
                      destination.longitude
                    )
                  }
                  className="bg-[#2b8ea6] text-white py-2 px-4 rounded-full hover:bg-[#257a8a] transition duration-300"
                  style={{ position: 'absolute', bottom: '16px', left: '16px' }}
                >
                  Menuju Lokasi
                </button>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}