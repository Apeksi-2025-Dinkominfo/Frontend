import { Box, Grid, Typography } from '@mui/material';
import { beritaItems, getTruncatedTitle, getTruncatedBody } from '../utils/beritaData';
import Link from 'next/link';

const BeritaPage = () => {
  return (
    <Box sx={{ mt: 4, px: 4, py: 4 }}>
      <Typography variant="h5" className="text-body font-semibold text-5xl" sx={{ mb: 4, textAlign: 'Right' }}>
        Info Suroboyo
      </Typography>

      <Grid container spacing={4} direction="column">
        {beritaItems.map((item) => (
          <Grid item xs={12} key={item.id_berita}>
            <Link href={`/berita/${item.id_berita}`} passHref>
              <Box
                sx={{
                  display: 'flex',
                  backgroundColor: '#FFFFFF',
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: 200,
                    height: 120,
                    borderRadius: 1,
                    objectFit: 'cover',
                    marginRight: 2, 
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000', mb: 1 }}>
                    {getTruncatedTitle(item.title)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333', mb:1 }}>
                    {getTruncatedBody(item.body)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#777' }}>
                    {item.location} - {item.date}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BeritaPage;
