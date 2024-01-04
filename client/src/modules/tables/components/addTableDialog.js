import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useAddTableMutation } from '../tables.actions';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Table name is required'),
  description: Yup.string(),
});

const AddTableDialog = ({ open, onClose }) => {
  const [addTable, { isSuccess, isError, error }] = useAddTableMutation();

  const initialValues = {
    name: '',
    description: '',
  };

  const handleAddTable = async (values, { setFieldError, resetForm, setSubmitting }) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });

      const { data } = await addTable(values);

      console.log('Table added successfully:', data);

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
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleAddTable}>
      {({ isSubmitting, errors, touched, setTouched }) => (
        <Form>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Table</DialogTitle>
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
              {isError && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}
              {isSuccess && <div style={{ color: 'green', marginTop: '8px' }}>Table added successfully</div>}
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

export default AddTableDialog;
