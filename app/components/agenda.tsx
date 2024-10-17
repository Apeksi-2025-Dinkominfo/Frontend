import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';

const AgendaAcara = () => {
  // Sample data untuk gambar dan teks dengan menggunakan src
  const acara = [
    { 
      src: 'example1.jpg', 
      title: 'Headline 1', 
      description: 'Please add your content here. Keep it short and simple. And smile :)' 
    },
    { 
      src: 'example1.jpg',
      title: 'Headline 2', 
      description: 'Please add your content here. Keep it short and simple. And smile :)' 
    },
    { 
      src: 'example1.jpg', 
      title: 'Headline 3', 
      description: 'Please add your content here. Keep it short and simple. And smile :)' 
    },
    { 
      src: 'example1.jpg', 
      title: 'Headline 4', 
      description: 'Please add your content here. Keep it short and simple. And smile :)' 
    },
    { 
      src: 'example1.jpg', 
      title: 'Headline 5', 
      description: 'Please add your content here. Keep it short and simple. And smile :)' 
    },
    { 
      src: 'example1.jpg', 
      title: 'Headline 6', 
      description: 'Please add your content here. Keep it short and simple. And smile :)' 
    },
    // Menambahkan gambar baru
    { 
      src: 'example1.jpg', 
      title: 'Headline 7', 
      description: 'Please add your content here. Keep it short and simple. And smile :)' 
    },
    { 
      src: 'example1.jpg', 
      title: 'Headline 8', 
      description: 'Please add your content here. Keep it short and simple. And smile :)' 
    },
  ];

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'normal', fontSize: '1.2rem', color: '#227B94' }}>
        RANGKAIAN
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '2.5rem', color: '#16325B' }}>
        Acara
      </Typography>
      <Grid container spacing={5}>
        {acara.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ backgroundColor: '#227B94', color: 'white', borderRadius: '16px' }}>
              <Grid container>
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    image={item.src} // Menggunakan src sebagai sumber gambar
                    alt={item.title}
                    sx={{ height: '100%', width: '60%', borderTopLeftRadius: '16px', borderTopRightRadius: '20px' }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="white" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'semibold' }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AgendaAcara;
