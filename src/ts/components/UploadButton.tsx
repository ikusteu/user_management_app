// import from packages
import React, { useRef } from 'react'
import { IconButton, Button, useMediaQuery } from '@material-ui/core'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import Compress from 'client-compress'

interface UploadButtonProps {
  handleUpload: (file: string) => void
  style: React.CSSProperties | Record<string, undefined> // empty object intersection to be translated as 'object' in prop-types
}

// styled upload button
const UploadButton: React.FC<UploadButtonProps> = ({ style, handleUpload }) => {
  // set breakpoints
  const smallScr = useMediaQuery('(max-width:600px)')
  const medScr = useMediaQuery('(max-width:760px)')

  // upload button ref
  const uploadButton = useRef<HTMLInputElement>(null)

  // bind styled button being clicked and hidden upload button
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (uploadButton.current) {
      uploadButton.current.click()
    }
  }

  // create resize logic
  const compress = new Compress({
    maxWidth: 600,
    maxHeight: 600,
    resize: true,
    targetSize: 0.2,
    throwIfSizeNotReached: true,
  })

  const resizeImg = async (files: File[]) => {
    const compressedFiles = await compress.compress(files)
    const imageData = compressedFiles[0].photo.data
    return imageData
  }

  // handle upload form change
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // init file reader
    const reader = new FileReader()

    // update file as data url
    reader.onloadend = () => {
      const result = reader.result
      if (typeof result === 'string') {
        // upload resized image
        handleUpload(result)
      }
    }

    // if files read
    if (e.target.files) {
      // extract file from event
      const file = e.target.files[0]
      try {
        // get resized image file
        const imageData = await resizeImg([file])
        // read file and convert to string
        reader.readAsDataURL(imageData)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    }
  }

  return (
    <>
      <input
        style={{ display: 'none' }}
        ref={uploadButton}
        type='file'
        name='uploadImage'
        id='uploadImage'
        onChange={handleChange}
      />
      {smallScr ? (
        <IconButton
          size='medium'
          style={style}
          color='primary'
          onClick={e => handleClick(e)}
        >
          <AddPhotoAlternateIcon />
        </IconButton>
      ) : (
        <Button
          style={style}
          variant='contained'
          size={medScr ? 'small' : 'medium'}
          color='primary'
          onClick={e => handleClick(e)}
        >
          UPLOAD
        </Button>
      )}
    </>
  )
}

export default UploadButton
