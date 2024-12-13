import AllNews from '../components/berita/all-news'
import { fetchNewsItems, SurabayFetch } from '../utils/beritaData'
import { Container, Typography, Box } from '@mui/material'

export default async function BeritaPage() {
  const [apeksiNews, surabayaNews] = await Promise.all([
    fetchNewsItems(),
    SurabayFetch()
  ])

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default', 
      py: 8 
    }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Semua Berita
        </Typography>
        <AllNews apeksiNews={apeksiNews} surabayaNews={surabayaNews} />
      </Container>
    </Box>
  )
}

