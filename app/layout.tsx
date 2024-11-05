'use client';

import './globals.css';
import NavLogo from './components/navbarLogo';
import Footerr from './components/footer';
import { Box } from '@mui/material';
import AnimatedImage from './components/layout';
import MobileNavbar from './components/mobileNav';
import AdminSidebar from './components/sidebar'; // Import the sidebar component
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'; // Import React and useState

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin'); // Check if it's an admin page

  // State to manage the active button
  const [activeButton, setActiveButton] = useState(1); // Default active button

  // Handler to update the active button
  const handleButtonClick = (id: number) => {
    setActiveButton(id);
  };

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
        <Box sx={{ marginLeft: isAdminPage ? '250px' : '0' }}>
          {/* Animated Image */}
          <Box>
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
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: { xs: 4, md: 6 }, maxWidth: '100%' }}>
          <Footerr />
        </Box>

        {/* Conditional Admin Sidebar positioned below footer */}
        {isAdminPage && (
          <Box sx={{ position: 'relative', width: '100%' }}>
            <AdminSidebar activeButton={activeButton} onButtonClick={handleButtonClick} />
          </Box>
        )}

        {/* Mobile Navbar */}
        <MobileNavbar />
      </body>
    </html>
  );
}
