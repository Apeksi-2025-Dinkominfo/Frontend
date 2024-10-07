'use client';

import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Grid, CardMedia, Typography, Button } from '@mui/material';
import { IconButton, Container } from '@mui/material';
import { Phone, Email, LocationOn, Home } from '@mui/icons-material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';
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


      {/* Footer */}
      <Footer />
    </>
  );
};

// Definisi komponen Footer
const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#FFFFFF', py: 8, borderTop: '3px solid #e0e0e0', marginBottom: '16px' }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column">
              <img src="/logo-dark.png" alt="Surabaya Logo" width={150} style={{ marginBottom: '16px' }} />
              <Typography variant="body1" color="textSecondary">
                Surabaya dengan bangga menjadi tuan rumah Rakernas Apeksi,<br /> menyambut peserta dari seluruh Indonesia
                untuk berdiskusi<br /> dan berkolaborasi.Kota Pahlawan siap berbagi inovasi dan solusi<br /> dalam pengembangan perkotaan,
                mendorong<br /> kemajuan dan kerjasama antar daerah.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Kontak
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Phone sx={{ verticalAlign: 'middle', mr: 1 }} />
              (031) 5475600
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Phone sx={{ verticalAlign: 'middle', mr: 1 }} />
              (031) 9871239
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Email sx={{ verticalAlign: 'middle', mr: 1 }} />
              dinkominfo@surabaya.go.id
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Email sx={{ verticalAlign: 'middle', mr: 1 }} />
              media_center@surabaya.go.id
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Alamat
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <LocationOn sx={{ verticalAlign: 'middle', mr: 1 }} />
              Jl. Jimerto No. 25-27 Ketabang, Kec. Genteng, Kota SBY, Jawa Timur 60272
            </Typography>
          </Grid>
        </Grid>

        <Box mt={4} display="flex" justifyContent="center" alignItems="center">
          <IconButton href="#" color="inherit" aria-label="Facebook">
            <Facebook />
          </IconButton>
          <IconButton href="#" color="inherit" aria-label="Twitter">
            <Twitter />
          </IconButton>
          <IconButton href="#" color="inherit" aria-label="Instagram">
            <Instagram />
          </IconButton>
          <IconButton href="#" color="inherit" aria-label="YouTube">
            <YouTube />
          </IconButton>
        </Box>

        <Box mt={4} textAlign="left">
          <Typography variant="body2" color="textSecondary">
            © 2025 Pemerintah Kota Surabaya™. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Galeri;
