"use client"

import React, { useRef, useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';

const AgendaAcara = () => {
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

  const [visibleItems, setVisibleItems] = useState(new Array(acara.length).fill(false));

  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              const newVisibleItems = [...prev];
              newVisibleItems[index] = true;
              return newVisibleItems;
            });
          } else {
            setVisibleItems((prev) => {
              const newVisibleItems = [...prev];
              newVisibleItems[index] = false;
              return newVisibleItems;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardsRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 'normal', fontSize: '1.2rem', color: '#227B94' }}>
        Ini lho rek rangkaian acara Munas VIII 2024 Surabaya
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 'bold', fontSize: '2.5rem', color: '#16325B' }}>
        Jangan sampai ketinggalan rangkaian acara Munas VIII 2024 di Kota Surabaya ya rek!
      </Typography>
      <Grid container spacing={5}>
        {acara.map((item, index) => (
          <Grid 
            item 
            xs={12} 
            md={6} 
            key={index}
            ref={(el) => { cardsRefs.current[index] = el; }}  // No return value here
            data-index={index}
            sx={{
              opacity: visibleItems[index] ? 1 : 0,
              transform: visibleItems[index] ? 'translateY(0)' : 'translateY(50px)',
              transition: `opacity 0.6s ease, transform 0.6s ease ${index * 0.2}s`,
            }}
          >
            <Card sx={{ backgroundColor: '#227B94', color: 'white', borderRadius: '16px' }}>
              <Grid container>
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    image={item.src}
                    alt={item.title}
                    sx={{ height: '100%', width: '60%', borderTopLeftRadius: '16px', borderTopRightRadius: '20px' }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontFamily: 'Plus Jakarta Sans' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="white" sx={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 'semibold' }}>
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
