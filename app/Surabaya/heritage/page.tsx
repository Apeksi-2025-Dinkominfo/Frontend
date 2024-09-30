"use client";

import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Box, Grid, Button } from '@mui/material';

interface TouristDestinationFile {
  link: string;
}

interface Destination {
  id: number;
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

      // Loop through pages 1 to 7
      for (let page = 1; page <= 7; page++) {
        const res = await fetch(`https://tourism.surabaya.go.id/api/kominfo/destination?page=${page}`);
        const result = await res.json();
        allDestinations.push(...result.data?.data || []);
      }

      setDestinations(allDestinations);
    };
    fetchData();
  }, []);

  const filteredDestinations = destinations.filter(
    (destination) => destination.touristDestinationFiles.length > 0
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === filteredDestinations.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(interval);
  }, [filteredDestinations.length]);

  if (filteredDestinations.length === 0) {
    return <div>No destinations available.</div>;
  }

  return (
    <Container>
      <Box mb={4} display="flex" alignItems="center" justifyContent="center" position="relative">
        {filteredDestinations.length > 0 && (
          <>
            {/* Current Image */}
            <img
              src={filteredDestinations[currentIndex].touristDestinationFiles[0].link}
              alt={filteredDestinations[currentIndex].nameIndonesia}
              style={{ width: '100%', height: '500px', objectFit: 'cover' }}
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
                onClick={() => setCurrentIndex((prevIndex) => prevIndex === 0 ? filteredDestinations.length - 1 : prevIndex - 1)}
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
                <span style={{ fontSize: '20px', lineHeight: '0' }}>&lt;</span> {/* Left arrow */}
              </Button>
              <Button
                onClick={() => setCurrentIndex((prevIndex) => prevIndex === filteredDestinations.length - 1 ? 0 : prevIndex + 1)}
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
                  marginLeft: '10px' 
                }}
              >
                <span style={{ fontSize: '20px', lineHeight: '0' }}>&gt;</span> {/* Right arrow */}
              </Button>
            </Box>
          </>
        )}
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        Tourist Destinations
      </Typography>
      <Grid container spacing={4}>
        {destinations.map((destination) => (
          <Grid item xs={12} sm={6} md={4} key={destination.id}>
            <Card className="border p-4">
              {destination.touristDestinationFiles.length > 0 && (
                <img
                  src={destination.touristDestinationFiles[0].link}
                  alt={destination.nameIndonesia}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {destination.nameIndonesia}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Address:</strong> {destination.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {destination.descriptionIndonesia}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Latitude:</strong> {destination.latitude}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Longitude:</strong> {destination.longitude}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
