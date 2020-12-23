// import from packages
import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { FieldHelperProps, FieldInputProps } from 'formik'

//import local styles
import './crop.css'

// import from loacl components
import CropperElement from './CropperElement'
import UploadButton from './UploadButton'

// local interface
type ImageUploaderProps = FieldHelperProps<string> & FieldInputProps<string>

// component function
const ImageUploader: React.FC<ImageUploaderProps> = ({ value, setValue }) => {
  // init state

  // saves uploaded image for 'image restore'
  const [hardCopy, setHardCopy] = useState(value)

  // image to get uploaded with user data
  const [imageSrc, setImageSrc] = useState(hardCopy)

  // control refresh when editing image
  const [imageKey, setImageKey] = useState(0)

  // temp image while cropping
  const [tempImage, setTempImage] = useState(hardCopy)

  // toggle cropping / basic view
  const [cropping, setCropping] = useState(false)

  // simulate 'onChange' effect of an input element
  useEffect(() => {
    setValue(imageSrc)
  }, [imageSrc])

  // pass down function, lifts state up
  const handleSave = () => {
    setImageSrc(tempImage)
    setImageKey(imageKey => imageKey + 1)
  }

  // toggle between croping / basic view
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (cropping) {
      handleSave()
      setCropping(false)
    } else {
      setCropping(true)
    }
  }

  // handle 'restore image'
  const handleRestore = (e: React.MouseEvent) => {
    e.preventDefault()
    setImageSrc(hardCopy)
    setTempImage(hardCopy)
    setImageKey(imageKey => imageKey + 1)
  }

  // handle upload from styled upload button
  const handleUpload = (file: string) => {
    if (file) {
      setHardCopy(file)
      setImageSrc(file)
      setImageKey(imageKey => imageKey + 1)
    }
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ margin: 'auto', width: 300, height: 300 }}>
          {cropping ? (
            <CropperElement
              key={imageKey}
              src={imageSrc}
              updateTempImage={setTempImage}
            />
          ) : (
            <div style={{ width: 300, height: 300, margin: 'auto' }}>
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div style={{ width: '100%', textAlign: 'center', marginTop: '8px' }}>
        <Button
          style={{ marginLeft: '8px' }}
          onClick={e => handleClick(e)}
          variant='contained'
          color='primary'
        >
          {cropping ? 'SAVE' : 'CROP'}
        </Button>
        <Button
          style={{ marginLeft: '8px' }}
          onClick={e => handleRestore(e)}
          variant='contained'
          color='primary'
        >
          RESTORE IMAGE
        </Button>
        <UploadButton
          style={{ marginLeft: '8px' }}
          handleUpload={handleUpload}
        />
      </div>
    </>
  )
}

export default ImageUploader
