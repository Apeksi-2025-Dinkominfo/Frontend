import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Toolbar,
  Box,
  Typography,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Image from 'next/image';

const drawerWidth = 240;

function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activePath, setActivePath] = React.useState('/admin'); // default path

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Add Gallery', path: '/admin/addgaleri' },
    { text: 'Add News', path: '/admin/addnews' },
    { text: 'Data Registration', path: '/admin/dataregistrasi' },
    { text: 'Admin', path: '/admin' },
  ];

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
            onClick={() => setActivePath(item.path)}
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

  React.useEffect(() => {
    setOpen(isMobile ? false : true);
  }, [isMobile]);

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Menu />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={isMobile ? open : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
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
          width: '100%',
          transition: 'margin 0.3s',
          marginLeft: isMobile && open ? `${drawerWidth}px` : '0',
        }}
        aria-hidden={isMobile && !open} // Use aria-hidden to hide when drawer is closed
      >
        <Toolbar />
        <Box>{/* Main content goes here */}</Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
