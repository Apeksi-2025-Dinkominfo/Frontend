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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#F5F5F5", // Warna latar belakang serupa dengan kode kedua
          minHeight: "100vh",
          // padding: "20px", 
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", padding: "10px" }}>
          <Typography
            sx={{
              fontSize: "20px",
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
              fontSize: "40px",
              fontWeight: "bold",
              color: "#005A8D",
              marginBottom: "5px",
            }}
          >
            Jadwal Rakernas.
          </Typography>
          <Typography
            sx={{
              fontSize: "30px",
              marginLeft: "450px",
              fontWeight: "bold",
              color: "#005A8D",
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
          }}
        >
          <Tabs
            value={selectedDay}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              "& .MuiTab-root": {
                padding: "40px 16px",
                margin: "0 15px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              },
              "& .Mui-selected": {
                backgroundColor: "#FF8C00",
                color: "#005A8D",
                // color: "#FFFFFF",
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
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {event.date}
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>{event.day}</Typography>
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
            padding: "20px",
            color: "#FFFFFF",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "30px",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            {events[selectedDay].headline}
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "30px",
              textAlign: "center",
              margin: "0 250px 20px 0",
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
                  maxWidth: "600px",
                  width: "100%",
                }}
              >
                {/* Bagian Waktu */}
                <Box
                  sx={{
                    fontWeight: "bold",
                    // fontFamily: "Plus Jakarta Sans",
                    fontSize: "20px",
                    color: "#FFFFFF",
                    backgroundColor: "#005A8D",
                    padding: "10px",
                    borderRadius: "10px",
                    flex: "0 0 120px",
                    textAlign: "center",
                    marginRight: "10px",
                  }}
                >
                  {event.time}
                </Box>

                {/* Bagian Accordion */}
                <Accordion
                  sx={{
                    flex: "1",
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
                        // fontWeight: "bold",
                        fontSize: "20px",
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
