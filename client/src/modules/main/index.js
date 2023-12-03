import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Link, CssBaseline, Box, Toolbar, Typography, Container, createTheme, ThemeProvider } from '@mui/material';
import { Navbar, TopBar } from '../common/components';
import { NonLoggedInRouter, Router } from '../router';

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {false ? (
        <RouterProvider router={NonLoggedInRouter} />
      ) : (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
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
              <RouterProvider router={Router} />
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}
