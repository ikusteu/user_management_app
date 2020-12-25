// import from packages
import React from 'react'
import { useField } from 'formik'
import { TextField } from '@material-ui/core'

// import from lib
import {} from '../lib/typeDeclarations'

// local interface -- prop-types conversion safe ****test****
type TextInputProps = {
  name: string
  key: string
  style?: React.CSSProperties | Record<string, undefined> // empty object intersection to be translated as 'object' in prop-types
  placeholder: string
  //as: {TextField} // *********test
}

// custom text input
const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  style,
  ...props
}) => {
  // const type = 'input' *********test*********
  const [field, meta] = useField(props)
  return (
    <div style={style}>
      <TextField
        fullWidth
        {...field}
        placeholder={placeholder}
        error={Boolean(meta.error)}
        helperText={meta.error}
      />
    </div>
  )
}

export default TextInput
