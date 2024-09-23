import { Box, Grid, Typography } from '@mui/material';
import { beritaItems, getTruncatedTitle, getTruncatedBody } from '../utils/beritaData';
import Link from 'next/link';

const BeritaPage = () => {
  return (
    <Box sx={{ mt: 4, px: 4, py: 4 }}>
      <Typography variant="h5" sx={{ mb: 4, textAlign: 'center', color: '#333' }}>
        Semua Berita
      </Typography>

      <Grid container spacing={4}>
        {beritaItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id_berita}>
            <Link href={`/berita/${item.id_berita}`} passHref>
              <Box
                sx={{
                  backgroundColor: '#FFFFFF',
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Box component="img" src={item.image} alt={item.title} sx={{ width: '100%', borderRadius: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000', mb: 1, mt: 2 }}>
                  {getTruncatedTitle(item.title)}
                </Typography>
                <Typography variant="body2" sx={{ color: '#333', mb: 2 }}>
                  {getTruncatedBody(item.body)}
                </Typography>
                <Typography variant="caption" sx={{ color: '#777' }}>
                  {item.location} - {item.date}
                </Typography>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BeritaPage;
