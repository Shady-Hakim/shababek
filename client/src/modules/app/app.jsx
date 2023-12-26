import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Outlet, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { Link, CssBaseline, Box, Toolbar, Typography, Container, CircularProgress } from '@mui/material';

import { Navbar, TopBar } from '../common/components';
import { useReadMeMutation } from '../core/authentication/authentication.action';
import { SignIn, NotFound, Tables, Products, Orders } from '../../pages';
import { PrivateOutlet } from '../core/authorization/private-outlet';

const App = () => {
  const [readMe, { status }] = useReadMeMutation();
  const [open, setOpen] = useState(true);
  const { authenticated } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (Cookies.get('userToken')) {
      readMe();
    }
  }, [readMe]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  function Copyright(props) {
    return (
      <Typography variant='body2' color='text.secondary' align='center' {...props}>
        {'Copyright © '}
        <Link color='inherit' href='https://ilampagency.com/'>
          iLamp
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  if (status !== QueryStatus.fulfilled && status !== QueryStatus.uninitialized) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 600 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <CssBaseline />

      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <Box sx={{ display: 'flex' }}>
                <TopBar toggleDrawer={() => toggleDrawer()} open={open} />
                <Navbar toggleDrawer={() => toggleDrawer()} open={open} />
                <Box
                  component='main'
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                  }}>
                  <Toolbar />
                  <Container maxWidth='lg' sx={{ mt: 4, mb: 4, backgroundColor: '#fff' }}>
                    <Outlet />
                    <Copyright sx={{ pt: 4 }} />
                  </Container>
                </Box>
              </Box>
            }>
            <Route
              path='/'
              element={
                <PrivateOutlet>
                  <Tables />
                </PrivateOutlet>
              }
            />
            <Route
              path='/tables/:tableNumber'
              element={
                <PrivateOutlet>
                  <Products />
                </PrivateOutlet>
              }
            />
            <Route
              path='/orders'
              element={
                <PrivateOutlet>
                  <Orders />
                </PrivateOutlet>
              }></Route>
          </Route>

          <Route
            path='/'
            element={
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Outlet />
              </Box>
            }>
            <Route path='/login' element={authenticated ? <Navigate to='/' /> : <SignIn />} />
            <Route path='not-found' element={<NotFound />} />
            <Route path='/*' element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
