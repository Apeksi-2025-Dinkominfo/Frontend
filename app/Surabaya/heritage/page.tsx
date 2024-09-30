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

export default function HeritagePage() {
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
    '9bf9c9fe-51a6-4b0b-97aa-9c8ce15074a5',
    '9b2e8c13-499b-47bd-9b47-827d0afd00e9',
    '9bfbf031-1016-4e9e-949e-aa387960d040',
    '9bfbfbeb-db56-4ac7-81d2-ea635c013c47',
    '9bfbfcee-56b4-4fcb-84d0-87c6509d06ff',
    '9bfbff40-58ee-4f11-bb8c-0bbd890a4d0d',
    '9bfc06ef-5862-42aa-ac91-d2679e7f4073',
    '9bfc084c-a856-4a26-9af3-f8cc3b461117',
    '9bfc08b2-5828-44de-b06d-558c57a35bbb',
    '9bfc0914-44c0-4e21-bcfc-ab3d57178efc',
    '9bfc0aa9-82c8-430a-9777-59ee0a3112f0',
    "9bfc07a1-9d7b-4f92-89bc-7cdfb7eb2825",
  ];

  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.touristDestinationFiles.length > 0 &&
      !excludedIds.includes(destination.id)
  );

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
