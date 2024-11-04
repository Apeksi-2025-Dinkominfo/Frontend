import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Link, Container
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

function RentalTable() {
  const rows = [
    { no: 1, name: 'PT ADI SARANA ARMADA TBK (ASSA)', phone: '081911500369', address: 'Jl. Raya Prapen No.63, Panjang Jiwo, Kec. Tenggilis Mejoyo, Surabaya, Jawa Timur 60299' },
    { no: 2, name: 'Kalla Transport & Logistic Surabaya', phone: '08114141116', address: 'Jl. Raya Taman No.113-137, Taman, Kec. Taman, Kabupaten Sidoarjo, Jawa Timur 61257' },
    { no: 3, name: 'TRAC Rental Mobil', phone: '08111873210', address: 'Jl. Raya Jemursari No.224 - 228, Tenggilis Mejoyo, Kec. Tenggilis Mejoyo, Surabaya, Jawa Timur 60292' },
    { no: 4, name: 'CV. Tunas Jaya', phone: '08131518750', address: 'Jl. Musi No. 29, Surabaya' },
    { no: 5, name: 'PT Diantama Usaha Berkah', phone: 'Nomor 1', phoneAlt: 'Nomor 2', address: 'Taman Suko Asri Blok AA 18, Sukodono, Sidoarjo' },
    { no: 6, name: 'Fafa Wisata Trans', phone: '081216859936', address: 'Kec. Prambon, Sidoarjo' },
    { no: 7, name: 'CV. PUSAKA LIMA TIGA SURABAYA (Nurhayati)', phone: '08113350606', address: 'Jl. Rungkut Mejoyo selatan V / 21-23' },
  ];

  // Fungsi untuk mengubah nomor telepon menjadi tautan
  const formatPhoneLink = (phone) => {
    const formattedPhone = phone.replace(/\s+/g, '').replace(/^0/, '62'); // Ganti 0 di awal dengan 62 untuk format Indonesia
    return `tel:+${formattedPhone}`;
  };

  return (
    <Container sx={{ backgroundColor: '#78B7D0', padding: 3, borderRadius: 2 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ color: 'white', marginBottom: 3 }}>
        RENTAL MOBIL DI SURABAYA
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: '#227B94', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>No.</TableCell>
              <TableCell sx={{ color: 'white' }}>Nama Penyedia</TableCell>
              <TableCell sx={{ color: 'white' }}>Nomor Telepon</TableCell>
              <TableCell sx={{ color: 'white' }}>Alamat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.no}>
                <TableCell sx={{ color: 'white' }}>{row.no}</TableCell>
                <TableCell sx={{ color: 'white' }}>{row.name}</TableCell>
                <TableCell>
                  <Link
                    href={formatPhoneLink(row.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'white',
                      '&:hover': { transform: 'scale(1.2)', transition: 'transform 0.3s' },
                    }}
                  >
                    <PhoneIcon sx={{ verticalAlign: 'middle', color: '#25D366' }} />
                  </Link>
                  {row.phoneAlt && (
                    <>
                      <br />
                      <Link
                        href={formatPhoneLink(row.phoneAlt)}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: 'white',
                          '&:hover': { transform: 'scale(1.2)', transition: 'transform 0.3s' },
                        }}
                      >
                        <PhoneIcon sx={{ verticalAlign: 'middle', color: '#25D366' }} />
                      </Link>
                    </>
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'justify', color: 'white' }}>{row.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default RentalTable;
