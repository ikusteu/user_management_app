// import from packages
import React from 'react'
import { useField } from 'formik'
import ImageUploader from './ImageUploader'

// local interface -- prop-types conversion safe
interface ImageInputProps {
  name: string
  key: string
}

// custom image upload
const ImageInput: React.FC<ImageInputProps> = props => {
  // const type = 'input'
  const [{ value }, , { setValue }] = useField(props)

  return (
    <div style={{ height: '100%', width: '100%', marginBottom: '2rem' }}>
      <ImageUploader value={value} setValue={setValue} />
    </div>
  )
}

export default ImageInput
