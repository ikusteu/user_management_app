// import from packages
import React, { useEffect, useRef } from 'react'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'

//import local styles
import './crop.css'

// local interface
interface CropperElementProps {
  src: string
  updateTempImage: (src: string) => void
}

// component function
const CropperElement: React.FC<CropperElementProps> = ({
  src,
  updateTempImage,
}) => {
  // set ref
  const imageElement = useRef<HTMLImageElement>(null)

  // wait for image element to mount ref
  useEffect(() => {
    if (imageElement.current) {
      const cropper = new Cropper(imageElement.current, {
        zoomable: false,
        scalable: false,
        autoCropArea: 1,
        aspectRatio: 1,
        crop: () => {
          const canvas = cropper.getCroppedCanvas()
          updateTempImage(canvas.toDataURL('image/png'))
        },
      })
    }
  }, [imageElement])

  return (
    <div
      style={{ width: 300, height: 300, margin: 'auto' }}
      className='img-container'
    >
      <img ref={imageElement} src={src} />
    </div>
  )
}

export default CropperElement
