import React, { useState } from 'react';
import { CircularProgress, Alert, Grid } from '@mui/material';
import TableItem from './TableItem';
import { useTablesQuery } from '../tables.actions';
import AddTableDialog from './addTableDialog';
import AddTableButton from './AddTableButton';
import { useSelector } from 'react-redux';

const TablesPage = () => {
  const { data, isLoading, isError, error } = useTablesQuery();
  const [openModal, setOpenModal] = useState(false);
  const { admin } = useSelector((state) => state.authentication);
  const adminRoles = ['Admin', 'Super Admin'];
  const isAdmin = adminRoles.includes(admin.role);

  const handleAddTable = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert severity='error' style={{ margin: '16px' }}>
        {error.message || 'An error occurred while fetching data.'}
      </Alert>
    );
  }

  const handleAddTable = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const boxStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const iconStyle = {
    fontSize: '48px',
  };

  return (
    <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
      {data?.map((table, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <TableItem table={table} />
        </Grid>
      ))}
      {isAdmin && (
        <>
          <AddTableButton handleAddTable={handleAddTable} />
          <AddTableDialog open={openModal} onClose={handleModalClose} />
        </>
      )}
    </Grid>
  );
};

export default TablesPage;
