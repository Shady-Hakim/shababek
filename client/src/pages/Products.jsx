import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTable } from '../modules/common/table';
import { Products } from '../modules/products/components';

const ProductsPage = () => {
  let { tableNumber } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTable(tableNumber));
  }, [dispatch, tableNumber]);

  return <Products />;
};

export default ProductsPage;
