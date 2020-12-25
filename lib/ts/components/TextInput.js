import { forbidExtraProps as _forbidExtraProps } from "airbnb-prop-types";
// import from packages
import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core'; // import from lib

// custom text input
const TextInput = ({
  placeholder,
  style,
  ...props
}) => {
  const [field, meta] = useField(props);
  return <div style={style}>
      <TextField fullWidth {...field} placeholder={placeholder} error={Boolean(meta.error)} helperText={meta.error} />
    </div>;
};

export default TextInput;