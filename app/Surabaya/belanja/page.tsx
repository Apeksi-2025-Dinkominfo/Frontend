'use client';
import React, { useState, useEffect } from 'react';
import { Grid, Button, Box, Container } from '@mui/material';
import NavBarLogo from '../../components/navbarLogo';


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
"9a4d27f5-7e71-4933-a573-a800183dcb03",
"1f496bb6-fa54-47ee-a60f-4653922a4a62",
"9a4d1a7a-37a7-4a91-a99c-d30719c35b0c",
"9a6a6405-dbcc-4ab6-83ee-b935f8cbb7c3",
"2f668034-b1b0-4080-babd-5e4ca645e08b",
"414091ab-91d1-4caf-8dba-a24ed80da50c",
"999e0bc2-82db-42a7-a23a-068eac19b074",
"9a4d2b70-54e9-4491-8234-d2cc5f679c23",
"9a4d22bd-b0ca-4abc-b842-776221f14a63",
"9a4d9d24-a158-4833-9101-db16fe96fd34",
"9a4d956a-5259-43e0-b9d9-b4a98e606e2e",
"7472bf3e-dcc4-40d1-b682-6ca76d3b7bc0",
"6c3365ff-3fbb-40a5-b27f-1bfb5f8dc369",

  ];

  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.touristDestinationFiles.length > 0 &&
      excludedIds.includes(destination.id)
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
       <Box>
    </Box>
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
