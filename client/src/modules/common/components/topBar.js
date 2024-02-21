import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {
  Typography,
  styled,
  Badge,
  IconButton,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../../core/authentication/authentication.action';

function TopBar({ toggleDrawer, open }) {
  const { admin } = useSelector((state) => state.authentication);
  const [logout] = useLogoutMutation();
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const drawerWidth = 240;
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const handleOpenLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleCloseLogoutModal();
  };

  return (
    <div>
      <AppBar position='absolute' open={open}>
        <Toolbar sx={{ pr: '24px' }}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}>
            <MenuIcon />
          </IconButton>
          <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
            {admin?.firstName} {admin?.lastName}
          </Typography>
          <IconButton color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color='inherit' onClick={handleOpenLogoutModal}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Dialog open={isLogoutModalOpen} onClose={handleCloseLogoutModal}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>Are you sure you want to logout?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutModal} color='primary'>
            No
          </Button>
          <Button onClick={handleLogout} color='error'>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TopBar;
