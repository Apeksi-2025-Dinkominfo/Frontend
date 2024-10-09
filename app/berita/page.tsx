import { Box, Grid, Typography, Button } from '@mui/material';
import Link from 'next/link';
import {
  fetchNewsItems,
  getTruncatedTitle,
  getTruncatedBody,
  NewsItem,
} from '../utils/beritaData';
import { format } from 'date-fns';

const BeritaPage = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const newsItems: NewsItem[] = await fetchNewsItems();
  const itemsPerPage = 10;

  const currentPage = Number(searchParams.page) || 1;
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box sx={{ mt: 4, px: 4, py: 4 }}>
      <Typography
        variant="h5"
        className="text-body font-semibold"
        sx={{ mb: 4, textAlign: 'right' }}
      >
        Info Suroboyo
      </Typography>

      <Grid container spacing={4}>
        {currentItems.map((item) => (
          <Grid item xs={12} sm={6} key={item.id}>
            <Link href={`/berita/${item.id}`} passHref>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#FFFFFF',
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                  width: '100%',
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src={item.images}
                  sx={{
                    width: '100%',
                    height: 120,
                    borderRadius: 1,
                    objectFit: 'cover',
                    mb: 2,
                  }}
                />
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#000',
                      mb: 1,
                      overflowWrap: 'break-word',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap', 
                    }}
                  >
                    {getTruncatedTitle(item.tittle)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#333',
                      mb: 1,
                      overflowWrap: 'break-word',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3, 
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {getTruncatedBody(item.body)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#777' }}>
                    {item.location} - {format(new Date(item.date), 'dd MMM yyyy')}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Numeric Pagination Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <Link key={page} href={`?page=${page}`} passHref>
            <Button
              variant={page === currentPage ? 'contained' : 'outlined'}
              sx={{ mx: 1 }}
            >
              {page}
            </Button>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default BeritaPage;
