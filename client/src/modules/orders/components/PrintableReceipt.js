import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { ccyFormat, invoiceTotal } from '../../common/functions';
import logo from '../../common/assets/images/logo.jpeg';

const PrintableReceipt = ({ order }) => {
  return (
    <Paper sx={{ width: '80mm', padding: '8px', textAlign: 'center' }}>
      <img src={logo} width='100px' alt='Shababeek' />
      <Grid item xs={12}>
        <Typography variant='body2' sx={{ marginBottom: '4px' }}>
          Table: {order.table.name}
        </Typography>
        <Typography variant='body2'>
          {order.admin.firstName} {order.admin.lastName} | {new Date(order.createdAt).toLocaleString()}
        </Typography>
        <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '8px 0' }} />
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          {order.products.map((product) => (
            <Typography key={product._id} style={{ margin: 0 }}>
              <span sx={{ display: 'inline-block', textAlign: 'left', marginRight: 'auto' }}>
                {product.product.name}
              </span>
              <span sx={{ display: 'inline-block', textAlign: 'left' }}> x {product.count}</span>
              <span sx={{ textAlign: 'right' }}> - LE {product.price}</span>
            </Typography>
          ))}
          <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '4px 0' }} />
        </Grid>

        <Grid item xs={12}>
          <Typography style={{ margin: 0 }}>
            Subtotal: LE {order.products.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2)}
          </Typography>
          <Typography style={{ margin: 0 }}>Taxes: LE {order.taxes}</Typography>
          <Typography style={{ margin: 0 }}>Service: LE {order.service}</Typography>
          <Typography style={{ margin: 0 }}>Discount: LE {order.discount}</Typography>
          <Typography style={{ fontWeight: 'bold', margin: 0 }}>
            Total: LE {ccyFormat(invoiceTotal(order.discount, order.taxes, order.service, order.products))}
          </Typography>
          <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '4px 0' }} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6' sx={{ textAlign: 'center' }} style={{ fontWeight: 'bold', margin: 0 }}>
            shababeekdahab.com
          </Typography>
          <Typography variant='h6' sx={{ textAlign: 'center' }} style={{ fontWeight: 'bold', margin: 0 }}>
            Thank you!
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PrintableReceipt;
