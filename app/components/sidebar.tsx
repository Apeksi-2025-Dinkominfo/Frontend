import React from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Toolbar,
  Box,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

interface SidebarProps {
  activeButton: number;
  onButtonClick: (buttonId: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeButton, onButtonClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(!isMobile); // Sidebar default terbuka di layar besar
  const [activePath, setActivePath] = React.useState('/admin'); // default path

  // Load active path from localStorage on mount
  React.useEffect(() => {
    const savedPath = localStorage.getItem('activePath');
    if (savedPath) {
      setActivePath(savedPath); // Load the saved path on component mount
    }
  }, []);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Add Gallery', path: '/admin/addgaleri' },
    { text: 'Add News', path: '/admin/addnews' },
    { text: 'Data Registration', path: '/admin/dataregistrasi' },
    { text: 'Admin', path: '/admin' },
  ];

  const handleMenuItemClick = (path: string, index: number) => {
    setActivePath(path);
    onButtonClick(index);

    // Save the current path to localStorage
    localStorage.setItem('activePath', path);

    if (isMobile) setOpen(false); // Tutup sidebar di mobile setelah klik
  };

  const drawerContent = (
    <div>
      <Toolbar
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#252525',
          color: 'white',
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Image src="/logoNew.png" alt="Logo" width={60} height={60} />
        </Box>
        <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
          Admin Page Munas 2025
        </Typography>
      </Toolbar>

      <Divider sx={{ backgroundColor: 'white' }} />
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            component={Link}
            href={item.path}
            key={index}
            onClick={() => handleMenuItemClick(item.path, index)}
            sx={{
              backgroundColor: activePath === item.path ? 'blue' : '#252525',
              color: 'white',
              '&:hover': {
                backgroundColor: activePath === item.path ? 'blue' : 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Tombol Menu di Layar Kecil */}
      {isMobile && (
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#252525',
            color: 'white',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
          transition: 'margin 0.3s',
          marginLeft: open && !isMobile ? drawerWidth : 0,
        }}
      >
        <Toolbar />
        <Box>{/* Konten utama ditempatkan di sini */}</Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
