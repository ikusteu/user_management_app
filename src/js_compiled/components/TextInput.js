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
import { useField } from 'formik';
import { TextField } from '@material-ui/core';
// custom text input
var TextInput = function (_a) {
    var placeholder = _a.placeholder, style = _a.style, props = __rest(_a, ["placeholder", "style"]);
    var _b = useField(props), field = _b[0], meta = _b[1];
    return (React.createElement("div", { style: style },
        React.createElement(TextField, __assign({ fullWidth: true }, field, { placeholder: placeholder, error: Boolean(meta.error), helperText: meta.error }))));
};
export default TextInput;
//# sourceMappingURL=TextInput.js.map