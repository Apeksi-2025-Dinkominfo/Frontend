// app/layout.tsx
import './globals.css'; // Include your global styles if needed
import NavLogo from './components/navbarLogo';
import Footerr from './components/footer';
import { Box } from '@mui/material';

export const metadata = {
  title: 'Apeksi Rakernas Surabaya 2025',
  description: 'Your site description.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden' }}>
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'white' }}>
          <NavLogo />
        </Box>

        <Box sx={{ mt: { xs: 4, md: 6 }, minHeight: '80vh', maxWidth: '100%' }}>
          {children}
        </Box>

        {/* Footer */}
        <Box sx={{ mt: { xs: 4, md: 6 }, maxWidth: '100%' }}>
          <Footerr />
        </Box>
      </body>
    </html>
  );
}
