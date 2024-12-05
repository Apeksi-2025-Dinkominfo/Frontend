'use client'
import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Container, Grid, Box, IconButton
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

function RentalCard() {
  
  const rentalData = [
    { no: 1, name: ' ASSA Rent Surabaya', phone: ' (031) 8476363', address: ' Jl. Raya Prapen No.63, Panjang Jiwo, Kec. Tenggilis Mejoyo, Surabaya, Jawa Timur 60299' },
    { no: 2, name: 'TRAC', phone: '(031) 8419999', address: 'Jl. Raya Jemur Sari No.224-228' },
    { no: 3, name: 'PT DARMO RENT HIACE CENTER', phone: '089695116237', address: 'Jl. Darmo Permai Utara VII, Tanjungsari, Kec. Sukomanunggal, Surabaya, Jawa Timur 60187' },
    { no: 4, name: 'Global Transport', phone: '081290005386', address: 'Jl. Pandugo Baru X No.37, Penjaringan Sari, Kec. Rungkut, Surabaya, Jawa Timur 60297' },
    { no: 5, name: 'Surabaya Trans', phone: '08113141889', address: ' Jalan Medokan Asri Tengah V No.12 Medokan Ayu 2 blok S no.22, Jl. Tambak Medokan Ayu Gg. IX No.23, Medokan Ayu, Kec. Rungkut, Surabaya, Jawa Timur 60295' },
    { no: 6, name: ' Okkarent Rental', phone: '081252666966', address: ' Jl. Gn. Anyar Jaya No.4, Gn. Anyar, Kec. Gn. Anyar, Surabaya, Jawa Timur 60294' },
    { no: 7, name: ' ERA TRANS RENT CAR Surabaya', phone: '0811311190', address: ' Komplek Ruko Grand City Regency, Jl. Rungkut Madya No.21 Blok B, Central Rungkut, Gunung Anyar, Surabaya, East Java 60295' },
    { no: 8, name: ' TRAN99', phone: '081330548581', address: ' Jl. Embong Malang No.99, RT.002/RW.04, Kedungdoro, Kec. Tegalsari, Surabaya, Jawa Timur 60261' },
    { no: 9, name: ' Rafa Transportation', phone: '082131463018', address: ' Jl. Karah Tama Asri No.Blok A2, Karah, Kec. Jambangan, Surabaya, Jawa Timur 60232' },
    { no: 10, name: ' Putra Wijaya Tours Rental Car', phone: '089531844565', address: ' Jl. Tembok Gede V No.4, Bubutan, Kec. Bubutan, Surabaya, Jawa Timur 60174' },
    { no: 11, name: ' DRC Trans Surabaya', phone: ' 083898954954', address: '  Jl. Wisma Permai XII No.5, Mulyorejo, Kec. Mulyorejo, Surabaya, Jawa Timur 60115' },
    { no: 12, name: ' Prioritas Sarana Transport Surabaya', phone: '081332855252', address: ' Jl. Pacar Keling II No.30, Pacar Keling, Kec. Tambaksari, Surabaya, Jawa Timur 60131' },
    { no: 13, name: ' Anare Trans Sewa Mobil', phone: '085331532943', address: 'Gg. Tempura III No.67, Gn. Anyar Tambak, Kec. Gn. Anyar, Surabaya, Jawa Timur 60294' },
    { no: 14, name: 'WS Rental Sewa Mobil Lepas Kunci Surabaya', phone: '081316413681', address: ' Perumahan Jl. Raya Dian Istana No.mor 36 Blok F2, Wiyung, Kec. Wiyung, Surabaya, Jawa Timur 60228' },
    { no: 15, name: ' WX Rent Car', phone: '081230880555', address: '  Jl. Raya Bangkingan No.132 kav.74, Bangkingan, Kec. Lakarsantri, Surabaya, Jawa Timur 60214' },
    { no: 16, name: '  3 Jaya Rent Car', phone: '083878292500', address: '  Kebraon Manis Barat, Kebraon, Kec. Karangpilang, Surabaya, Jawa Timur 60222' },
    { no: 17, name: ' come java', phone: '081333222828', address: '  Jl. Jambangan III No.3, Jambangan, Kec. Jambangan, Surabaya, Jawa Timur 60232' },
    { no: 18, name: '  Dhava Rental mobil ', phone: '081358659708', address: 'Jl. Grand Jl. Kauman Asri Gg. V No.48, Benowo, Kec. Pakal, Surabaya, Jawa Timur 60195' },
    { no: 19, name: ' Speedy Trans Surabaya', phone: '081333885533', address: ' Jl. Srikana No.43c, Airlangga, Kec. Gubeng, Surabaya, Jawa Timur 60286' },
    { no: 20, name: 'CV. Rejeki Putro', phone: '082333686420', address: ' Jl. Rungkut Menanggal Harapan, Rungkut Menanggal, Kec. Gn. Anyar, Surabaya, Jawa Timur 60293' },
    { no: 21, name: 'Pusaka Rent Car', phone: ' 081357990007', address: '  Jl. Pandugo Baru XIII Blok N2, Penjaringan Sari, Kec. Rungkut, Surabaya, Jawa Timur 60297' },
    { no: 22, name: 'My Family Trans Surabaya', phone: '082228920806', address: 'Jl. Raya Darmo Baru Barat No.7, Sonokwijenan, Kec. Sukomanunggal, Surabaya, Jawa Timur 60189' },
    { no: 23, name: 'GRACIA RENT CAR', phone: '081249939996', address: 'Jl. Babatan Pratama XVIII No.54 Blok BB, Babatan, Kec. Wiyung, Surabaya, Jawa Timur 60227' },
    { no: 24, name: ' SIPPO TRANS', phone: '081358156231', address: 'Jl. Manyar Rejo VI No.12, Menur Pumpungan, Kec. Sukolilo, Surabaya, Jawa Timur 60118' },
    { no: 25, name: 'ERA TRANS', phone: '0811311190', address: ' Komplek Ruko Grand City Regency, Jl. Rungkut Madya No.21 Blok B, Central Rungkut, Gunung Anyar, Surabaya, East Java 60295' },
    { no: 26, name: '  One Rent Car', phone: '08127997658', address: '  Jl. Sambisari III No.30 RT/RW 02/03, Lontar, Kec. Sambikerep, Surabaya, Jawa Timur 60216' },
    { no: 27, name: '  Vira Trans', phone: '081230454654', address: ' Graha Sampurna Indah, Blok N-2, Babatan, Kec. Wiyung, Surabaya, Jawa Timur 60227' },
    { no: 28, name: ' TIM RENT A CAR', phone: '081330301717', address: 'Jl. Sidosermo Airdas III No.D69, Sidosermo, Kec. Wonocolo, Surabaya, Jawa Timur 60239' },
    { no: 29, name: ' Artabuana Trans', phone: '082244399997', address: 'Jl. Ketintang Baru II No.3, Ketintang, Kec. Gayungan, Surabaya, Jawa Timur 60231' },
    { no: 30, name: '  Mickey Rent', phone: '082333578488', address: ' Jl. Jambangan Tama No.35, Jambangan, Kec. Jambangan, Surabaya, Jawa Timur 60232' },
    { no: 31, name: ' TUJUH SATU TRANS SURABAYA', phone: ' 081334108465', address: '  Jl. Darmorejo IV Jl. Darmokali No.27, Darmo, Kec. Wonokromo, Surabaya, Jawa Timur 60321' },
    { no: 32, name: 'Sumbersari Trans', phone: '', address: 'Jl. Gayungsari XI No.54, Gayungan, Kec. Gayungan, Surabaya, Jawa Timur 60235' },
    { no: 33, name: '  WS Rental ', phone: '081316413681', address: 'Perumahan Jl. Raya Dian Istana No.mor 36 Blok F2, Wiyung, Kec. Wiyung, Surabaya, Jawa Timur 60228' },
    { no: 34, name: 'Kalla Transport & Logistic ', phone: '08114601334', address: 'Jl. Galaksi Klampis Asri Selatan II No.12A blok n1 no, Medokan Semampir, Sukolilo, Surabaya, East Java 60119' },
    { no: 35, name: ' BLUE BIRD GROUP', phone: ' (031) 5651234', address: '  Jl. Darmokali No.2, RW.6, Keputran, Kec. Tegalsari, Surabaya, Jawa Timur 60211' },
    { no: 36, name: ' PT QUINZATRANSINDO JATIM SURABAYA', phone: '081230779831', address: '  Hayam wuruk 18 bengrah 05-41-01 Rt002 RW 009, Surabaya, Jawa Timur 60242' },
    { no: 37, name: ' BrawijayaTransCom', phone: '081240175758', address: 'Jl. Wonoboyo No.6, Sawunggaling, Kec. Wonokromo, Surabaya, Jawa Timur 60242' },
    { no: 38, name: 'BIG Trans Solution', phone: '081216666816', address: ' Jl. Karangan No.142, Sawunggaling, Kec. Wonokromo, Surabaya, Jawa Timur 60242' },
    { no: 39, name: 'YUVITRANS', phone: '08113446060', address: '  Jl. Pakis Tirtosari XV No.29, Pakis, Kec. Sawahan, Surabaya, Jawa Timur 60256' },
    { no: 40, name: 'JSK Trans', phone: '082332648006', address: ' Jl. Gadung V No.10, Jagir, Kec. Wonokromo, Surabaya, Jawa Timur 60244' },
    // { no: 1, name: 'PT ADI SARANA ARMADA TBK (ASSA)', phone: '081911500369', address: 'Jl. Raya Prapen No.63, Panjang Jiwo, Kec. Tenggilis Mejoyo, Surabaya, Jawa Timur 60299' },
    // { no: 2, name: 'Kalla Transport & Logistic Surabaya', phone: '08114141116', address: 'Jl. Raya Taman No.113-137, Taman, Kec. Taman, Kabupaten Sidoarjo, Jawa Timur 61257' },
    // { no: 3, name: 'TRAC Rental Mobil', phone: '08111873210', address: 'Jl. Raya Jemursari No.224 - 228, Tenggilis Mejoyo, Kec. Tenggilis Mejoyo, Surabaya, Jawa Timur 60292' },
    // { no: 4, name: 'CV. Tunas Jaya', phone: '08131518750', address: 'Jl. Musi No. 29, Surabaya' },
    // { no: 5, name: 'Fafa Wisata Trans', phone: '081216859936', address: 'Kec. Prambon, Sidoarjo' },
    // { no: 6, name: 'CV. PUSAKA LIMA TIGA SURABAYA (Nurhayati)', phone: '08113350606', address: 'Jl. Rungkut Mejoyo selatan V / 21-23' },
   
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
      <Typography variant="h5" align="center" gutterBottom sx={{ color: '#227B94', fontWeight: 'bold', marginBottom: 3 }}>
        Rental Mobil di Surabaya
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
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {rental.name}
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
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                    {rental.phone}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ textAlign: 'justify', fontSize: '0.9rem' }}>
                  {rental.address}
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
