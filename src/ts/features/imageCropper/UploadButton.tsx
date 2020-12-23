// import from packages
import React, { useRef } from 'react'
import { Button } from '@material-ui/core'

interface UploadButtonProps {
  handleUpload: (file: string) => void
  style: React.CSSProperties
}

// styled upload button
const UploadButton: React.FC<UploadButtonProps> = ({ style, handleUpload }) => {
  // upload button ref
  const uploadButton = useRef<HTMLInputElement>(null)

  // bind styled button being clicked and hidden upload button
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (uploadButton.current) {
      uploadButton.current.click()
    }
  }

  // handle upload form change
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // init file reader
      const reader = new FileReader()

      // update file as data url
      reader.onloadend = () => {
        const result = reader.result
        if (typeof result === 'string') {
          //   setUpload(result)
          handleUpload(result)
        }
      }

      // read file and convert to string
      reader.readAsDataURL(e.target.files[0])
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

      <Button
        style={style}
        variant='contained'
        color='primary'
        onClick={e => handleClick(e)}
      >
        UPLOAD IMAGE
      </Button>
    </>
  )
}

export default UploadButton
