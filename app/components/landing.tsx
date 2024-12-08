// "use client";

// import React from "react";
// import { Box, Typography, Button, Grid } from "@mui/material";
// import Countdown, { CountdownRendererFn, CountdownRenderProps } from "react-countdown";

// // Target date untuk countdown
// const targetDate = new Date("2025-05-05T00:00:00");

// // Renderer untuk countdown
// const renderer: CountdownRendererFn = ({
//   days,
//   hours,
//   minutes,
//   seconds,
// }: CountdownRenderProps) => {
//   return (
//     <Grid
//       container
//       spacing={2}
//       justifyContent="center"
//       sx={{
//         marginTop: 4, // Jarak antara card dan countdown
//         flexWrap: "nowrap",
//       }}
//     >
//       {[{ label: "Days", value: days },
//         { label: "Hours", value: hours },
//         { label: "Minutes", value: minutes },
//         { label: "Seconds", value: seconds },
//       ].map(({ label, value }, index) => (
//         <Grid item key={index}>
//           <Box
//             sx={{
//               backgroundColor: "#FFFFFF",
//               padding: "20px",
//               borderRadius: "10px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//               minWidth: "100px",
//               textAlign: "center",
//             }}
//           >
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: "bold",
//                 fontSize: "32px",
//                 color: "#1C1C1C",
//               }}
//             >
//               {value}
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontSize: "14px",
//                 color: "#1C1C1C",
//               }}
//             >
//               {label}
//             </Typography>
//           </Box>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// const LandingPage: React.FC = () => {
//   const handleButtonClick = () => {
//     window.location.href = "/register"; // Mengarahkan ke halaman register
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100vh",
//         backgroundImage: 'url("/bg1.png")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center", // Mengatur posisi elemen atas dan bawah
//         paddingTop: "50px",
//         paddingBottom: "50px",
//       }}
//     >
//       <Box
//         sx={{
//           backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparan putih
//           borderRadius: "15px",
//           padding: "50px", // Memperbesar padding
//           textAlign: "center",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//           maxWidth: "900px",
//           width: "90%",
//           fontFamily: "Poppins, sans-serif", // Font family global untuk card
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             gap: 2,
//           }}
//         >
//           <img
//             src="/apeksi.png" // URL logo
//             alt="Logo Munas"
//             style={{ height: "220px" }} // Memperbesar logo
//           />
//           <Box
//             sx={{
//               width: "3px",
//               height: "280px",
//               backgroundColor: "#126A22",
//             }}
//           />
//           <Box sx={{ textAlign: "left" }}>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontSize: "40px",
//                 color: "#8B0000", // Warna merah tua
//                 fontWeight: "bold",
//                 marginBottom: "4px",
//                 fontFamily: "Poppins, sans-serif",
//               }}
//             >
//               Musyawarah Nasional Ke-VIII <br />
//               APEKSI Tahun 2025
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 fontSize: "18px",
//                 color: "#1C1C1C",
//                 marginBottom: "16px",
//                 fontFamily: "Poppins, sans-serif",
//               }}
//             >
//               Dari Surabaya untuk Indonesia Maju
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontSize: "22px",
//                 color: "#0D8645", // Warna hijau
//                 fontWeight: "bold",
//                 fontFamily: "Poppins, sans-serif",
//               }}
//             >
//               5 - 11 Mei 2025
//             </Typography>
//           </Box>
//         </Box>

//         <Button
//           onClick={handleButtonClick}
//           sx={{
//             backgroundColor: "#FF9800",
//             color: "white",
//             px: 5,
//             py: 2,
//             borderRadius: "20px",
//             fontSize: "16px",
//             fontWeight: "bold",
//             marginTop: "24px",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//             fontFamily: "Poppins, sans-serif",
//             "&:hover": {
//               backgroundColor: "#F57C00",
//             },
//           }}
//         >
//           Daftar Disini
//         </Button>
//       </Box>
//       <Countdown date={targetDate} renderer={renderer} />
//     </Box>
//   );
// };

// export default LandingPage;


"use client";

import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import Countdown, { CountdownRendererFn, CountdownRenderProps } from "react-countdown";

// Target date untuk countdown
const targetDate = new Date("2025-05-05T00:00:00");

// Renderer untuk countdown
const renderer: CountdownRendererFn = ({
  days,
  hours,
  minutes,
  seconds,
}: CountdownRenderProps) => (
  <Grid container spacing={2} justifyContent="center">
    {[{ label: "Days", value: days },
      { label: "Hours", value: hours },
      { label: "Minutes", value: minutes },
      { label: "Seconds", value: seconds },
    ].map(({ label, value }, index) => (
      <Grid item key={index}>
        <Box
          sx={{
            backgroundColor: "#FFFFFF", 
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            minWidth: "120px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: "32px",
              color: "#1C1C1C",
            }}
          >
            {value}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "14px",
              color: "#1C1C1C",
            }}
          >
            {label}
          </Typography>
        </Box>
      </Grid>
    ))}
  </Grid>
);

// Komponen Card Utama (Landing Page)
const MainCard: React.FC = () => (
  <Box
    sx={{
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "15px",
      padding: "30px 80px 50px 80px",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      maxWidth: "900px",
      width: "90%",
      fontFamily: "Poppins, sans-serif",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <img
        src="/apeksi.png"
        alt="Logo Munas"
        style={{ height: "220px" }}
      />
      <Box
        sx={{
          width: "3px",
          height: "280px",
          backgroundColor: "#126A22",
        }}
      />
      <Box sx={{ textAlign: "left" }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "40px",
            color: "#8B0000",
            fontWeight: "bold",
            marginBottom: "4px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Musyawarah Nasional Ke-VIII <br />
          APEKSI Tahun 2025
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "18px",
            color: "#1C1C1C",
            marginBottom: "16px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Dari Surabaya untuk Indonesia Maju
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "22px",
            color: "#0D8645",
            fontWeight: "bold",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          5 - 11 Mei 2025
        </Typography>
      </Box>
    </Box>
    <Button
      onClick={() => (window.location.href = "/register")}
      sx={{
        backgroundColor: "#FF9800",
        color: "white",
        px: 5,
        py: 2,
        borderRadius: "20px",
        fontSize: "16px",
        fontWeight: "bold",
        marginTop: "24px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        fontFamily: "Poppins, sans-serif",
        "&:hover": {
          backgroundColor: "#F57C00",
        },
      }}
    >
      Daftar Disini
    </Button>
  </Box>
);

// Komponen Landing Page
const LandingPage: React.FC = () => (
  <Box
    sx={{
      width: "100%",
      minHeight: "100vh",
      backgroundImage: 'url("/bg1.png")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      position:"relative",
      justifyContent: "space-between",
    }}
  >
    {/* Card di Tengah */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1, // Mengisi ruang tengah
      }}
    >
      <MainCard />
    </Box>

    {/* Countdown di Bawah */}
    <Box
      sx={{
        poition:"absolute",
        marginBottom:"-50px",
        // boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Countdown date={targetDate} renderer={renderer} />
    </Box>
  </Box>
);

export default LandingPage;
