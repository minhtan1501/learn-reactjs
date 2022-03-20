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
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
// import InputField from '../../../../components/form-controls/InputField';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    position: 'relative',
  },
  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

function RegisterForm(props) {
  const classes = useStyles();
  const schema = yup
    .object()
    .shape({
      fullname: yup
        .string()
        .required('Please enter your full name')
        .test(
          'should has at least two words',
          'Please enter at least two words',
          (value) => {
            return value.split(' ').length >= 2;
          }
        ),
      email: yup
        .string()
        .required('Please enter your email')
        .email('Please enter a valid email address '),
      password: yup
        .string()
        .required('Please enter yours password')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\\.])[A-Za-z\d@$!%*?&\\.]{8,}$/,
          'Please enter a valid password'
        ),
      retypePassword: yup
        .string()
        .required('Please retype your password')
        .oneOf([yup.ref('password')], 'Password dose not match'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) await onSubmit(values);
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography
        className={classes.title}
        color="textPrimary"
        component="h3"
        variant="h5"
      >
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField form={form} name="fullname" label="Full Name" />
        <InputField form={form} name="email" label="Email" />
        <PasswordField form={form} name="password" label="Password" />
        <PasswordField form={form} name="retypePassword" label="Retype Password" />
        <Button
          size='large'
          disabled={isSubmitting}
          type="submid"
          fullWidth
          className={classes.submit}
          variant="contained"
          color="primary"
        >
          CREATE AN ACCOUNT
        </Button>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default RegisterForm;
