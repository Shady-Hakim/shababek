import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TextField } from '@mui/material';
import ItemRow from './itemRow';

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function subtotal(items) {
  return items.map(({ price, qty }) => price * qty).reduce((sum, i) => sum + i, 0);
}

export default function Receipt() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [taxRate, setTaxRate] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  console.log(taxRate);
  const invoiceSubtotal = subtotal(cartItems);
  const invoiceTaxes = (taxRate / 100) * invoiceSubtotal + invoiceSubtotal;
  const invoiceTotal = invoiceTaxes - (discountRate / 100) * invoiceTaxes;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Qty.</TableCell>
            <TableCell align='right'>Sum</TableCell>
            <TableCell align='right'>X</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item) => (
            <ItemRow key={item.id} row={item} />
          ))}
          <TableRow>
            <TableCell rowSpan={4} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align='right'>{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax %</TableCell>
            <TableCell colSpan={2} align='right'>
              <TextField
                id='outlined-number'
                type='number'
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ inputProps: { min: 1 } }}
                size='small'
                onChange={(event) => setTaxRate(event.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Discount %</TableCell>
            <TableCell colSpan={2} align='right'>
              <TextField
                id='outlined-number'
                type='number'
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ inputProps: { min: 1 } }}
                size='small'
                onChange={(event) => setDiscountRate(event.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell colSpan={2} align='right'>
              {ccyFormat(invoiceTotal)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
