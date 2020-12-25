import { forbidExtraProps as _forbidExtraProps } from "airbnb-prop-types";
// import from packages
import React from 'react';
import { useField } from 'formik';
import ImageUploader from './ImageUploader'; // custom image upload

const ImageInput = ({ ...props
}) => {
  const [field,, helpers] = useField(props);
  return <div style={{
    height: '100%',
    width: '100%',
    marginBottom: '2rem'
  }}>
      <ImageUploader {...field} {...helpers} />
    </div>;
};

export default ImageInput;