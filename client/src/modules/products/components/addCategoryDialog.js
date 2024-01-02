import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useAddCategoryMutation } from '../products.actions';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Category name is required'),
  description: Yup.string(),
});

const AddCategoryDialog = ({ open, onClose }) => {
  const [addCategory, { isSuccess, isError, error }] = useAddCategoryMutation();

  const initialValues = {
    name: '',
    description: '',
  };

  const handleAddCategory = async (values, { resetForm, setFieldError, setSubmitting }) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });

      const { data } = await addCategory(values);

      console.log('Category added successfully:', data);

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
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleAddCategory}>
      {({ isSubmitting, errors, touched, setTouched }) => (
        <Form>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Category</DialogTitle>
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
              <Field as={TextField} label='Description' name='description' fullWidth margin='normal' />
              {isError && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}
              {isSuccess && <div style={{ color: 'green', marginTop: '8px' }}>Category added successfully</div>}
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color='primary'>
                Cancel
              </Button>
              <Button type='submit' color='primary' disabled={isSubmitting} onClick={() => setTouched({ name: true })}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default AddCategoryDialog;
