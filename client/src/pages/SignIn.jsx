import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useLoginMutation } from '../modules/core/authentication/authentication.action';

const SignIn = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box sx={styles.container}>
        <Avatar sx={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Formik
          initialValues={
            process.env.NODE_ENV === 'production'
              ? {
                  email: '',
                  password: '',
                }
              : {
                  email: 'superadmin@iposdahab.com',
                  password: 'iposdahab',
                }
          }
          validationSchema={yup.object({
            email: yup
              .string()
              .required("Email address can't be blank.")
              .email("The email address you've entered is invalid."),
            password: yup
              .string()
              .required("Password can't be blank.")
              .min(8, 'Your password must be at least 8 characters long.'),
          })}
          onSubmit={async (values) => {
            try {
              await login(values);
            } catch (error) {
              console.error('Login failed', error);
            }
          }}>
          <Form noValidate sx={styles.form}>
            <Field
              as={TextField}
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <Field
              as={TextField}
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button type='submit' fullWidth variant='contained' sx={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
            {isError && (
              <Typography sx={styles.errorTypography} align='center'>
                {error && error.data && error.data.message}
              </Typography>
            )}
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Box>
      <Typography variant='body2' color='text.secondary' align='center'>
        {'Copyright © '}
        <Link color='inherit' href='https://ilampagency.com/'>
          iLamp
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Container>
  );
};

const styles = {
  container: { marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' },
  avatar: { m: 1, bgcolor: 'secondary.main' },
  form: { mt: 3 },
  submitButton: { mt: 3, mb: 2 },
  errorTypography: { variant: 'body2', color: 'error', align: 'center' },
};

export default SignIn;
