// import from packages
import React, { useEffect, useState } from 'react'
import { Button, IconButton, useMediaQuery } from '@material-ui/core'
import CropIcon from '@material-ui/icons/Crop'
import SaveIcon from '@material-ui/icons/Save'
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore'

// import from loacl components
import CropperElement from './CropperElement'
import UploadButton from './UploadButton'

// local interface -- prop-types conversion safe
interface ImageUploaderProps {
  value: string
  setValue: (value: string) => void
}

// component function
const ImageUploader: React.FC<ImageUploaderProps> = ({ value, setValue }) => {
  // set breakpoints
  const smallScr = useMediaQuery('(max-width:600px)')
  const medScr = useMediaQuery('(max-width:760px)')
  // set responsive size for height and width
  const size = smallScr ? 150 : 300

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
        <div style={{ margin: 'auto', width: size, height: size }}>
          {cropping ? (
            <CropperElement
              key={imageKey}
              src={imageSrc}
              updateTempImage={setTempImage}
            />
          ) : (
            <div style={{ width: size, height: size, margin: 'auto' }}>
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
        {!smallScr && (
          <Button
            style={{ margin: '4px' }}
            onClick={e => handleClick(e)}
            variant='contained'
            size={medScr ? 'small' : 'medium'}
            color='primary'
          >
            {cropping ? 'SAVE' : 'CROP'}
          </Button>
        )}
        {smallScr && (
          <IconButton
            style={{ marginLeft: '8px' }}
            onClick={e => handleClick(e)}
            color='primary'
          >
            {cropping ? <SaveIcon /> : <CropIcon />}
          </IconButton>
        )}
        {smallScr ? (
          <IconButton
            style={{ margin: '4px' }}
            onClick={e => handleRestore(e)}
            color='primary'
          >
            <SettingsBackupRestoreIcon />
          </IconButton>
        ) : (
          <Button
            style={{ margin: '4px' }}
            onClick={e => handleRestore(e)}
            variant='contained'
            size={medScr ? 'small' : 'medium'}
            color='primary'
          >
            RESTORE
          </Button>
        )}
        <UploadButton style={{ margin: '4px' }} handleUpload={handleUpload} />
      </div>
    </>
  )
}

export default ImageUploader
