'use client';

import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Grid, CardMedia, Typography, Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { Home } from '@mui/icons-material';
import { dayImages, eventImages, venueImages } from '../utils/gambardata';

// Gambar untuk Carousel
const carouselImages = [
  { src: 'belanja.jpeg', title: 'Gambar 1' },
  { src: 'budaya.jpg', title: 'Gambar 2' },
  { src: 'kuliner.jpg', title: 'Gambar 3' },
];

const Galeri = () => {
  // State untuk menyimpan kategori yang dipilih
  const [selectedCategory, setSelectedCategory] = useState<'day' | 'event' | 'venue'>('day');

  // Menentukan gambar yang akan ditampilkan berdasarkan kategori yang dipilih
  const getGalleryImages = () => {
    switch (selectedCategory) {
      case 'day':
        return dayImages;
      case 'event':
        return eventImages;
      case 'venue':
        return venueImages;
      default:
        return [];
    }
  };

  return (
    <>
      {/* Header dengan Logo dan Tombol Home */}
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', p: 2 }}>
        <Box sx={{ position: 'absolute', left: 9 }}>
          <IconButton href="/" aria-label="Home" color="primary">
            <Home sx={{ fontSize: 60 }} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: 2.5 }}>
          <img src="/sby.png" alt="Logo Surabaya" width={60} height={50} style={{ marginRight: '16px' }} />
          <img src="/apeksi.png" alt="Logo Apeksi" width={100} height={60} />
        </Box>
      </Box>

      {/* Carousel */}
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
          {carouselImages.map((image, index) => (
            <CardMedia
              key={index}
              component="img"
              height="444"
              width="1199"
              image={image.src}
              alt={`Slide ${index}`}
              sx={{
                objectFit: 'contain',
              }}
            />
          ))}
        </Carousel>
      </Box>

      {/* Galeri Grid */}
      <Box sx={{ width: '90%', margin: 'auto', mt: 5 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Galeri
        </Typography>
        <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
          <Button
            variant="text"
            onClick={() => setSelectedCategory('day')}
            sx={{
              mr: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                color: 'primary.main',
              },
            }}
          >
            Day
          </Button>
          <Button
            variant="text"
            onClick={() => setSelectedCategory('event')}
            sx={{
              mr: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                color: 'primary.main',
              },
            }}
          >
            Event
          </Button>
          <Button
            variant="text"
            onClick={() => setSelectedCategory('venue')}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                color: 'primary.main',
              },
            }}
          >
            Venue
          </Button>
        </Box>
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
          image={image.src}
          alt={image.title}
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
    </>
  );
};


export default Galeri;
