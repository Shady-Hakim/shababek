import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, Typography, Grid } from '@mui/material';

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

function AddTableButton({ handleAddTable }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box sx={boxStyle} onClick={handleAddTable}>
        <IconButton color='primary' aria-label='add table' sx={iconStyle}>
          <AddIcon />
        </IconButton>
        <Typography variant='subtitle1' sx={{ marginTop: '8px' }}>
          Add New Table
        </Typography>
      </Box>
    </Grid>
  );
}

export default AddTableButton;
