import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Button, CircularProgress } from '@mui/material';
import CategoriesBar from './categoriesBar';
import Order from '../../orders/components/OrderDetails';
import ProductItem from './productItem';
import { useProductsMutation } from '../products.actions';
import { addTable } from '../../common/table';
import AddCategoryDialog from './addCategoryDialog';
import AddProductDialog from './addProductDialog';
import { useTablesQuery } from '../../tables/tables.actions';

const Products = () => {
  let { tableId } = useParams();
  const [categoryId, setCategoryId] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);
  const dispatch = useDispatch();
  const [products, { data, isLoading, isError, error }] = useProductsMutation();
  const { data: tablesData } = useTablesQuery();
  const { admin } = useSelector((state) => state.authentication);
  const adminRoles = ['Admin', 'Super Admin'];
  const isAdmin = adminRoles.includes(admin.role);
  const currentTable = tablesData?.find((table) => table._id === tableId);

  useEffect(() => {
    dispatch(addTable(currentTable));
  }, [dispatch, currentTable]);

  useEffect(() => {
    products(categoryId || '');
  }, [categoryId, products]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={8}>
        <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, marginBottom: 5 }}>
          Table #{currentTable?.name}
        </Typography>

        <CategoriesBar setCategoryId={setCategoryId} />

        {isLoading && (
          <Grid container justifyContent='center' alignItems='center' height='200px'>
            <CircularProgress size={40} />
          </Grid>
        )}
        {isError && <p>Error: {error.message}</p>}
        {!isLoading && !isError && data?.length > 0 ? (
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
            {data?.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </Grid>
        ) : (
          <Typography variant='h6' sx={{ textAlign: 'center', marginTop: 2 }}>
            {data?.length === 0 ? 'No products available' : ''}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Order />
      </Grid>
      {isAdmin && (
        <>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant='contained' color='primary' onClick={() => setOpenModal(true)} sx={{ mr: 2 }}>
              Add Category
            </Button>
            <Button variant='contained' color='primary' onClick={() => setOpenProductModal(true)}>
              Add Product
            </Button>
          </Grid>
          <AddCategoryDialog open={openModal} onClose={() => setOpenModal(false)} />
          <AddProductDialog
            open={openProductModal}
            onClose={() => setOpenProductModal(false)}
            categoryId={categoryId}
          />
        </>
      )}
    </Grid>
  );
};

export default Products;
