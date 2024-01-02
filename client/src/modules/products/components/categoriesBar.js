import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Tabs, tabsClasses, Tab, CircularProgress, Alert } from '@mui/material';
import { useCategoriesQuery } from '../products.actions';

function CategoriesBar({ setCategoryId }) {
  const [value, setValue] = useState(0);
  const { data, isLoading, isError, error } = useCategoriesQuery();

  const handleChange = (event, newValue) => {
    if (!isLoading && !isError) {
      const selectedCategory = data[newValue];
      setCategoryId(selectedCategory._id || data[0]._id);
      setValue(newValue);
    }
  };

  return (
    <Grid item xs={12} md={4} lg={3} mb={5} display={'inline'}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          position: 'relative',
        }}>
        {isLoading && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}>
            <CircularProgress />
          </Box>
        )}
        {isError && <Alert severity='error'>{error.message || 'An error occurred while fetching data.'}</Alert>}
        {!isLoading && !isError && (
          <Tabs
            value={value}
            onChange={handleChange}
            variant='scrollable'
            scrollButtons
            aria-label='visible arrows tabs example'
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },
            }}>
            {data?.map((category, index) => (
              <Tab key={category._id} label={category.name} />
            ))}
          </Tabs>
        )}
      </Box>
    </Grid>
  );
}

export default CategoriesBar;
