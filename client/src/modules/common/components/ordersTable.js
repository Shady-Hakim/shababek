import * as React from 'react';
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

const columns = [
  { id: 'orderNumber', label: 'Order number', minWidth: 170 },
  { id: 'total', label: 'Total', minWidth: 100 },
  {
    id: 'table',
    label: 'Table',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'edit',
    label: 'Edit',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'pay',
    label: 'Pay',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(orderNumber, total, table, edit, pay) {
  return { orderNumber, total, table, edit, pay };
}

const rows = [
  createData('1234', '200 LE', 1, 'Edit', 'Pay'),
  createData('1234', '200 LE', 1, 'Edit', 'Pay'),
  createData('1234', '200 LE', 1, 'Edit', 'Pay'),
  createData('1234', '200 LE', 1, 'Edit', 'Pay'),
  createData('1234', '200 LE', 1, 'Edit', 'Pay'),
  createData('1234', '200 LE', 1, 'Edit', 'Pay'),
  createData('1234', '200 LE', 1, 'Edit', 'Pay'),
  createData('1234', '200 LE', 1, 'Edit', 'Pay'),
  createData('1234', '200 LE', 1, 'Edit', 'Pay'),
  createData('1234', '200 LE', 1, 'Edit', 'Pay'),
  createData('1234', '200 LE', 1, 'Edit', 'Pay'),
  createData('1234', '200 LE', 1, 'Edit', 'Pay'),
  createData('1234', '200 LE', 1, 'Edit', 'Pay'),
  createData('1234', '200 LE', 1, 'Edit', 'Pay'),
  createData('1234', '200 LE', 1, 'Edit', 'Pay'),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
