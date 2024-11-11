'use client';

import './globals.css';
import NavLogo from './components/navbarLogo';
import Footerr from './components/footer';
import { Box, Typography,useMediaQuery, useTheme } from '@mui/material';
import AnimatedImage from './components/layout';
import MobileNavbar from './components/mobileNav';
import AdminSidebar from './components/sidebar';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import brokenPhoneImage from '../public/hp.png'; // Adjust the path if necessary

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin'); // Check if it's an admin page

  // State to manage the active button in the sidebar
  const [activeButton, setActiveButton] = useState(1);

  // Handler to update the active button
  const handleButtonClick = (id: number) => {
    setActiveButton(id);
  };

  // Media query to check if screen is small or larger
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <html lang="en">
      <body
        style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden' }}
      >
        {/* Navbar (only shown on non-admin pages) */}
        {!isAdminPage && (
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1000,
              backgroundColor: 'white',
            }}
          >
            <NavLogo />
          </Box>
        )}

        {/* Main content */}
        <Box sx={{ marginLeft: isAdminPage && !isMobile ? '250px' : '0' }}>
          {isAdminPage ? (
            <>
              {/* Display mobile-only warning message */}
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
                  {/* Sidebar and admin content for larger screens */}
                  <AdminSidebar activeButton={activeButton} onButtonClick={handleButtonClick} />
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
            // Regular content for non-admin pages
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
  );
}