import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant='h1' component='div' sx={{ fontSize: '6rem', color: 'red' }}>
        404
      </Typography>
      <Typography variant='h4' component='div' sx={{ mt: 2, mb: 4, fontWeight: 'bold' }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant='body1' sx={{ mb: 4 }}>
        The page you are looking for might be under construction or does not exist.
      </Typography>
      <Button component={RouterLink} to='/' variant='contained' color='primary'>
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
