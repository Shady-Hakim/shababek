import React, { useState } from 'react';
import {
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
} from '@mui/material';
import { useOrdersQuery } from '../order.actions';

const columns = [
  { id: 'orderNumber', label: 'Order number', minWidth: 170 },
  {
    id: 'table',
    label: 'Table',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'user', label: 'User', minWidth: 100 },
  { id: 'createdDate', label: 'Created date', minWidth: 100 },
  { id: 'statue', label: 'Statues', minWidth: 100 },
  { id: 'total', label: 'Total', minWidth: 100 },

  {
    id: 'edit',
    label: 'Edit',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'pay',
    label: 'Pay',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(orderNumber, table, user, createdDate, statue, total, edit, pay) {
  return { orderNumber, table, user, createdDate, statue, total, edit, pay };
}

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, isLoading, isError, error } = useOrdersQuery();

  const rows = data?.map((order) =>
    createData(
      order._id,
      order.table.name,
      order.admin.firstName + ' ' + order.admin.lastName,
      new Date(order.createdAt).toLocaleString(),
      order.status,
      'Total',
      'Edit',
      'Pay'
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={'left'} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={'left'}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
