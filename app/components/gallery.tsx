"use client"
import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardMedia, Link, Container } from '@mui/material';
import { fetchGambarData, Gambar } from '../utils/gambardata';

const GalleryComponent = () => {
  const [images, setImages] = useState<Gambar[]>([]);

  useEffect(() => {
    const getGambarData = async () => {
      const data = await fetchGambarData();
      setImages(data);
      console.log(data)
    };
    
    getGambarData();
  }, []);

  return (
    <Container maxWidth="lg">
      {/* Bagian header Galeri */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h4" fontWeight="bold" color="#227B94">
          Galeri
        </Typography>
        <Link
          href="/Gallery"
          sx={{
            fontSize: '16px',
            color: '#78B7D0',
            textDecoration: 'underline',
            transition: 'color 1s ease', // Animasi perubahan warna
            '&:hover': {
              backgroundColor: '#1A1A1A4', // Ubah warna saat hover
            },
          }}
        >
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
                alt={image.photoType}
                height="150"
                image={image.url}
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
