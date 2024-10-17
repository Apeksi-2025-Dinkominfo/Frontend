import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Link
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function RentalTable() {
  const rows = [
    { no: 1, name: 'PT ADI SARANA ARMADA TBK (ASSA)', phone: '081911500369', address: 'Jl. Raya Prapen No.63, Panjang Jiwo, Kec. Tenggilis Mejoyo, Surabaya, Jawa Timur 60299' },
    { no: 2, name: 'Kalla Transport & Logistic Surabaya', phone: '08114141116', address: 'Jl. Raya Taman No.113-137, Taman, Kec. Taman, Kabupaten Sidoarjo, Jawa Timur 61257' },
    { no: 3, name: 'TRAC Rental Mobil', phone: '08111873210', address: 'Jl. Raya Jemursari No.224 - 228, Tenggilis Mejoyo, Kec. Tenggilis Mejoyo, Surabaya, Jawa Timur 60292' },
    { no: 4, name: 'CV. Tunas Jaya', phone: '08131518750', address: 'Jl. Musi No. 29, Surabaya' },
    { no: 5, name: 'PT Diantama Usaha Berkah', phone: '081235556999', phoneAlt: '08165406702', address: 'Taman Suko Asri Blok AA 18, Sukodono, Sidoarjo' },
    { no: 6, name: 'Fafa Wisata Trans', phone: '081216859936', address: 'Kec. Prambon, Sidoarjo' },
    { no: 7, name: 'CV. PUSAKA LIMA TIGA SURABAYA (Nurhayati)', phone: '08113350606', address: 'Jl. Rungkut Mejoyo selatan V / 21-23' },
  ];

  // Fungsi untuk mengubah nomor telepon menjadi tautan WhatsApp
  const formatWhatsAppLink = (phone) => {
    const formattedPhone = phone.replace(/\s+/g, '').replace(/^0/, '62'); // Ganti 0 di awal dengan 62 untuk format Indonesia
    return `https://wa.me/${formattedPhone}`;
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" align="center" gutterBottom>
        RENTAL MOBIL DI SURABAYA
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Nama Penyedia</TableCell>
            <TableCell>Nomor Telepon</TableCell>
            <TableCell>Alamat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.no}>
              <TableCell>{row.no}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <Link href={formatWhatsAppLink(row.phone)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                </Link>
                {row.phoneAlt && (
                  <>
                    <br />
                    <Link href={formatWhatsAppLink(row.phoneAlt)} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                    </Link>
                  </>
                )}
              </TableCell>
              <TableCell>{row.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RentalTable;
