import React from 'react';
import { useDispatch } from 'react-redux';
import { TableCell, TableRow, TextField } from '@mui/material';
import { changeQty, removeItem } from '../../common/cart';
import { Button } from '@mui/base';

const ItemRow = ({ row }) => {
  const dispatch = useDispatch();

  const handleQtyChange = (event) => {
    dispatch(changeQty({ ...row, qty: +event.target.value }));
  };
  return (
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell>{row.name}</TableCell>
      <TableCell align='right'>
        <TextField
          error={row.qty < 1}
          value={row.qty}
          id='outlined-number'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 1 } }}
          size='small'
          onChange={handleQtyChange}
        />
      </TableCell>
      <TableCell align='right'>{row.price * row.qty} LE</TableCell>
      <TableCell align='right'>
        <Button onClick={() => dispatch(removeItem(row.id))}>x</Button>
      </TableCell>
    </TableRow>
  );
};

export default ItemRow;
