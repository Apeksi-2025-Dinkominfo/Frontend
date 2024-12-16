import { fetchNewsItems, SurabayFetch, formatDate } from '../../utils/beritaData'
import { notFound } from 'next/navigation'
import { Container, Typography, Box, Paper, Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default async function NewsDetail({ params }: { params: { id: string } }) {
  const [apeksiNews, surabayaNews] = await Promise.all([
    fetchNewsItems(),
    SurabayFetch()
  ])

  const newsItem = apeksiNews.find(news => news.id.toString() === params.id) ||
                   surabayaNews.find(news => news.id.toString() === params.id)

  if (!newsItem) {
    notFound()
  }

  const isApeksiNews = 'tittle' in newsItem

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Link href="/berita" passHref>
          <Button startIcon={<ArrowBackIcon />} variant="text" color="primary">
            Kembali ke Semua Berita
          </Button>
        </Link>
      </Box>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          {isApeksiNews ? newsItem.tittle : newsItem.title}
        </Typography>
        <Box sx={{ my: 3, position: 'relative', width: '100%', height: '400px' }}>
          <Image
            src={isApeksiNews ? newsItem.images : `https://surabaya.go.id/uploads/images/posts/post_${newsItem.id}/${newsItem.feature_image_url}`}
            alt={isApeksiNews ? newsItem.tittle : newsItem.title}
            layout="fill"
            objectFit="cover"
            style={{ borderRadius: '8px' }}
          />
        </Box>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {formatDate(isApeksiNews ? newsItem.date : newsItem.publish_date)}
        </Typography>
        <Typography variant="body1" component="div" sx={{ mt: 3 }}>
          {isApeksiNews ? (
            <p>{newsItem.body}</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
          )}
        </Typography>
        {isApeksiNews && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Location: {newsItem.location}
          </Typography>
        )}
      </Paper>
    </Container>
  )
}

