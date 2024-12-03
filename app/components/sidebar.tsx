import React, { useState, useEffect } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, Divider, Toolbar, Box, Typography } from '@mui/material';
import { FaHome, FaUser, FaCog, FaEnvelope, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

const drawerWidth = 260;

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [activePath, setActivePath] = useState('/');

  useEffect(() => {
    const savedPath = localStorage.getItem('activePath');
    if (savedPath) {
      setActivePath(savedPath);
    }
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMenuItemClick = (path) => {
    setActivePath(path);
    localStorage.setItem('activePath', path);
    if (isMobile) setIsCollapsed(true);
  };

  const menuItems = [
    { icon: FaHome, text: 'Add Gallery', path: '/admin/addgaleri' },
    { icon: FaUser, text: 'Add News', path: '/admin/addnews' },
    { icon: FaEnvelope, text: 'Data Registration', path: '/admin/dataregistrasi' },
    { icon: FaCog, text: 'Admin', path: '/admin' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Button to toggle sidebar */}
      <IconButton
        color="inherit"
        onClick={toggleSidebar}
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1300,
          color: 'white',
        }}
      >
        <FaBars />
      </IconButton>

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={!isCollapsed}
        onClose={toggleSidebar}
        ModalProps={{
          keepMounted: true, // Untuk meningkatkan performa pada mobile
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: isCollapsed ? '64px' : `${drawerWidth}px`,
            boxSizing: 'border-box',
            backgroundColor: '#252525',
            color: 'white',
            transition: 'width 0.3s',
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: '#252525',
            color: 'white',
            padding: '16px',
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Image src="/logoNew.png" alt="Logo" width={isCollapsed ? 0 : 85} height={isCollapsed ? 0 : 100} />
          </Box>
          {!isCollapsed && (
            <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
              Admin Page Munas 2025
            </Typography>
          )}
        </Toolbar>

        <Divider sx={{ backgroundColor: 'white' }} />

        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              component={Link}
              href={item.path}
              key={index}
              onClick={() => handleMenuItemClick(item.path)}
              sx={{
                backgroundColor: activePath === item.path ? 'blue' : '#252525',
                '&:hover': {
                  backgroundColor: activePath === item.path ? 'blue' : 'rgba(255, 255, 255, 0.2)',
                },
                color: 'white',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                'marginBottom':isCollapsed ? '15px' : '5px',
              }}
            >
              <item.icon style={{ fontSize: '1.5rem', marginRight: isCollapsed ? 0 : '16px', color: 'white' }} />
              {!isCollapsed && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>

        <Box sx={{ padding: '16px', textAlign: 'center', marginTop: 'auto' }}>
          <IconButton
            sx={{
              justifyContent: 'center',
              backgroundColor: 'red',
              color: 'white',
              // padding: '8px 16px',
              borderRadius: '5px', // Adjusted border-radius for a less oval shape
              '&:hover': {
                backgroundColor: 'darkred',
              },
              width: isCollapsed ? '37px' : 'auto',
              margin: '0 auto',
            }}
          >
            <FaSignOutAlt style={{ fontSize: '1.5rem', marginRight: isCollapsed ? 0 : '56px' }} />
            {!isCollapsed && <Typography>Logout</Typography>}
          </IconButton>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: '16px',
          transition: 'margin-left 0.3s',
          // marginLeft: isCollapsed ? '64px' : `${drawerWidth}px`,
          marginLeft: isCollapsed ? '64px' : `${drawerWidth}px`, // Menyesuaikan margin dengan lebar sidebar
          position: 'relative', // Untuk menjaga lapisan dengan footer
          zIndex: 1,
        }}
      >
        <Toolbar />
        {/* Main content here */}
      </Box>
      
    </Box>
  );
};

export default Sidebar;
