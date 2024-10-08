"use client"
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  fetchNewsItems,
  getLatestNews,
  getTruncatedBody,
  getTruncatedTitle,
  NewsItem,
} from '../utils/beritaData';

const Berita = () => {
  const maxItemsToShow = 20;
  const visibleItemsCount = 5; 

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [beritaItems, setBeritaItems] = useState<NewsItem[]>([]);
  const [mainNews, setMainNews] = useState<NewsItem | null>(null); 
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const news = await fetchNewsItems(); 
      setBeritaItems(news.slice(0, maxItemsToShow)); 
      const latestNews = getLatestNews(news);
      setMainNews(latestNews);
    };
    fetchData();
  }, []);

  const sortedItems = [...beritaItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentItems = sortedItems.slice(0, maxItemsToShow);
  const displayedItems = currentItems.slice(
    currentIndex,
    currentIndex + visibleItemsCount
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + visibleItemsCount) % currentItems.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [currentItems]);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - visibleItemsCount + currentItems.length) %
        currentItems.length
    );
  };

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + visibleItemsCount) % currentItems.length
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }); // Format: DD MMM YYYY
  };

  if (!mainNews) return <Typography>Loading...</Typography>;

  return (
    <Box className="bg-second" sx={{ mt: 4, px: 4, py: 4 }}>
      <Typography
        className="text-4xl font-semibold text-body"
        sx={{ mb: 2, color: '#FFFFFF' }}
      >
        Info Suroboyo
      </Typography>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Link href={`/berita/${mainNews.id}`} passHref>
            <Box
              component="img"
              src={mainNews.images}
              alt={mainNews.tittle}
              sx={{
                width: '100%',
                height: 320,
                objectFit: 'cover',
                borderRadius: 4,
                cursor: 'pointer', 
              }}
            />
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Link href={`/berita/${mainNews.id}`} passHref>
            <Box sx={{ cursor: 'pointer' }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', color: '#FFFFFF' }}
              >
                {getTruncatedTitle(mainNews.tittle)}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ color: '#CCCCCC' }}
              >
                {mainNews.location} - {formatDate(mainNews.date)}{' '}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  color: '#FFFFFF',
                  textAlign: 'justify', 
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {getTruncatedBody(mainNews.body, 400)} 
              </Typography>
            </Box>
          </Link>
        </Grid>
      </Grid>

      {isMobile ? (
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
      ) : (
        <Box textAlign="right" sx={{ mt: 4, mb: 4 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#8AB393',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => (window.location.href = '/berita')}
          >
            Lihat semua
          </Typography>
        </Box>
      )}

      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{ color: '#FFFFFF' }}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Grid
            container
            spacing={2}
            justifyContent={
              displayedItems.length < 5 ? 'center' : 'space-between'
            }
            alignItems="center"
          >
            {displayedItems.map((item, index) => (
              <Grid
                item
                key={index}
                xs={12}
                sm={6}
                md={4}
                lg={2.4}
                style={{
                  flexBasis: displayedItems.length < 5 ? '20%' : 'auto',
                }}
              >
                <Link href={`/berita/${item.id}`} passHref>
                  <Box
                    sx={{
                      width: '100%',
                      height: 250,
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: 3,
                      backgroundColor: '#fff',
                      cursor: 'pointer',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={item.images}
                      sx={{
                        width: '100%',
                        height: '120px',
                        objectFit: 'cover',
                      }}
                    />
                    <Box sx={{ padding: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          color: '#000',
                          fontSize: '0.85rem',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {getTruncatedTitle(item.tittle, 50)}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{ fontSize: '0.75rem' }}
                      >
                        {item.location} - {formatDate(item.date)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          fontSize: '0.75rem',
                          color: '#555',
                          textAlign: 'justify',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {getTruncatedBody(item.body, 350)} {/* Show 350 characters for normal news */}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
          <IconButton
            sx={{ color: '#FFFFFF' }}
            onClick={handleNext}
            disabled={currentIndex + visibleItemsCount >= currentItems.length}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Berita;
