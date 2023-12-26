import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import { OrderDetails } from '../modules/orders/components';
import OrdersTable from '../modules/common/components/ordersTable';

const Orders = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={8}>
        <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, marginBottom: 5 }}>
          Orders list
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
          <OrdersTable />
        </Grid>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <OrderDetails />
      </Grid>
    </Grid>
  );
};

export default Orders;
