import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import { OrdersTable } from '../modules/orders/components';

const Orders = () => {
  return (
    <Grid>
      <Grid>
        <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, marginBottom: 5 }}>
          Orders list
        </Typography>
        <OrdersTable />
      </Grid>
    </Grid>
  );
};

export default Orders;
