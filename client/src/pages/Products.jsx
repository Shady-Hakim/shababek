import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import CategoriesBar from '../modules/common/components/categoriesBar';
import ProductItem from '../modules/common/components/productItem';
import { addTable } from '../modules/common/table';
import { Order } from '../modules/products/components';

const products = [
  { id: 1, name: 'A', price: 100 },
  { id: 2, name: 'B', price: 200 },
  { id: 3, name: 'C', price: 300 },
  { id: 4, name: 'D', price: 400 },
  { id: 5, name: 'E', price: 500 },
  { id: 6, name: 'F', price: 600 },
];

const Products = () => {
  let { tableNumber } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTable(tableNumber));
  }, [dispatch, tableNumber]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={8}>
        <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, marginBottom: 5 }}>
          Table #{tableNumber}
        </Typography>
        <CategoriesBar />

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Order />
      </Grid>
    </Grid>
  );
};

export default Products;
