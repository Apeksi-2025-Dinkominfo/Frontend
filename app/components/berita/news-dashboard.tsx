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
  SurabayFetch,
  formatDate,
} from '../../utils/beritaData';

export default function NewsDashboard() {
  const [apeksiNews, setApeksiNews] = useState<NewsItem[]>([]);
  const [surabayaNews, setSurabayaNews] = useState<SurabayaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [apeksiData, surabayaData] = await Promise.all([
        fetchNewsItems(),
        SurabayFetch(),
      ]);
      console.log('Apeksi Data:', apeksiData);
      console.log('Surabaya Data:', surabayaData);
      setApeksiNews(apeksiData);
      setSurabayaNews(surabayaData);
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

  const getImageUrl = (item: SurabayaItem) => {
    return `https://surabaya.go.id/uploads/images/posts/post_${item.id}/${item.feature_image_url}`;
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
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, bgcolor: '#f0f9ff', height: '100%' }}>
              <Typography
                variant="h5"
                sx={{ mb: 2, color: '#1e3a8a', fontWeight: 'bold' }}
              >
                Surabaya
              </Typography>
              <List
                sx={{
                  width: '100%',
                  maxHeight: { xs: '200px', md: '300px' },
                  overflow: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '0.4em',
                  },
                  '&::-webkit-scrollbar-track': {
                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,.1)',
                    borderRadius: '4px',
                  },
                }}
              >
                {[...surabayaNews]
                  .sort(
                    (a, b) =>
                      new Date(b.publish_date).getTime() -
                      new Date(a.publish_date).getTime()
                  )
                  .map((item) => (
                    <ListItem
                      key={item.id}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 2,
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: 'rgba(0,0,0,0.04)',
                        },
                      }}
                    >
                      <Link href={`/berita/${item.id}`} passHref>
                        <Box
                          component="img"
                          src={getImageUrl(item)}
                          alt={item.title}
                          sx={{
                            width: 80,
                            height: 50,
                            objectFit: 'cover',
                            borderRadius: 1,
                          }}
                        />
                      </Link>
                      <Box>
                        <Link href={`/berita/${item.id}`} passHref>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 'bold', mb: 0.5 }}
                          >
                            {item.title}
                          </Typography>
                        </Link>
                        <FormattedDate date={item.publish_date} />
                      </Box>
                    </ListItem>
                  ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Link href="/berita" passHref>
          <Typography
            variant="button"
            sx={{
              color: '#1e3a8a',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
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
