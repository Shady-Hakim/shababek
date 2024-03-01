import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Grid, Paper, TextField, Typography, Button, Dialog, DialogContent } from '@mui/material';
import { People, TableRestaurant } from '@mui/icons-material';
import Receipt from './Receipt';
import { useAddOrderMutation } from '../order.actions';
import { clearCart } from '../../common/cart';
import { useParams } from 'react-router-dom';

const Order = ({ table }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [addOrder, { isSuccess, isError }] = useAddOrderMutation();
  const [rates, setRates] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [guests, setGuests] = useState();
  const dispatch = useDispatch();

  const products = cartItems.map((product) => ({
    product: product._id,
    price: product.price,
    count: product.count,
  }));

  const order = {
    table: table._id,
    guests,
    products,
    ...rates,
  };

  const createOrder = async (order) => {
    await addOrder(order);
    setOpenDialog(true);

    setTimeout(() => {
      setOpenDialog(false);
    }, 2000);
  };

  useEffect(() => {
    if (isSuccess) dispatch(clearCart());
  }, [dispatch, isSuccess]);

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
            Table:{table?.name}
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          {isError && <div style={{ color: 'red', marginTop: '8px' }}>Error creating order</div>}
          {isSuccess && <div style={{ color: 'green', marginTop: '8px' }}>Order successful</div>}
        </DialogContent>
      </Dialog>
      {!!cartItems.length && (
        <>
          <Receipt setRates={setRates} />
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button onClick={() => createOrder(order)} variant='contained' sx={{ mt: 2 }} fullWidth>
                Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={() => dispatch(clearCart())} variant='outlined' sx={{ mt: 2 }} fullWidth>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Paper>
  );
};

export default Order;
