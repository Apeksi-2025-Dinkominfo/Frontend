import React from 'react';
import { Box, Grid, Typography, Card, CardMedia, Link, Container } from '@mui/material';

const images = [
  { src: 'example1.jpg', title: 'Gambar 1' },
  { src: 'example 2.jpg', title: 'Gambar 2' },
  { src: 'example 3.jpg', title: 'Gambar 3' },
  { src: 'example 5.png', title: 'Gambar 4' },
  { src: 'balai kota.png', title: 'Gambar 5' },
  { src: 'example 2.jpg', title: 'Gambar 6' },
  { src: 'example 3.jpg', title: 'Gambar 7' },
  { src: 'example 5.png', title: 'Gambar 8' },
  { src: 'example 5.png', title: 'Gambar 9' },
  { src: 'example 2.jpg', title: 'Gambar 10' },
];

const GalleryComponent = () => {
  return (
    <Container maxWidth="lg">
      {/* Bagian header Galeri */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h4" fontWeight="bold" color="#227B94">
          Galeri
        </Typography>
        <Link href="/Gallery" color="#78B7D0" underline="none" sx={{ fontSize: '16px' }}>
          Lihat semua
        </Link>
      </Box>

      {/* Bagian grid gambar */}
      <Grid container spacing={4}>
        {images.map((image, index) => (
          <Grid item xs={6} sm={4} md={2.4} key={index}>
            <Card sx={{ borderRadius: '30px', overflow: 'hidden' }}>
              <CardMedia
                component="img"
                alt={image.title}
                height="150"
                image={image.src}
                sx={{ objectFit: 'cover' }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GalleryComponent;
