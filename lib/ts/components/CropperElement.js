import { forbidExtraProps as _forbidExtraProps } from "airbnb-prop-types";
import _pt from "prop-types";
// import from packages
import React, { useEffect, useRef } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import { useMediaQuery } from '@material-ui/core'; // local interface

// component function
const CropperElement = ({
  src,
  updateTempImage
}) => {
  // set breakpoint
  const smallScr = useMediaQuery('(max-width:600px)'); // set responsive size for height and width

  const size = smallScr ? 150 : 300; // set ref

  const imageElement = useRef(null); // wait for image element to mount ref

  useEffect(() => {
    if (imageElement.current) {
      const cropper = new Cropper(imageElement.current, {
        zoomable: false,
        scalable: false,
        autoCropArea: 1,
        aspectRatio: 1,
        crop: () => {
          const canvas = cropper.getCroppedCanvas();
          updateTempImage(canvas.toDataURL('image/png'));
        }
      });
    }
  }, [imageElement]);
  return <div style={{
    width: size,
    height: size,
    margin: 'auto'
  }} className='img-container'>
      <img ref={imageElement} src={src} />
    </div>;
};

CropperElement.propTypes = _forbidExtraProps({
  src: _pt.string.isRequired,
  updateTempImage: _pt.func.isRequired,
  test: _pt.shape({
    a: _pt.string.isRequired,
    b: _pt.number.isRequired
  })
});
export default CropperElement;