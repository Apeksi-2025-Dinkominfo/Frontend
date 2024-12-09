'use client';

import './globals.css';
import NavLogo from './components/navbarLogo';
import Footerr from './components/footer';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import AnimatedImage from './components/layout';
import MobileNavbar from './components/mobileNav';
import AdminSidebar from './components/sidebar';
import { usePathname } from 'next/navigation';
import React, { useState, createContext, useContext } from 'react';
import Image from 'next/image';
import brokenPhoneImage from '../public/hp.png'; // Adjust the path if necessary

// Context untuk tema
const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin'); // Check if it's an admin page

  // State untuk dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // State untuk tombol aktif di sidebar
  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (id: number) => {
    setActiveButton(id);
  };

  // Media query untuk mendeteksi screen kecil
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <html lang="en">
        <body
          style={{
            margin: 0,
            padding: 0,
            width: '100%',
            overflowX: 'hidden',
            backgroundImage: "url('/seluruh4.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 'auto',
            backgroundColor: isDarkMode ? '#0F172A' : '#F7F7F7',
            color: isDarkMode ? '#ffffff' : '#000000',
          }}
        >
          {/* Navbar (hanya untuk non-admin) */}
          {!isAdminPage && (
            <Box
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: isDarkMode ? 'rgba(18, 18, 18, 0.8)' : 'white',
                transition: 'background-color 0.3s ease',
              }}
            >
               {/* <NavLogo /> */}
            </Box>
          )}

          {/* Konten utama */}
          <Box sx={{ marginLeft: isAdminPage && !isMobile ? '250px' : '0' }}>
            {isAdminPage ? (
              <>
                {/* Tampilkan pesan hanya untuk mobile */}
                {isMobile ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '100vh',
                      textAlign: 'center',
                      p: 3,
                    }}
                  >
                    <Image
                      src={brokenPhoneImage}
                      alt="Broken phone icon"
                      width={150}
                      height={150}
                      style={{ opacity: 0.7 }}
                    />
                    <Typography variant="h6" sx={{ mt: 2, color: 'gray' }}>
                      Lebih Disarankan Untuk Menggunakan Device Laptop atau PC untuk
                      bagian admin.
                    </Typography>
                  </Box>
                ) : (
                  <>
                    {/* Sidebar dan konten admin untuk layar besar */}
                    <AdminSidebar
                      activeButton={activeButton}
                      onButtonClick={handleButtonClick}
                    />
                    <AnimatedImage>
                      <Box
                        sx={{
                          minHeight: '100vh',
                          width: '100%',
                          marginTop: -6,
                        }}
                      >
                        {children}
                      </Box>
                    </AnimatedImage>
                  </>
                )}
              </>
            ) : (
              // Konten reguler untuk halaman non-admin
              <AnimatedImage>
                <Box
                  sx={{
                    minHeight: '100vh',
                    width: '100%',
                    marginTop: -6,
                  }}
                >
                  {children}
                </Box>
              </AnimatedImage>
            )}
          </Box>

          {/* Footer */}
          <Box sx={{ mt: { xs: 4, md: 6 }, maxWidth: '100%' }}>
            <Footerr />
          </Box>
          {/* Mobile Navbar */}
          <MobileNavbar />
        </body>
      </html>
    </ThemeContext.Provider>
  );
}
