// import from packages
import React from 'react'
import { useField, FieldHookConfig } from 'formik'
import { TextField } from '@material-ui/core'

// local types and interfaces
type TextInputProps = {
  placeholder: string
  style?: React.CSSProperties | undefined
} & FieldHookConfig<string>

// custom text input
const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  style,
  ...props
}) => {
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
