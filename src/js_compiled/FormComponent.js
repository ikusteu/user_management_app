var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// import from packages
import React from 'react';
import { Formik, Field, Form, useField } from 'formik';
import { Button, Checkbox, Radio, TextField, FormControlLabel, } from '@material-ui/core';
import * as yup from 'yup';
var MyRadio = function (_a) {
    var label = _a.label, props = __rest(_a, ["label"]);
    var field = useField(props)[0];
    return React.createElement(FormControlLabel, __assign({}, field, { control: React.createElement(Radio, null), label: label }));
};
var MyTextField = function (_a) {
    var placeholder = _a.placeholder, props = __rest(_a, ["placeholder"]);
    var _b = useField(props), field = _b[0], meta = _b[1];
    var errorText = meta.error && meta.touched ? meta.error : '';
    return (React.createElement(TextField, __assign({}, field, { placeholder: placeholder, error: !!errorText, helperText: errorText })));
};
var valdationSchema = yup.object({
    firstName: yup.string().required().max(10),
    lastName: yup.string().required().max(10),
    isTall: yup.bool(),
});
// component function
var FormComponent = function () {
    return (React.createElement("div", { style: {
            width: '50%',
            height: '100vh',
            border: '1px solid gray',
            borderRadius: '5px',
            margin: '0 auto',
            padding: '4rem',
        } },
        React.createElement(Formik, { initialValues: {
                firstName: '',
                lastName: '',
                isTall: false,
                cookies: [],
                yoghurt: [],
            }, 
            // validate={values => {
            //   const errors: Record<string, string> = {}
            //   if (values.firstName.includes('bob')) {
            //     errors.firstName = 'no bob'
            //   }
            //   return errors
            // }}
            validationSchema: valdationSchema, onSubmit: function (data, _a) {
                var setSubmitting = _a.setSubmitting;
                setSubmitting(true);
                // Async call
                setSubmitting(false);
                console.log('submit: ', data);
            } }, function (_a) {
            var values = _a.values, errors = _a.errors, isSubmitting = _a.isSubmitting;
            return (React.createElement(Form, null,
                React.createElement(MyTextField, { name: 'firstName', type: 'input', placeholder: 'First Name', as: TextField }),
                React.createElement(MyTextField, { name: 'lastName', type: 'input', placeholder: 'Last Name', as: TextField }),
                React.createElement("div", null,
                    React.createElement(Field, { name: 'cookies', value: 'chocolate chip', type: 'checkbox', as: Checkbox }),
                    React.createElement(Field, { name: 'cookies', value: 'sugar', type: 'checkbox', as: Checkbox }),
                    React.createElement(Field, { name: 'cookies', value: 'snickerdoodle', type: 'checkbox', as: Checkbox })),
                React.createElement("div", null,
                    React.createElement(MyRadio, { name: 'yoghurt', type: 'radio', value: 'Peach', label: 'Peach' }),
                    React.createElement(MyRadio, { name: 'yoghurt', type: 'radio', value: 'Apple', label: 'Apple' }),
                    React.createElement(MyRadio, { name: 'yoghurt', type: 'radio', value: 'Blueberry', label: 'Blueberry' })),
                React.createElement("div", null,
                    React.createElement(Button, { disabled: isSubmitting, type: 'submit' }, "Submit")),
                React.createElement("pre", null, JSON.stringify(values, null, 2)),
                React.createElement("pre", null, JSON.stringify(errors, null, 2))));
        })));
};
export default FormComponent;
//# sourceMappingURL=FormComponent.js.map