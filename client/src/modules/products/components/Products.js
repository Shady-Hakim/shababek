import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import { addTable } from '../../common/table';
import CategoriesBar from './categoriesBar';
import Order from '../../orders/components/OrderDetails';
import ProductItem from './productItem';
import { useProductsMutation } from '../products.actions';

const Products = () => {
  let { tableNumber } = useParams();
  const [categoryId, setCategoryId] = useState();
  const dispatch = useDispatch();
  const [products, { data, isLoading, isError, error }] = useProductsMutation();

  useEffect(() => {
    dispatch(addTable(tableNumber));
  }, [dispatch, tableNumber]);

  useEffect(() => {
    products(categoryId || '');
  }, [categoryId, products]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={8}>
        <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, marginBottom: 5 }}>
          Table #{tableNumber}
        </Typography>
        <CategoriesBar setCategoryId={setCategoryId} />

        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {error.message}</p>}
        {!isLoading && !isError && (
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
            {data?.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Order />
      </Grid>
    </Grid>
  );
};

export default Products;
