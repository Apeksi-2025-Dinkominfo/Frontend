import { Box, Typography, Button, Paper } from '@mui/material';
import { beritaItems } from '../../utils/beritaData';
import Link from 'next/link';

const BeritaDetail = ({ params }: { params: { id_berita: string } }) => {
  const { id_berita } = params; // Get id_berita from params

  const berita = beritaItems.find((item) => item.id_berita.toString() === id_berita);

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

  return (
    <Box sx={{ mt: 4, px: 4, py: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Link href="/berita" passHref>
            <Button variant="outlined" sx={{ mb: 2 }}>
              Kembali
            </Button>
          </Link>
        </Box>
        <Typography variant="h4" sx={{ color: '#1A4C63', mb: 2 }}>
          {berita.title}
        </Typography>
        <Typography variant="caption" sx={{ color: '#777' }}>
          {berita.location} - {berita.date}
        </Typography>
        <Box
          component="img"
          src={berita.image}
          alt={berita.title}
          sx={{ width: '100%', borderRadius: 1, mt: 2 }}
        />
        <Typography variant="body1" sx={{ mt: 2, color: '#333' }}>
          {berita.body}
        </Typography>
      </Paper>
    </Box>
  );
};

export default BeritaDetail;
