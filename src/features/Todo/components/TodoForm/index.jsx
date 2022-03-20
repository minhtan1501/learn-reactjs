import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import InputField from 'components/form-controls/InputField';
// import InputField from '../../../../components/form-controls/InputField';

function TodoForm(props) {
  const schema = yup
    .object()
    .shape({
      title: yup.string().required('Please enter title'),
      // test: yup.string().required('Please enter title'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      title: '',
      // test:''
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) onSubmit(values);

    form.reset();
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField form={form} name="title" label="Todo" />
      {/* <InputField form={form} name="test" label="nhap ten" />
    <Button onClick={form.handleSubmit(data => console.log(data))}>submit</Button> */}
    </form>
  );
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default TodoForm;
