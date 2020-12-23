// import from packages
import React from 'react'
import {
  TextField,
  Button,
  Typography,
  Checkbox,
  CircularProgress,
} from '@material-ui/core'
import { Formik, Form, Field } from 'formik'

// import from local components
import TextInput from './TextInput'
import ImageInput from './ImageInput'

// import from lib
import {
  getInitialValues,
  getValidationSchema,
  splitCamel,
} from '../lib/functions'
import { InputFormProps } from '../lib/typeDeclarations'

// style for text fields
const textInputStyle = {
  width: '100%',
  margin: '1rem auto 1rem auto',
}

// component function
const InputForm: React.FC<InputFormProps> = ({
  type,
  style,
  onSubmit,
  errorResponse,
}) => {
  return (
    <div style={style}>
      <Typography
        variant='body2'
        style={{
          textAlign: 'center',
          width: '100%',
          fontStyle: 'italic',
          color: 'red',
          marginBottom: '1rem',
        }}
        component='p'
      >
        {errorResponse}
      </Typography>
      <Formik
        validateOnChange={false}
        initialValues={getInitialValues(type)}
        validationSchema={getValidationSchema(type)}
        onSubmit={(data, { setSubmitting }) => onSubmit(data, setSubmitting)}
      >
        {({ isSubmitting, initialValues }) => (
          <Form>
            {Object.keys(initialValues).map(key => {
              const label = splitCamel(key)

              if (typeof initialValues[key] === 'boolean') {
                return (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                      float: 'left',
                    }}
                  >
                    <Field type='checkbox' name={key} as={Checkbox} />
                    <Typography variant='body1' component='p'>
                      Keep Me Logged In
                    </Typography>
                  </div>
                )
              } else if (key === 'avatar') {
                return <ImageInput name={key} key={key} type='input' />
              } else {
                return (
                  <TextInput
                    key={key}
                    style={textInputStyle}
                    type='input'
                    name={key}
                    as={TextField}
                    placeholder={label}
                  />
                )
              }
            })}
            <div style={{ margin: '2.5rem auto', float: 'right' }}>
              {isSubmitting ? (
                <CircularProgress size={30} color='primary' />
              ) : (
                <Button variant='contained' color='primary' type='submit'>
                  Submit
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default InputForm
