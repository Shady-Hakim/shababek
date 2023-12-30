import React from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Typography, Paper, Button } from '@mui/material';
import { addToCart } from '../../../modules/common/cart';

const ProductPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const ProductImage = styled('img')({
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => dispatch(addToCart(product));

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <ProductPaper elevation={3}>
        <ProductImage src={product.imageUrl} width={200} alt={product.name} loading='lazy' />
        <Typography variant='h6' mt={2} mb={1}>
          {product.name}
        </Typography>
        <Typography variant='body1' fontWeight='bold'>
          {product.price} LE
        </Typography>
        <Button onClick={handleAddToCart} variant='contained' color='primary' sx={{ mt: 2 }}>
          Add to Cart
        </Button>
      </ProductPaper>
    </Grid>
  );
}

export default ProductItem;
