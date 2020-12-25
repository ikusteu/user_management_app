import _pt from "prop-types";
// import from packages
import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core'; // import from lib

import '../lib/typeDeclarations'; // local interface -- prop-types conversion safe ****test****

// custom text input
const TextInput = ({
  placeholder,
  style,
  ...props
}) => {
  // const type = 'input' *********test*********
  const [field, meta] = useField(props);
  return <div style={style}>
      <TextField fullWidth {...field} placeholder={placeholder} error={Boolean(meta.error)} helperText={meta.error} />
    </div>;
};

TextInput.propTypes = {
  name: _pt.string.isRequired,
  key: _pt.string.isRequired,

  /* empty object intersection to be translated as 'object' in prop-types*/
  placeholder: _pt.string.isRequired
};
export default TextInput;