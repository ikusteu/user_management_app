import _pt from "prop-types";
// import from packages
import React from 'react';
import { useField } from 'formik';
import ImageUploader from './ImageUploader'; // local interface -- prop-types conversion safe

// custom image upload
const ImageInput = props => {
  // const type = 'input'
  const [{
    value
  },, {
    setValue
  }] = useField(props);
  return <div style={{
    height: '100%',
    width: '100%',
    marginBottom: '2rem'
  }}>
      <ImageUploader value={value} setValue={setValue} />
    </div>;
};

ImageInput.propTypes = {
  name: _pt.string.isRequired,
  key: _pt.string.isRequired
};
export default ImageInput;