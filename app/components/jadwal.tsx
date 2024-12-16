'use client';
import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  createTheme,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Import events data
import { events } from "../utils/event";

// Buat tema dengan font "Plus Jakarta Sans"
const theme = createTheme({
  typography: {
    fontFamily: "Plus Jakarta Sans",
  },
});

const EventComponent: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(0); // Default to the first day in the events array

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedDay(newValue);
  };

  // Gunakan media query untuk deteksi ukuran layar
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Layar kecil (xs atau sm)

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
        
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            textAlign: "center",
            padding: isSmallScreen ? "20px" : "20px",
          }}
        >
          {/* <Typography
            sx={{
              fontSize: isSmallScreen ? "16px" : "20px",
              fontWeight: "bold",
              color: "#023E74",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Rangkaian
          </Typography> */}
          <Typography
            sx={{
              fontSize: isSmallScreen ? "28px" : "40px",
              fontWeight: "bold",
            }}
          >
            JADWAL MUNAS
          </Typography>
            {/* <Typography
//             sx={{
//               fontSize: isSmallScreen ? "20px" : "40px",
//               fontWeight: "bold",
//               color: "#005A8D",
//               marginLeft: isSmallScreen ? "10px" : "450px",
//             }}
//           >
//             Mei 2025
//           </Typography> */}
        </Box>

        {/* Tabs untuk Hari */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            paddingX: isSmallScreen ? "10px" : "0",
          }}
        >

          
          <Tabs
            value={selectedDay}
            onChange={handleTabChange}
            variant={isSmallScreen ? "scrollable" : "standard"}
            scrollButtons="auto"
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              "& .MuiTab-root": {
                padding: isSmallScreen ? "20px 8px" : "25px 16px",
                margin: isSmallScreen ? "0 5px" : "0 15px",
                borderRadius: "20px",
                fontSize: isSmallScreen ? "14px" : "16px",
                fontWeight: "bold",
                textTransform: "none",
              },
              "& .Mui-selected": {
                backgroundColor: "#FFFFFF",
                color: "#023E74",
              },
              "& .MuiTab-root:not(.Mui-selected)": {
                backgroundColor: "#43A5CC",
                color: "#FFFFFF",
              },
            }}
          >
            {events.map((event, index) => (
              <Tab
                key={index}
                label={
                  <Box textAlign="center">
                    <Typography
                      sx={{
                        fontSize: isSmallScreen ? "16px" : "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {event.date}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: isSmallScreen ? "10px" : "20px",
                      }}
                    >
                      {event.day}
                    </Typography>
                  </Box>
                }
                value={index}
              />
            ))}
          </Tabs>
        </Box>

        {/* Schedule Content */}
        <Box
          sx={{
            backgroundColor: "#FFFFFF", //card dalam content
            borderRadius: "15px",
            padding: isSmallScreen ? "10px" : "20px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: isSmallScreen ? "20px" : "40px",
              textAlign: "center",
              marginBottom: "10px",
              color: "#023E74",
            }}
          >
            {events[selectedDay].headline}
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: isSmallScreen ? "18px" : "30px",
              textAlign: "center",
              color: "#023E74",
              marginBottom: isSmallScreen ? "15px" : "20px",
              marginRight: isSmallScreen ? "10px" : "350px",
            }}
          >
            Rangkaian Acara:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
            }}
          >
            {events[selectedDay].acara.map((event, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: isSmallScreen ? "column" : "row",
                  maxWidth: "700px", // Lebih lebar agar tetap center
                  width: "100%",
                  gap: "15px", // Jarak antara waktu dan accordion
                  justifyContent: "center", // Tetap center
                }}
              >
                {/* Bagian Waktu */}
                <Box
                  sx={{
                    fontWeight: "bold",
                    fontSize: isSmallScreen ? "16px" : "20px",
                    color: "#023E74",
                    // backgroundColor: "#023E74",
                    padding: isSmallScreen ? "8px" : "5px",
                    borderRadius: "20px",
                    textAlign: "center",
                    fontFamily: "Plus Jakarta Sans",
                    width: "230px", // Ukuran tetap untuk waktu
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: isSmallScreen ? "12px" : "20px",
                      color: "#023E74",
                      fontFamily: "Plus Jakarta Sans",
                      fontWeight: "bold",
                    }}
                  >
                    Waktu
                  </Typography>
                  {event.time}
                </Box>

                {/* Bagian Accordion */}
                <Accordion
                  sx={{
                    flex: "1",
                    width: "100%",
                    borderRadius: "20px", // Melengkung
                    // overflow: "hidden",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#023E74" }} />}
                    sx={{
                      backgroundColor: "rgba(120, 183, 208, 0.25)",
                      // backgroundColor: "#78B7D0",
                      // borderRadius: "20px 20px 0 0", // Melengkung atas saja
                      borderRadius: "20px", // Melengkung atas saja
                      padding: "10px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: isSmallScreen ? "16px" : "20px",
                        fontFamily: "Plus Jakarta Sans",
                        fontWeight: "bold",
                        color: "#16325B",
                      }}
                    >
                      {event.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      backgroundColor: "#FFFFFF", // Warna putih
                      color: "#023E74", // Teks biru
                      padding: "15px",
                      borderRadius: "19px", // Radius bawah
                    }}
                  >
                    <Typography>
                      <strong>Lokasi:</strong> {event.location}
                    </Typography>
                    <Typography>
                      <strong>Deskripsi:</strong> {event.description}
                    </Typography>
                    <Typography>
                      <strong>Dresscode:</strong> {event.dresscode}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EventComponent;
