// import from packages
import React from 'react'
import { useField, FieldHookConfig } from 'formik'
import ImageCropper from './ImageCropper'

// custom image upload
const ImageInput: React.FC<FieldHookConfig<string>> = ({ ...props }) => {
  const [field, , helpers] = useField(props)

  return (
    <>
      <ImageCropper {...field} {...helpers} />
    </>
  )
}

export default ImageInput
