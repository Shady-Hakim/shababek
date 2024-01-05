import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useAddProductMutation } from '../products.actions';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  description: Yup.string().required('Product description is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
});

const AddProductDialog = ({ open, onClose, categoryId }) => {
  const [addProduct, { isSuccess, isError, error }] = useAddProductMutation();

  const initialValues = {
    name: '',
    description: '',
    price: '',
  };

  const handleAddProduct = async (values, { resetForm, setFieldError, setSubmitting }) => {
    console.log({ ...values, category: categoryId });
    try {
      await validationSchema.validate(values, { abortEarly: false });

      const { data } = await addProduct({ ...values, category: categoryId });

      console.log('Product added successfully:', data);

      resetForm();
    } catch (validationError) {
      console.error('Validation error:', validationError);

      validationError.inner.forEach((error) => {
        setFieldError(error.path, error.message);
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleAddProduct}>
      {({ isSubmitting, errors, touched, submitForm }) => (
        <Form>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Product</DialogTitle>
            <DialogContent>
              <Field
                as={TextField}
                label='Name'
                name='name'
                fullWidth
                margin='normal'
                error={touched.name && errors.name}
                helperText={<ErrorMessage name='name' />}
              />
              <Field
                as={TextField}
                label='Description'
                name='description'
                fullWidth
                margin='normal'
                error={touched.description && errors.description}
                helperText={<ErrorMessage name='description' />}
              />
              <Field
                as={TextField}
                label='Price'
                name='price'
                type='number'
                fullWidth
                margin='normal'
                error={touched.price && errors.price}
                helperText={<ErrorMessage name='price' />}
              />
              {isError && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}
              {isSuccess && <div style={{ color: 'green', marginTop: '8px' }}>Product added successfully</div>}
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color='primary'>
                Cancel
              </Button>
              <Button type='button' color='primary' disabled={isSubmitting} onClick={submitForm}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default AddProductDialog;
