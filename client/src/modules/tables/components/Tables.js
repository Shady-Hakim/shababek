import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import TableItem from './TableItem';
import { useTablesQuery } from '../tables.actions';
import { CircularProgress, Alert } from '@mui/material';

const TablesPage = () => {
  const { data, isLoading, isError, error } = useTablesQuery();

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

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {data?.map((table, index) => (
        <TableItem table={table} key={index} />
      ))}
    </Grid>
  );
};

export default TablesPage;
