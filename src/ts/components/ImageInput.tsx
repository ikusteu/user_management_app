// import from packages
import React from 'react'
import { useField, FieldHookConfig } from 'formik'
import ImageUploader from './ImageUploader'

// custom image upload
const ImageInput: React.FC<FieldHookConfig<string>> = ({ ...props }) => {
  const [field, , helpers] = useField(props)

  return (
    <div style={{ height: '100%', width: '100%', marginBottom: '2rem' }}>
      <ImageUploader {...field} {...helpers} />
    </div>
  )
}

export default ImageInput
