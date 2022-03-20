import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';
function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {

      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      props?.closeDialog();
    
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
      console.log(err)
    }
  };
  return (
    <div>
      <LoginForm  onSubmit={handleSubmit} />
    </div>
  );
}

Login.propTypes = {
  closeDialog: PropTypes.func,
};

export default Login;
