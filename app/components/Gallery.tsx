import React from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent, Container } from '@mui/material';

const images = [
  { src: 'img1.jpg', title: 'Kegiatan 1' },
  { src: 'img2.jpg', title: 'Kegiatan 2' },
  { src: 'img3.jpg', title: 'Kegiatan 3' },
  { src: 'img4.jpg', title: 'Kegiatan 4' },
  { src: 'img5.jpg', title: 'Kegiatan 5' },
  { src: 'img6.jpg', title: 'Kegiatan 6' },
  { src: 'img7.jpg', title: 'Kegiatan 7' },
  { src: 'img8.jpg', title: 'Kegiatan 8' },
  { src: 'img9.jpg', title: 'Kegiatan 9' },
];

const Gallery = () => {
  return (
    <Box sx={{ mt: 10, paddingBottom: 6, backgroundColor: '#f9f9f9' }}>
      {/* Menambahkan margin top (mt) agar tidak menabrak konten di atasnya */}
      <Container maxWidth="lg">
        {/* Bagian header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Galeri
          </Typography>
          <Box>
            <Typography variant="body1" component="span" sx={{ marginRight: '15px', cursor: 'pointer', fontWeight: 'bold' }}>
              Day
            </Typography>
            <Typography variant="body1" component="span" sx={{ marginRight: '15px', cursor: 'pointer', fontWeight: 'bold' }}>
              Event
            </Typography>
            <Typography variant="body1" component="span" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
              Venue
            </Typography>
          </Box>
        </Box>

        {/* Bagian grid gambar */}
        <Grid container spacing={4}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ borderRadius: '10px', boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  alt={image.title}
                  height="200"
                  image={image.src}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="body1" color="textPrimary" component="p">
                    {image.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Bagian footer */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            © 2023 Pemerintah Kota Surabaya. All Rights Reserved.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Jl. Raya Tlogomas No 246, Jawa Timur 65144, Indonesia
          </Typography>
          <Typography variant="body2" color="textSecondary">
            (62) 851 550 7757 | doubleone@xyzscape.xyz
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Gallery;
