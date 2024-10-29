"use client"

import {
  Box,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { useTheme } from '@mui/system';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  fetchNewsItems,
  getTruncatedBody,
  getTruncatedTitle,
  apeksiNews,
  NewsItem,
} from '../utils/beritaData';
import '@fontsource/plus-jakarta-sans'; // Import Plus Jakarta Sans font

const Berita = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State for fetched news items
  const [beritaItems, setBeritaItems] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Index for the three-card section

  useEffect(() => {
    const fetchData = async () => {
      const news = await fetchNewsItems();
      setBeritaItems(news);
    };
    fetchData();
  }, []);

  // Function to handle the "Next" button
  const handleNext = () => {
    if (currentIndex + 3 < apeksiNews.length) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  // Function to handle the "Previous" button
  const handlePrevious = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  return (
    <Box className="bg-second" sx={{ mt: 4, px: 4, py: 4, fontFamily: 'Plus Jakarta Sans' }}>
      <Typography
        className="text-4xl font-semibold text-body"
        sx={{ mb: 2, color: '#FFFFFF' }}
      >
        Info Suroboyo
      </Typography>

      <Grid container spacing={4}>
        {/* Apeksi News Section (Left Side) */}
        <Grid item xs={12} md={7}>
          {/* Main News Card */}
          {apeksiNews[0] && (
            <Card sx={{ mb: 2, backgroundColor: '#78B7D0', color: '#FFFFFF' }}>
              <Link href={`/berita/${apeksiNews[0].id}`} passHref>
                <CardMedia
                  component="img"
                  src={apeksiNews[0].images}
                  alt={apeksiNews[0].tittle}
                  sx={{
                    height: 320,
                    objectFit: 'cover',
                    cursor: 'pointer',
                  }}
                />
              </Link>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {getTruncatedTitle(apeksiNews[0].tittle)}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ color: '#CCCCCC' }}
                >
                  {apeksiNews[0].location} -{' '}
                  {new Date(apeksiNews[0].date).toLocaleDateString('id-ID')}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {getTruncatedBody(apeksiNews[0].body, 150)}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Slider for Other News Items */}
          {!isMobile && ( // Hide the slider on mobile
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Button
                variant="outlined"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                sx={{
                  color: '#8AB393',
                  borderColor: '#8AB393',
                  minWidth: '40px',
                  height: '40px',
                  mr: 1,
                  borderRadius: '50%',
                  '&:hover': {
                    backgroundColor: '#4E4E4E',
                  },
                }}
              >
                &lt;
              </Button>

              <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                {apeksiNews.slice(currentIndex + 1, currentIndex + 4).map((news) => (
                  <Grid item xs={12} sm={4} key={news.id}>
                    <Card sx={{ backgroundColor: '#78B7D0', color: '#FFFFFF' }}>
                      <Link href={`/berita/${news.id}`} passHref>
                        <CardMedia
                          component="img"
                          src={news.images}
                          alt={news.tittle}
                          sx={{
                            height: 160,
                            objectFit: 'cover',
                            cursor: 'pointer',
                          }}
                        />
                      </Link>
                      <CardContent>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {getTruncatedTitle(news.tittle, 60)}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{ color: '#CCCCCC' }}
                        >
                          {news.location} -{' '}
                          {new Date(news.date).toLocaleDateString('id-ID')}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Button
                variant="outlined"
                onClick={handleNext}
                disabled={currentIndex + 3 >= apeksiNews.length - 1}
                sx={{
                  color: '#8AB393',
                  borderColor: '#ffff',
                  minWidth: '40px',
                  height: '40px',
                  ml: 1,
                  borderRadius: '50%', // Make it circular
                  '&:hover': {
                    backgroundColor: '#4E4E4E',
                  },
                }}
              >
                &gt;
              </Button>
            </Box>
          )}
        </Grid>

        {/* Fetched News Section (Right Side) */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              backgroundColor: '#78B7D0',
              padding: 2,
              borderRadius: 2,
              border: '1px solid #8AB393',
              maxWidth: '100%',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black', mb: 2 }}>
              Berita Info Surabaya
            </Typography>
            {(beritaItems.slice(0, 4) || []).map((news) => ( // Show only 4 news items
              <Box key={news.id} sx={{ mb: 4 }}>
                <Link href={`/berita/${news.id}`} passHref>
                  <Box sx={{ cursor: 'pointer' }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 'bold', color: 'black' }}
                    >
                      {getTruncatedTitle(news.tittle)}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ color: '#252525' }}
                    >
                      {news.location} -{' '}
                      {new Date(news.date).toLocaleDateString('id-ID')}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        color: 'black',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {getTruncatedBody(news.body, 150)}
                    </Typography>
                  </Box>
                </Link>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      <Box textAlign="center" sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          sx={{
            borderColor: '#8AB393',
            color: '#8AB393',
            borderRadius: '25px',
            padding: '10px 20px',
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
  );
};

export default Berita;
