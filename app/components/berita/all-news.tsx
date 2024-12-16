'use client'

import { useState } from 'react'
import {
  Tabs, Tab, Box, Card, CardContent, CardMedia, Typography, Grid, Pagination
} from '@mui/material'
import Link from 'next/link'
import { NewsItem, SurabayaItem, formatDate } from '../../utils/beritaData'

interface AllNewsProps {
  apeksiNews: NewsItem[]
  surabayaNews: SurabayaItem[]
}

const ITEMS_PER_PAGE = 6 // Number of items per page

export default function AllNews({ apeksiNews, surabayaNews }: AllNewsProps) {
  const [value, setValue] = useState(0)
  const [pageApeksi, setPageApeksi] = useState(1)
  const [pageSurabaya, setPageSurabaya] = useState(1)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handlePageChangeApeksi = (event: React.ChangeEvent<unknown>, page: number) => {
    setPageApeksi(page)
  }

  const handlePageChangeSurabaya = (event: React.ChangeEvent<unknown>, page: number) => {
    setPageSurabaya(page)
  }

  const paginatedApeksiNews = apeksiNews.slice(
    (pageApeksi - 1) * ITEMS_PER_PAGE,
    pageApeksi * ITEMS_PER_PAGE
  )
  const paginatedSurabayaNews = surabayaNews.slice(
    (pageSurabaya - 1) * ITEMS_PER_PAGE,
    pageSurabaya * ITEMS_PER_PAGE
  )

  console.log(surabayaNews)

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="news tabs">
          <Tab label="Berita Apeksi" />
          <Tab label="Surabaya" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          {paginatedApeksiNews.map((news) => (
            <Grid item xs={12} sm={6} md={4} key={news.id}>
              <Link href={`/berita/${news.id}`} passHref style={{ textDecoration: 'none' }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={news.images}
                    alt={news.tittle}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {news.tittle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(news.date)}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
        <Pagination
          sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
          count={Math.ceil(apeksiNews.length / ITEMS_PER_PAGE)}
          page={pageApeksi}
          onChange={handlePageChangeApeksi}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          {paginatedSurabayaNews.map((news) => (
            <Grid item xs={12} sm={6} md={4} key={news.id}>
              <Link href={`/berita/${news.id}`} passHref style={{ textDecoration: 'none' }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://surabaya.go.id/uploads/images/posts/post_${news.id}/${news.feature_image_url}`}
                    alt={news.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {news.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(news.publish_date)}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
        <Pagination
          sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
          count={Math.ceil(surabayaNews.length / ITEMS_PER_PAGE)}
          page={pageSurabaya}
          onChange={handlePageChangeSurabaya}
        />
      </TabPanel>
    </Box>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`news-tabpanel-${index}`}
      aria-labelledby={`news-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}
