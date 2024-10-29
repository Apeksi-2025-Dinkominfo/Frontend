import { Box, Typography, Button, Paper } from '@mui/material';
import Link from 'next/link';
import { fetchNewsItems, apeksiNews, NewsItem } from '../../utils/beritaData'; // Import apeksiNews
import { format } from 'date-fns';

const BeritaDetail = async ({ params }: { params: { id_berita: string } }) => {
  const { id_berita } = params;

  // Fetch news items from the backend
  const newsItems: NewsItem[] = await fetchNewsItems();
  let berita = newsItems.find((item) => item.id.toString() === id_berita);

  // If not found in fetched news items, check apeksiNews
  if (!berita) {
    berita = apeksiNews.find((item) => item.id.toString() === id_berita);
  }

  // If no news item is found, show a not found message
  if (!berita) {
    return (
      <Box sx={{ mt: 4, px: 4, py: 4 }}>
        <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ color: '#333' }}>
            Berita tidak ditemukan.
          </Typography>
          <Link href="/berita" passHref>
            <Button variant="contained" sx={{ mt: 2 }}>
              Kembali ke Semua Berita
            </Button>
          </Link>
        </Paper>
      </Box>
    );
  }

  // Display the news item details
  return (
    <Box sx={{ mt: 4, px: 4, py: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, overflow: 'hidden' }}>
        <Box sx={{ mb: 2 }}>
          <Link href="/berita" passHref>
            <Button variant="outlined" sx={{ mb: 2 }}>
              Kembali
            </Button>
          </Link>
        </Box>
        <Typography className='text-4xl font-semibold text-body'>
          {berita.tittle}
        </Typography>
        <Typography className='text-l font-light text-gray'>
          {berita.location} - {format(new Date(berita.date), 'dd MMM yyyy')}
        </Typography>
        <Box
          component="img"
          src={berita.images}
          sx={{ width: '100%', borderRadius: 1, mt: 2 }}
        />
        <Typography variant="body1" sx={{ mt: 2, color: '#333', overflowWrap: 'break-word' }}>
          {berita.body.split('\n').map((paragraph, index) => (
            <span key={index}>
              {paragraph}
              <br />
            </span>
          ))}
        </Typography>
      </Paper>
    </Box>
  );
};

export default BeritaDetail;
