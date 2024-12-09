'use client';

import {
  Box,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  Card,
  CardContent,
  IconButton,
  CardMedia,
} from '@mui/material';
import { useTheme } from '@mui/system';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchNewsItems, apeksiNews } from '../utils/beritaData';
import '@fontsource/plus-jakarta-sans';
import { ArrowForward, ArrowBack } from '@mui/icons-material';

const Berita = () => {
  const theme = useTheme();

  const [beritaItems, setBeritaItems] = useState<BeritaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Index for the three-card section

  interface BeritaItem {
    id: number;
    tittle: string;
    images: string;
    location: string;
    date: string;
    body: string;
  }
  

  useEffect(() => {
    const fetchData = async () => {
      const news = await fetchNewsItems();
      setBeritaItems(news);
    };
    fetchData();
  }, []);

  const handleNext = () => {
    if (currentIndex < beritaItems.length - 1) {
      setCurrentIndex(currentIndex + 1); // Go to the next item
    } else {
      setCurrentIndex(0); // Loop back to the first item
    }
  };

  // Handle "Previous" button click
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Go to the previous item
    } else {
      setCurrentIndex(beritaItems.length - 1); // Loop to the last item
    }
  };

  return (
    <div className="relative">
  {/* Gambar dekoratif di luar Box */}
  {/* <div
    className="absolute -top-1/3 right-[-100px] w-[20%] h-[140vh] z-0 bg-no-repeat bg-cover scale-110"
    style={{
      backgroundImage: "url('/newsbg.png')",
    }}
  ></div> */}

<Box
  className="bg-second relative z-10"
  sx={{
    mt: 4,
    px: 2,
    py: 3,
    fontFamily: 'Plus Jakarta Sans',
    maxWidth: '900px',
    mx: 'auto',
    borderRadius: '20px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: 2,
  }}
>
  {/* Kurva Background */}
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      zIndex: 0,
    }}
  ></Box>

  <Typography
    className="text-2xl font-semibold text-body"
    sx={{ mb: 2, color: '#FFFFFF', position: 'relative', zIndex: 1 }}
  >
    Berita APEKSI
  </Typography>

  <Grid container spacing={2} alignItems="stretch">
    {/* Carousel for Berita APEKSI */}
    <Grid item xs={12} md={7}>
      <Card
        sx={{
          backgroundColor: '#78B7D0',
          position: 'relative',
          overflow: 'hidden',
          height: 300,
          borderRadius: '12px',
        }}
      >
        <Link href={`/berita/${beritaItems[currentIndex]?.id}`} passHref>
          <CardMedia
            component="img"
            src={beritaItems[currentIndex]?.images}
            alt={beritaItems[currentIndex]?.tittle}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              cursor: 'pointer',
            }}
          />
        </Link>

        <CardContent
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            color: '#FFFFFF',
            padding: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', color: '#FFFFFF' }}
          >
            {beritaItems[currentIndex]?.tittle}
          </Typography>
        </CardContent>

        {/* Arrow navigation */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '8px',
            transform: 'translateY(-50%)',
            zIndex: 10,
          }}
        >
          <IconButton
            onClick={handlePrevious}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '50%',
              padding: 0.5,
              boxShadow: 2,
              '&:hover': { backgroundColor: '#ddd' },
            }}
          >
            <ArrowBack />
          </IconButton>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: '8px',
            transform: 'translateY(-50%)',
            zIndex: 10,
          }}
        >
          <IconButton
            onClick={handleNext}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '50%',
              padding: 0.5,
              boxShadow: 2,
              '&:hover': { backgroundColor: '#ddd' },
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>

        {/* Custom Pagination Dots */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            gap: 0.5,
          }}
        >
          {beritaItems.slice(0, 4).map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: index === currentIndex ? '#fff' : '#bbb',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            />
          ))}
        </Box>
      </Card>
    </Grid>

    {/* Berita Surabaya Section */}
    <Grid item xs={12} md={5} mb={0}>
      <Box
        sx={{
          padding: 1,
          borderRadius: 2,
          height: '100%', // Pastikan stretch ke tinggi penuh
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 'bold', color: 'black', mt: -3, textAlign: 'right' }}
        >
          Surabaya
        </Typography>
        {(apeksiNews.slice(0, 4) || []).map((news) => (
          <Box key={news.id} sx={{ display: 'flex', mb: 2 }}>
            <Link href={`/berita/${news.id}`} passHref>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  cursor: 'pointer',
                  gap: 1,
                }}
              >
                <CardMedia
                  component="img"
                  src={news.images}
                  alt={news.tittle}
                  sx={{
                    height: 60,
                    width: 80,
                    objectFit: 'cover',
                    borderRadius: 2,
                  }}
                />
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 'bold', color: 'white' }}
                  >
                    {news.tittle}
                  </Typography>
                  <Typography variant="caption" color="white">
                    {news.location} -{' '}
                    {new Date(news.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      year: 'numeric',
                      month: 'long',
                    })}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 0.5,
                      color: 'black',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  ></Typography>
                </Box>
              </Box>
            </Link>
          </Box>
        ))}
      </Box>
    </Grid>
  </Grid>

  <Box sx={{ position: 'absolute', bottom: 16, right: 20 }}>
    <Button
      variant="outlined"
      sx={{
        borderColor: '#8AB393',
        color: '#8AB393',
        borderRadius: '20px',
        padding: '8px 16px',
        fontSize: '0.8rem',
        '&:hover': {
          borderColor: '#8AB393',
          backgroundColor: '#F0FFF4',
        },
      }}
      href="/berita"
    >
      Lihat semua berita
    </Button>
  </Box>
</Box>

</div>
  );
};

export default Berita;
