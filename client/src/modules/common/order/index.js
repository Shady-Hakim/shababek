import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, Grid, Paper, TextField, Typography, Button } from '@mui/material';
import { People, TableRestaurant } from '@mui/icons-material';
import Receipt from './receipt';

function Order() {
  const tableNumber = useSelector((state) => state.table.number);
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8} display={'flex'}>
          <Typography mb={2} fontSize={20} fontWeight={'bold'}>
            Order #{!!cartItems.length && '1234'}
          </Typography>
        </Grid>
        <Grid item xs={8} display={'flex'}>
          <TableRestaurant />
          <Typography display={'inline'} ml={1}>
            Table:{tableNumber}
          </Typography>
        </Grid>
      </Grid>

      <Grid container columns={16} display={'flex'} alignItems={'center'} mb={2}>
        <People />
        <Typography display={'inline'} ml={0.5} mr={1}>
          Guests
        </Typography>
        <TextField
          id='outlined-number'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 1 } }}
          size='small'
        />
      </Grid>
      <Divider />
      {!!cartItems.length && (
        <>
          <Receipt />
          <Divider />
          <Button variant='contained' sx={{ mr: 2, mt: 2 }} fullWidth>
            Save
          </Button>
        </>
      )}
    </Paper>
  );
}

export default Order;
