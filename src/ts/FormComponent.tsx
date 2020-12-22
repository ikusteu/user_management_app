// import from packages
import React from 'react'
import { Formik, Field, Form, useField, FieldHookConfig } from 'formik'
import {
  Button,
  Checkbox,
  Radio,
  TextField,
  FormControlLabel,
} from '@material-ui/core'
import * as yup from 'yup'

type MyRadioProps = {
  label: string
} & FieldHookConfig<{}>

const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField(props)

  return <FormControlLabel {...field} control={<Radio />} label={label} />
}

type MyTextFieldProps = {
  placeholder?: string
} & FieldHookConfig<{}>

const MyTextField: React.FC<MyTextFieldProps> = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ''
  return (
    <TextField
      {...field}
      placeholder={placeholder}
      error={!!errorText}
      helperText={errorText}
    />
  )
}

const valdationSchema = yup.object({
  firstName: yup.string().required().max(10),
  lastName: yup.string().required().max(10),
  isTall: yup.bool(),
})

// component function
const FormComponent: React.FC = () => {
  return (
    <div
      style={{
        width: '50%',
        height: '100vh',
        border: '1px solid gray',
        borderRadius: '5px',
        margin: '0 auto',
        padding: '4rem',
      }}
    >
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          isTall: false,
          cookies: [],
          yoghurt: [],
        }}
        // validate={values => {
        //   const errors: Record<string, string> = {}
        //   if (values.firstName.includes('bob')) {
        //     errors.firstName = 'no bob'
        //   }
        //   return errors
        // }}
        validationSchema={valdationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true)
          // Async call
          setSubmitting(false)
          console.log('submit: ', data)
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <MyTextField
              name='firstName'
              type='input'
              placeholder='First Name'
              as={TextField}
            />
            <MyTextField
              name='lastName'
              type='input'
              placeholder='Last Name'
              as={TextField}
            />
            <div>
              <Field
                name='cookies'
                value='chocolate chip'
                type='checkbox'
                as={Checkbox}
              />
              <Field
                name='cookies'
                value='sugar'
                type='checkbox'
                as={Checkbox}
              />
              <Field
                name='cookies'
                value='snickerdoodle'
                type='checkbox'
                as={Checkbox}
              />
            </div>
            <div>
              <MyRadio
                name='yoghurt'
                type='radio'
                value='Peach'
                label='Peach'
              />
              <MyRadio
                name='yoghurt'
                type='radio'
                value='Apple'
                label='Apple'
              />
              <MyRadio
                name='yoghurt'
                type='radio'
                value='Blueberry'
                label='Blueberry'
              />
            </div>
            <div>
              <Button disabled={isSubmitting} type='submit'>
                Submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormComponent
