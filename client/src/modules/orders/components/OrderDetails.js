import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Divider, Grid, Paper, TextField, Typography, Button } from '@mui/material';
import { People, TableRestaurant } from '@mui/icons-material';
import Receipt from './Receipt';

const Order = () => {
  const tableNumber = useSelector((state) => state.table.number);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [calculations, setCalculations] = useState();
  const [guests, setGuests] = useState();

  const order = { guests, cartItems, tableNumber: tableNumber, ...calculations };
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
          error={guests < 1}
          id='outlined-number'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 1 } }}
          size='small'
          onChange={(event) => setGuests(+event.target.value)}
        />
      </Grid>
      <Divider />
      {!!cartItems.length && (
        <>
          <Receipt setCalculations={setCalculations} />
          <Divider />
          <Button onClick={() => console.log({ order })} variant='contained' sx={{ mr: 2, mt: 2 }} fullWidth>
            Save
          </Button>
        </>
      )}
    </Paper>
  );
};

export default Order;
