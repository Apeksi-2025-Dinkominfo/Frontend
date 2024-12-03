'use client';

import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Grid, CardMedia, Typography } from '@mui/material';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";


enum PhotoType {
  DAY = 'day',
  EVENT = 'event',
  VENUE = 'venue',
}
interface Gambar {
  url: string;
  photoType: 'day' | 'event' | 'venue';
}

const Galeri = () => {
  const [images, setImages] = useState<Gambar[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PhotoType>(PhotoType.DAY);
  // const [selectedDay, setSelectedDay] = useState<string>('Day 1');
  // const [selectedEvent, setSelectedEvent] = useState<string>('Event 1');
  // const [selectedVenue, setSelectedVenue] = useState<string>('Venue 1');

  // Fungsi untuk mengambil data gambar dari endpoint
  useEffect(() => {
    const getGambarData = async () => {
      try {
        const response = await fetch('http://localhost:5000/gambar');
        const data = await response.json();
        setImages(data);
        console.log(data); // Cek hasilnya di console
      } catch (error) {
        console.error('Error fetching gambar data:', error);
      }
    };

    getGambarData();
  }, []); // Hanya dijalankan sekali saat komponen pertama kali dimuat

  // Mengambil gambar berdasarkan kategori yang dipilih
  const getGalleryImages = () => {
    return images.filter((image) => image.photoType === selectedCategory);
  };

  return (
    <>
      <Box
        sx={{
          width: '1199px',
          height: '444px',
          margin: 'auto',
          mt: 8,
          boxShadow: 1,
          borderRadius: 5,
          overflow: 'hidden',
        }}
      >
        <Carousel
        navButtonsAlwaysVisible
        PrevIcon={<ArrowBackIosIcon />}
        NextIcon={<ArrowForwardIosIcon />}
        indicators={false}
        animation="slide"
        duration={500}
        navButtonsWrapperProps={{
          style: {
            top: '35%',
            transform: 'translateY(-50%)',
          },
        }}
        navButtonsProps={{
          style: {
            backgroundColor: 'rgb(1, 2, 0, 0.5)',
            borderRadius: '100%',
          },
        }}
      >
        {images.map((image, index) => (
          <CardMedia
            key={index}
            component="img"
            height="444"
            width="1199"
            image={image.url} // Gambar yang diambil dari URL
            alt={`Slide ${index}`}
            sx={{
              objectFit: 'contain',
            }}
          />
        ))}
      </Carousel>
      </Box>

      <Box sx={{ width: '90%', margin: 'auto', mt: 5 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Galeri
        </Typography>

        <Box sx={{ width: '100%', margin: 'auto', mt: 8 }}>
      {/* Dropdown untuk memilih kategori */}
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        {/* Dropdown untuk memilih kategori */}
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" style={{ backgroundColor: '#78B7D0', color: '#1A1A1A', borderRadius: '20px' }}>
              {selectedCategory === PhotoType.DAY ? 'Day' : selectedCategory === PhotoType.EVENT ? 'Event' : 'Venue'}{' '}
              <ArrowDropDownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Category Selection" style={{ backgroundColor: '#78B7D0', borderRadius: '20px' }}>
            <DropdownItem
              key="day"
              onClick={() => setSelectedCategory(PhotoType.DAY)}
              style={{ backgroundColor: '#78B7D0', color: '#1A1A1A', borderRadius: '20px' }}
            >
              Day
            </DropdownItem>
            <DropdownItem
              key="event"
              onClick={() => setSelectedCategory(PhotoType.EVENT)}
              style={{ backgroundColor: '#78B7D0', color: '#1A1A1A', borderRadius: '20px' }}
            >
              Event
            </DropdownItem>
            <DropdownItem
              key="venue"
              onClick={() => setSelectedCategory(PhotoType.VENUE)}
              style={{ backgroundColor: '#78B7D0', color: '#1A1A1A', borderRadius: '20px' }}
            >
              Venue
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Box>

      {/* Tampilkan gambar sesuai kategori */}
      <Grid container spacing={2}>
        {getGalleryImages().map((image, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <Box
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="190"
                width="188"
                image={image.url}
                alt={image.photoType}
                sx={{
                  width: '188%',
                  height: '190px',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
      </Box>
    </>
  );
};

export default Galeri;
