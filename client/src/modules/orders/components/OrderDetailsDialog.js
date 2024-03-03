import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';

const OrderDetailsDialog = ({ open, onClose, order }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        <Typography variant='body2'>
          <strong>Table:</strong> {order?.table.name}
        </Typography>
        <Typography variant='body2'>
          <strong>Cashier:</strong> {order?.admin.firstName} {order?.admin.lastName}
        </Typography>
        <Typography variant='body2'>
          <strong>Ordered At:</strong> {new Date(order?.createdAt).toLocaleString()}
        </Typography>
        <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '16px 0' }} />
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          Products
        </Typography>
        <Table>
          <TableBody>
            {order?.products?.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.product.name}</TableCell>
                <TableCell align='right'>{product.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsDialog;
