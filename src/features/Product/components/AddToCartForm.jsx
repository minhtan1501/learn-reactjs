import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Typography,
  makeStyles,
  Button,
  LinearProgress,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import QuantityField from 'components/form-controls/QuantityFiled';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
  const schema = yup
    .object()
    .shape({
      quantity: yup
        .number()
        .required('Please enter quantity')
        .min(1, 'Minimum value is 1').typeError('Amount must be a number'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    if (onSubmit) onSubmit(values);
  };

  const { isSubmitting } = form.formState;

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <QuantityField form={form} name="quantity" label="Quantity" />
        <Button
          size="large"
          disabled={isSubmitting}
          type="submid"
          style={{width: '200px'}}
          variant="contained"
          color="primary"
        >
          ADD TO CART
        </Button>
      </form>
    </div>
  );
}

export default AddToCartForm;
