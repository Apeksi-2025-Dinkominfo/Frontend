import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    Chip,
    Button,
  } from '@mui/material';
  
  export default function Jadwal() {
    const events = [
      {
        image: '/balaikota.webp',
        headline: 'Headline',
        time: '07:00 - 09:00',
        description:
          'Please add your content here. Keep it short and simple. And smile :)',
        acara: [
          'Gala Dinner',
          'Malam Apresiasi',
          'Pentas Budaya',
          'Pemberian Piagam',
          'Live Music',
        ],
        dresscode: 'Hitam Putih',
        location: 'Balai Kota',
      },
      {
        image: '/balaikota.webp',
        headline: 'Headline',
        time: '07:00 - 09:00',
        description:
          'Please add your content here. Keep it short and simple. And smile :)',
        acara: [
          'Gala Dinner',
          'Malam Apresiasi',
          'Pentas Budaya',
          'Pemberian Piagam',
          'Live Music',
        ],
        dresscode: 'Hitam Putih',
        location: 'Balai Kota',
      },
    ];
  
    return (
      <Box
        sx={{
          mt: '-100px',
          pt: '120px',
          pb: 6,
          px: { xs: 2, md: 4 },
          backgroundColor: '#227B94',
          backgroundImage: 'url(/lingkaranJadwal.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left -50px top -200px',
          backgroundSize: '700px 700px',
          color: '#fff',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          variant="h6"
          className="text-white font-medium"
          sx={{ textAlign: 'right', fontFamily: 'Poppins', letterSpacing: '5px' }}
        >
          Rangkaian
        </Typography>
        <Typography
          variant="h6"
          className="text-body font-semibold"
          sx={{ mb: 4, textAlign: 'right', fontSize: '39px' }}
        >
          Jadwal Munas.
        </Typography>
        <Grid container spacing={9} justifyContent="center">
          {events.map((event, index) => (
            <Grid
              item
              key={index}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card
                sx={{
                  width: '342px',
                  height: '598px',
                  backgroundColor: '#fff',
                  color: '#000',
                  borderRadius: '10px',
                  boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: '342px',
                      height: '222px',
                      objectFit: 'cover',
                      transition: '0.3s ease-in-out',
                      '&:hover': {
                        filter: 'brightness(50%)',
                      },
                    }}
                    image={event.image}
                    alt="Event Image"
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0,
                      transition: '0.3s ease-in-out',
                      '&:hover': {
                        opacity: 1,
                      },
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: '#fff', fontWeight: 600 }}
                    >
                      {event.location}
                    </Typography>
                  </Box>
                </Box>
  
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {event.headline}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {event.time}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    {event.description}
                  </Typography>
                  <Box sx={{ mt: 2, borderTop: '1px solid #ddd', pt: 2 }}>
                    <Typography variant="subtitle2" style={{fontFamily:'Poppins'}}>Acara:</Typography>
                    <Box
                      sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}
                    >
                      {event.acara.map((acaraItem, idx) => (
                        <Button
                          key={idx}
                          variant="outlined"
                          size="small"
                          sx={{
                            borderRadius: '20px',
                            padding: '2px 10px',
                            textTransform: 'none',
                            fontSize: '12px',
                            color: '#3C3C43',
                            borderColor: '#3C3C43',
                          }}
                        >
                          {acaraItem}
                        </Button>
                      ))}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      mt: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 0.5, fontFamily: 'Poppins' }}
                    >
                      Dresscode
                    </Typography>
                    <Chip
                      label={event.dresscode}
                      size="small"
                      sx={{
                        backgroundColor: '#3C3C43',
                        color: '#fff',
                        fontSize: '14px',
                        padding: '5px',
                        height: 'auto',
                        '& .MuiChip-label': {
                          fontSize: '13px',
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
  