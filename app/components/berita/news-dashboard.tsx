'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  List,
  ListItem,
  Paper,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Link from 'next/link';
import {
  NewsItem,
  SurabayaItem,
  fetchNewsItems,
  formatDate,
} from '../../utils/beritaData';

export default function NewsDashboard() {
  const [apeksiNews, setApeksiNews] = useState<NewsItem[]>([]);
  const [surabayaNews, setSurabayaNews] = useState<SurabayaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [apeksiData] = await Promise.all([fetchNewsItems()]);
      console.log('Apeksi Data:', apeksiData);
      setApeksiNews(apeksiData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay && apeksiNews.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % apeksiNews.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, apeksiNews.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % apeksiNews.length);
    setAutoPlay(false);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + apeksiNews.length) % apeksiNews.length
    );
    setAutoPlay(false);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <Box sx={{ p: 3, bgcolor: '#1e3a8a' }}>
              <Typography
                variant="h5"
                sx={{ mb: 2, color: 'white', fontWeight: 'bold' }}
              >
                Berita Apeksi
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: '200px', md: '300px' },
                  overflow: 'hidden',
                  borderRadius: 2,
                }}
              >
                {apeksiNews.length > 0 && (
                  <>
                    <Link
                      href={`/berita/${apeksiNews[currentIndex].id}`}
                      passHref
                    >
                      <Box
                        component="img"
                        src={apeksiNews[currentIndex]?.images}
                        alt={apeksiNews[currentIndex]?.tittle}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          cursor: 'pointer',
                        }}
                      />
                    </Link>
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background:
                          'linear-gradient(transparent, rgba(0,0,0,0.8))',
                        p: 2,
                      }}
                    >
                      <Link
                        href={`/berita/${apeksiNews[currentIndex].id}`}
                        passHref
                      >
                        <Typography
                          variant="subtitle1"
                          color="white"
                          sx={{ cursor: 'pointer' }}
                        >
                          {apeksiNews[currentIndex]?.tittle}
                        </Typography>
                      </Link>
                    </Box>

                    <IconButton
                      sx={{
                        position: 'absolute',
                        left: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'rgba(255,255,255,0.3)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' },
                      }}
                      onClick={handlePrev}
                    >
                      <ArrowBack />
                    </IconButton>

                    <IconButton
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'rgba(255,255,255,0.3)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' },
                      }}
                      onClick={handleNext}
                    >
                      <ArrowForward />
                    </IconButton>

                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: 1,
                      }}
                    >
                      {apeksiNews.map((_, index) => (
                        <Box
                          key={index}
                          onClick={() => handleDotClick(index)}
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor:
                              index === currentIndex
                                ? 'primary.main'
                                : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                          }}
                        />
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Link href="/berita" passHref>
          <Typography
            variant="button"
            sx={{
              textDecoration: 'underline',
              fontWeight: 'bold',
              color: '#1e3a8a',
              cursor: 'pointer',
            }}
          >
            Lihat Semua Berita
          </Typography>
        </Link>
      </Box>
    </Container>
  );
}

function FormattedDate({ date }: { date: string }) {
  const [formattedDate, setFormattedDate] = useState(date);

  useEffect(() => {
    setFormattedDate(formatDate(date)); // Assuming formatDate is synchronous
  }, [date]);

  return (
    <Typography variant="caption" color="text.secondary">
      {formattedDate}
    </Typography>
  );
}
