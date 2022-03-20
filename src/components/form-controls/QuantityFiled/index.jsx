import { Box, FormHelperText, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';


const useStyles = makeStyles((theme) => ({
  root:{},
  box:{
    display: 'flex',
    flexFlow: 'row nowrap',
    maxWidth: '200px',
    alignItems: 'center' 
  },
}))

function QuantityField(props) {
  const { form, name, label, disabled } = props;
  const { errors, setValue } = form;
  const hasError = errors[name];
  const classes = useStyles();
  return (
    <FormControl size='small' error={!!hasError} fullWidth margin="normal" variant="outlined">
      <Typography variant="body2">Quantity</Typography>
      <Controller
        name={name}
        control={form.control}
        render={({ onChange, onBlur, value, name })=>(
          <Box className={classes.box}>
            <IconButton onClick={() => setValue(name,Number.parseInt(value)?Number.parseInt(value) - 1 :1 )}>
              <RemoveCircleOutline/>
            </IconButton>
            
            <OutlinedInput
            id={name}
            type="number"
            disabled={disabled}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            />
          <IconButton onClick={() => setValue(name,Number.parseInt(value)?Number.parseInt(value) + 1 :1 )}>
              <AddCircleOutline/>
            </IconButton>
          </Box>
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default QuantityField;
