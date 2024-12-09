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
          backgroundColor: "#F5F5F5", // Warna latar belakang
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            textAlign: "center",
            padding: isSmallScreen ? "20px" : "40px",
          }}
        >
          <Typography
            sx={{
              fontSize: isSmallScreen ? "16px" : "20px",
              fontWeight: "bold",
              color: "#005A8D",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Rangkaian
          </Typography>
          <Typography
            sx={{
              fontSize: isSmallScreen ? "28px" : "40px",
              fontWeight: "bold",
              color: "#005A8D",
              marginBottom: "5px",
            }}
          >
            Jadwal Rakernas.
          </Typography>
          <Typography
            sx={{
              fontSize: isSmallScreen ? "20px" : "30px",
              fontWeight: "bold",
              color: "#005A8D",
              marginBottom: isSmallScreen ? "10px" : "20px",
              marginLeft: isSmallScreen ? "10px" : "450px",
            }}
          >
            Mei 2025
          </Typography>
        </Box>

        {/* Tabs untuk Hari */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            paddingX: isSmallScreen ? "10px" : "0px",
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
                padding: isSmallScreen ? "20px 8px" : "40px 16px",
                margin: isSmallScreen ? "0 5px" : "0 15px",
                borderRadius: "8px",
                fontSize: isSmallScreen ? "14px" : "16px",
                fontWeight: "bold",
                textTransform: "none",
              },
              "& .Mui-selected": {
                backgroundColor: "#FF8C00",
                color: "#005A8D",
              },
              "& .MuiTab-root:not(.Mui-selected)": {
                backgroundColor: "#005A8D",
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
                        fontSize: isSmallScreen ? "10px" : "12px",
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
            backgroundColor: "#0B3C5D",
            borderRadius: "15px",
            padding: isSmallScreen ? "10px" : "20px",
            color: "#FFFFFF",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: isSmallScreen ? "20px" : "30px",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            {events[selectedDay].headline}
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: isSmallScreen ? "18px" : "30px",
              textAlign: "center",
              marginBottom: isSmallScreen ? "15px" : "20px",
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
                  maxWidth: "600px",
                  width: "100%",
                }}
              >
                {/* Bagian Waktu */}
                <Box
                  sx={{
                    fontWeight: "bold",
                    fontSize: isSmallScreen ? "16px" : "20px",
                    color: "#FFFFFF",
                    backgroundColor: "#005A8D",
                    padding: isSmallScreen ? "8px" : "10px",
                    borderRadius: "10px",
                    flex: isSmallScreen ? "0" : "0 0 120px",
                    textAlign: "center",
                    marginRight: isSmallScreen ? "0" : "10px",
                    marginBottom: isSmallScreen ? "10px" : "0",
                  }}
                >
                  {event.time}
                </Box>

                {/* Bagian Accordion */}
                <Accordion
                  sx={{
                    flex: "1",
                    width: "100%",
                    borderRadius: "10px",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#FFFFFF" }} />}
                    sx={{
                      backgroundColor: "#FF8C00",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: isSmallScreen ? "16px" : "20px",
                        color: "#FFFFFF",
                      }}
                    >
                      {event.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "10px",
                      padding: "15px",
                      color: "#0B3C5D",
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
