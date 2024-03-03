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
  Tabs,
  Tab,
  Box,
  CircularProgress,
  Button,
} from '@mui/material';
import { useOrdersQuery } from '../order.actions';
import { ccyFormat, invoiceTotal } from '../../common/functions';
import PaymentDialog from './PaymentDialog';
import OrderDetailsDialog from './OrderDetailsDialog';

const columns = [
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
    id: 'actions',
    label: 'Actions',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'view',
    label: 'View',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(table, user, createdDate, statue, total, edit, actions, view) {
  return { table, user, createdDate, statue, total, edit, actions, view };
}

const filterOrders = (orders, status) => {
  return orders?.filter((order) => order.status === status);
};

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openOrderDetailsDialog, setOpenOrderDetailsDialog] = useState(false);

  const { data, isLoading, isError, error, refetch } = useOrdersQuery();
  const orderedOrders = filterOrders(data, 'Ordered');
  const paidOrders = filterOrders(data, 'Paid');
  const cancelledOrders = filterOrders(data, 'Cancelled');
  const refundedOrders = filterOrders(data, 'Refunded');

  const handleActionsClick = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setOpenOrderDetailsDialog(true);
  };

  const getSelectedOrders = () => {
    switch (selectedTab) {
      case 0:
        return orderedOrders;
      case 1:
        return paidOrders;
      case 2:
        return cancelledOrders;
      case 3:
        return refundedOrders;
      default:
        return [];
    }
  };

  const rows = getSelectedOrders()?.map((order) =>
    createData(
      order.table?.name,
      order.admin.firstName + ' ' + order.admin.lastName,
      new Date(order.createdAt).toLocaleString(),
      order.status,
      ccyFormat(invoiceTotal(order.discount, order.taxes, order.service, order.products)),
      'Edit',
      <Button onClick={() => handleActionsClick(order)}>Actions</Button>,
      <Button onClick={() => handleViewClick(order)}>View</Button>
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
    setPage(0);
  };

  return (
    <Box>
      <Tabs value={selectedTab} onChange={handleChangeTab} variant='fullWidth' indicatorColor='primary'>
        <Tab label='Ordered' />
        <Tab label='Paid' />
        <Tab label='Cancelled' />
        <Tab label='Refunded' />
      </Tabs>
      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      )}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && !isError && (
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
      )}
      <PaymentDialog refetch={refetch} open={openDialog} onClose={() => setOpenDialog(false)} order={selectedOrder} />
      {selectedOrder && (
        <OrderDetailsDialog
          open={openOrderDetailsDialog}
          onClose={() => setOpenOrderDetailsDialog(false)}
          order={selectedOrder}
        />
      )}
    </Box>
  );
}
