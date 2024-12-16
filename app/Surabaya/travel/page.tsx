'use client'
import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Container, Grid, Box, IconButton,
  Icon
} from '@mui/material';

import FaxOutlinedIcon from '@mui/icons-material/FaxOutlined';
import PhoneIcon from '@mui/icons-material/Phone';

function RentalCard() {
  
  const rentalData = [
    { no: 1, name: 'CANDI TOUR', phone: '081332358748', fax:'-', address: ' JL. PETEMON KALI I NO.19 SURABAYA' },
    { no: 2, name: ' KAHA TOUR', phone: '08119295300', fax:'(031) 3536000', address: 'JL. KH MAS MANSYUR 119-121 SURABAYA' },
    { no: 3, name: 'ASHANTY TOUR & MICE ORGANIZER',  phone: '087852138090',fax:'(031) 8782470', address: ' JL. RAYA PANDUGO A-26 RUNGKUT SURABAYA' },
    { no: 4, name: 'HARYONO TOURS & TRAVELS',  phone: '085895121008',fax:'(031) 5034000', address: ' JL. RAYA GUBENG NO.63 ABC SURABAYA' },
    { no: 5, name: ' ANEKA KARTIKA TOURS & TRAVEL', phone: '0811344980',fax:'(031) 5927000', address: 'JL. MANYAR KERTOARJO V NO.50 SURABAYA' },
    { no: 6, name: 'MONAS TOURS & TRAVEL', phone: '081703782117', fax:'(031) 7436565', address: '  VILLA TAMAN TELAGA TJ1 JL. CITRALAND SURABAYA NO.6 SURABAYA' },
    { no: 7, name: 'INFINITE VACATION', phone: '081946068000', fax:' (031) 5682388',address: 'JL. R.A KARTINI NO.123 D SURABAYA' },
    { no: 8, name: ' ELVEKA TOUR & TRAVEL', phone: '081330510719', fax:' (031) 8270645 ', address: 'JL. KEBONSARI LVK VII NO.41 SURABAYA' },
    { no: 9, name: 'RISNU TRAVEL', phone: '08113104444',fax:'-', address: 'JL. WONOREJO ASRI I NO.28 SURABAYA' },
    { no: 10, name: ' FULLMOON EXPRESS TOUR & TRAVEL', phone: '08989898089', fax:'-',address: ' JL. RUKO JEMUR ANDAYANI NO.46 F SURABAYA' },
    
  ];

  const formatPhoneLink = (phone) => {
    const formattedPhone = phone.replace(/\s+/g, '').replace(/^0/, '62');
    return `tel:+${formattedPhone}`;
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const sortedAccommodations = () => {
    return rentalData;
  };

  const paginatedAccommodations = sortedAccommodations().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPagination = () => {
    if (sortedAccommodations().length <= itemsPerPage) {
      return null;
    }

    const totalPages = Math.ceil(sortedAccommodations().length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="flex justify-center mt-5">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`mx-1 px-4 py-2 rounded-md transition-colors duration-300 ${
              currentPage === pageNumber
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  };

   const handlePageChange = (pageNumber:number) => {
      setCurrentPage(pageNumber);
    };

  return (
    <Container sx={{ padding: 4 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{fontFamily: 'Plus Jakarta Sans', color:"#FF8D00", fontWeight: 'bold', marginBottom: 3, fontFamily:"Plus Jakarta Sans" }}>
        Travel Agen Surabaya
      </Typography>
      <Grid container spacing={3}>
        {paginatedAccommodations.map((rental) => (
          <Grid item xs={12} sm={6} md={4} key={rental.no}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #227B94, #34B3CE)',
                color: 'white',
                borderRadius: 3,
                boxShadow: 4,
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardContent className="flex flex-col h-40">
                <Typography variant="h6" gutterBottom sx={{fontFamily: 'Plus Jakarta Sans', fontWeight: 'bold' }}>
                  {rental.name}
                </Typography> 
                <Typography variant="body2" sx={{fontFamily: 'Plus Jakarta Sans', textAlign: 'justify', fontSize: '0.9rem' }}>
                  {rental.address}
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <IconButton
                    href={formatPhoneLink(rental.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#25D366',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '50%',
                      p: 1,
                      mr: 1,
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                    }}
                  >
                    <PhoneIcon />
                  </IconButton>
                    
                    {/* <p>{rental.fax}</p>
                    <FaxIcon/> */}
                  <Typography variant="body2" sx={{fontFamily: 'Plus Jakarta Sans', fontSize: '1rem' }}>
                    {rental.phone}
                  </Typography>
                  
                </Box>
                <Typography variant="body2" sx={{fontFamily: 'Plus Jakarta Sans', fontSize: '1rem' }} >
                <FaxOutlinedIcon
               className="text-4xl "/> Fax:  
                    {rental.fax}
                </Typography>
               
                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {renderPagination()}
    </Container>
  );
}


export default RentalCard;
