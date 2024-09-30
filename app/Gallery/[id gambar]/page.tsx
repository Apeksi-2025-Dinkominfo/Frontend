'use client';

import React from 'react';
import Carousel from 'react-material-ui-carousel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Grid, CardMedia, Typography, Button, } from '@mui/material';
import { IconButton, Container } from '@mui/material';
import { Phone, Email, LocationOn, Home } from '@mui/icons-material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';

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

 {/* Header dengan Logo dan Tombol Home */}
<Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', p: 2 }}>
  {/* Tombol Home di Pojok Kiri Atas */}
  <Box sx={{ position: 'absolute', left: 9 }}>
    <IconButton href="/" aria-label="Home" color="primary">
      <Home sx={{ fontSize: 60 }} />
    </IconButton>
  </Box>

  {/* Logo Surabaya dan Apeksi di Tengah */}
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap:2.5 }}>
  <img src="/sby.png" alt="Logo Surabaya" width={60} height={50} style={{ marginRight: '16px' }} />
  <img src="/apeksi.png" alt="Logo Apeksi" width={100} height={60} />
  </Box>
</Box>


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

      {/* Footer */}
      <Footer />
    </>
  );
};

// Definisi komponen Footer
const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#FFFFFF', py: 8, borderTop: '3px solid #e0e0e0',marginBottom:'16px' }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {/* Kolom Logo dan Deskripsi */}
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column">
              <img src="/logo-dark.png" alt="Surabaya Logo" width={150} style={{ marginBottom: '16px' }} />
              <Typography variant="body1" color="textSecondary">
                Surabaya dengan bangga menjadi tuan rumah Rakernas Apeksi,<br/> menyambut peserta dari seluruh Indonesia
                untuk berdiskusi<br/> dan berkolaborasi.Kota Pahlawan siap berbagi inovasi dan solusi<br/> dalam pengembangan perkotaan,
                mendorong<br/> kemajuan dan kerjasama antar daerah.
              </Typography>
            </Box>
          </Grid>

          {/* Kolom Informasi Kontak */}
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

          {/* Kolom Alamat */}
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

        {/* Baris Ikon Sosial Media */}
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

        {/* Copyright */}
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
