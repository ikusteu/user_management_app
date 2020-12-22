// import from packages
import React from 'react';
import { TextField, Button, Typography, Checkbox, CircularProgress, } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
// import from local components
import TextInput from './TextInput';
import { getInitialValues, getValidationSchema, splitCamel, } from '../lib/functions';
// style for text fields
var textInputStyle = {
    width: '100%',
    margin: '0 auto 1rem auto',
};
// component function
var InputForm = function (_a) {
    var type = _a.type, style = _a.style, onSubmit = _a.onSubmit, errorResponse = _a.errorResponse;
    return (React.createElement("div", { style: style },
        React.createElement(Typography, { variant: 'body2', style: {
                textAlign: 'center',
                width: '100%',
                fontStyle: 'italic',
                color: 'red',
                marginBottom: '1rem',
            }, component: 'p' }, errorResponse),
        React.createElement(Formik, { validateOnChange: false, initialValues: getInitialValues(type), validationSchema: getValidationSchema(type), onSubmit: function (data, _a) {
                var setSubmitting = _a.setSubmitting;
                return onSubmit(data, setSubmitting);
            } }, function (_a) {
            var isSubmitting = _a.isSubmitting, initialValues = _a.initialValues;
            return (React.createElement(Form, null,
                Object.keys(initialValues).map(function (key) {
                    var label = splitCamel(key);
                    if (key === 'keepMeLoggedIn') {
                        return (React.createElement("div", { key: key, style: {
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                                float: 'left',
                            } },
                            React.createElement(Field, { type: 'checkbox', name: key, as: Checkbox }),
                            React.createElement(Typography, { variant: 'body1', component: 'p' }, "Keep Me Logged In")));
                    }
                    else {
                        return (React.createElement(TextInput, { key: key, style: textInputStyle, type: 'input', name: key, as: TextField, placeholder: label }));
                    }
                }),
                React.createElement("div", { style: { margin: '2.5rem auto', float: 'right' } }, isSubmitting ? (React.createElement(CircularProgress, { size: 30, color: 'primary' })) : (React.createElement(Button, { variant: 'contained', color: 'primary', type: 'submit' }, "Submit")))));
        })));
};
export default InputForm;
//# sourceMappingURL=InputForm.js.map