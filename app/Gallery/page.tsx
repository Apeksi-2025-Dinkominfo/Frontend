'use client';

import React from 'react';
import Carousel from 'react-material-ui-carousel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Grid, CardMedia, Typography, Button, } from '@mui/material';

// Gambar untuk Carousel
const carouselImages = [
  { src: 'belanja.jpeg', title: 'Gambar 1' },
  { src: 'budaya.jpg', title: 'Gambar 2' },
  { src: 'kuliner.jpg', title: 'Gambar 3' },
];

// Gambar untuk Grid Galeri
const galleryImages = [
  { src: 'balai kota.png', title: 'Gambar 1' },  // Ganti dengan path lokal atau URL gambar
  { src: 'example 2.jpg', title: 'Gambar 2' },
  { src: 'example1.jpg', title: 'Gambar 3' },
  { src: 'example 5.png', title: 'Gambar 4' },
  { src: 'example 3.jpg', title: 'Gambar 5' },
  { src: 'example1.jpg', title: 'Gambar 6' },
  { src: 'example 2.jpg', title: 'Gambar 7' },
  { src: 'balai kota.png', title: 'Gambar 8' },
  { src: 'example 5.png', title: 'Gambar 9' },
  { src: 'budaya.jpg', title: 'Gambar 10' },
  { src: 'example 3.jpg', title: 'Gambar 11' },
  { src: 'example 5.png', title: 'Gambar 12' },
  { src: 'example1.jpg', title: 'Gambar 6' },
  { src: 'example 2.jpg', title: 'Gambar 7' },
  { src: 'balai kota.png', title: 'Gambar 8' },
  { src: 'example 5.png', title: 'Gambar 9' },
  { src: 'budaya.jpg', title: 'Gambar 10' },
  { src: 'example 3.jpg', title: 'Gambar 11' },
  { src: 'example 5.png', title: 'Gambar 12' },
  { src: 'example 2.jpg', title: 'Gambar 7' },
  { src: 'balai kota.png', title: 'Gambar 8' },
  { src: 'example 5.png', title: 'Gambar 9' },
  { src: 'budaya.jpg', title: 'Gambar 10' },
  { src: 'example 3.jpg', title: 'Gambar 11' },
  { src: 'example 5.png', title: 'Gambar 12' },
  { src: 'balai kota.png', title: 'Gambar 8' },
  { src: 'example 5.png', title: 'Gambar 9' },
  { src: 'budaya.jpg', title: 'Gambar 10' },
  { src: 'example 3.jpg', title: 'Gambar 11' },
  { src: 'example 5.png', title: 'Gambar 12' },
  { src: 'balai kota.png', title: 'Gambar 8' },
  { src: 'example 5.png', title: 'Gambar 9' },
  { src: 'budaya.jpg', title: 'Gambar 10' },
  { src: 'example 3.jpg', title: 'Gambar 11' },
  { src: 'example 5.png', title: 'Gambar 12' },
];

const Galeri = () => {
  return (
    <>
      {/* Carousel */}
      <Box
        sx={{
          width: '1199px',  // Mengatur lebar secara spesifik
          height: '444px',  // Mengatur tinggi secara spesifik
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
              top: '35%', // Menempatkan tombol di tengah secara vertikal
              transform: 'translateY(-50%)', // Menyesuaikan agar tombol tepat di tengah
            }
          }}
          navButtonsProps={{
            style: {
              backgroundColor: 'rgb(1, 2, 0, 0.5)', // Warna background semi-transparan agar tombol terlihat
              borderRadius: '100%', // Membuat tombol bulat
            }
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
            sx={{ 
              mr: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                color: 'primary.main', // Change text color on hover
              },
            }}
          >
            Day
          </Button>
          <Button 
            variant="text" 
            sx={{ 
              mr: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                color: 'primary.main', // Change text color on hover
              },
            }}
          >
            Event
          </Button>
          <Button 
            variant="text" 
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                color: 'primary.main', // Change text color on hover
              },
            }}
          >
            Venue
          </Button>
        </Box>
        <Grid container spacing={2}>
          {galleryImages.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <Box sx={{
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 3,
              }}>
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

  