import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TextField } from '@mui/material';
import ItemRow from './ItemRow';

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function handleSubtotal(items) {
  return items.map(({ price, qty }) => price * qty).reduce((sum, i) => sum + i, 0);
}

const Receipt = ({ setRates }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [discountRate, setDiscountRate] = useState(0);
  const taxRate = 0.14;
  const serviceRate = 0.12;

  const subtotal = handleSubtotal(cartItems);
  const taxesAmount = taxRate * subtotal;
  const serviceAmount = serviceRate * subtotal;
  const totalWithTaxesAndService = taxesAmount + serviceAmount + subtotal;
  const discountAmount = (discountRate / 100) * totalWithTaxesAndService;
  const invoiceTotal = totalWithTaxesAndService - discountAmount;

  useEffect(() => {
    setRates({
      taxes: taxRate,
      service: serviceRate,
      discount: discountRate,
    });
  }, [discountRate, setRates, taxRate]);

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
            <TableCell rowSpan={5} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align='right'>{ccyFormat(subtotal)} LE</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax 14%</TableCell>
            <TableCell colSpan={2} align='right'>
              {ccyFormat(taxesAmount)} LE
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Service 12%</TableCell>
            <TableCell colSpan={2} align='right'>
              {ccyFormat(serviceAmount)} LE
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Discount %</TableCell>
            <TableCell colSpan={2} align='right'>
              <TextField
                error={discountRate < 0}
                defaultValue={0}
                id='outlined-number'
                type='number'
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ inputProps: { min: 0 } }}
                size='small'
                onChange={(event) => setDiscountRate(event.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell colSpan={2} align='right'>
              {ccyFormat(invoiceTotal)} LE
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Receipt;
