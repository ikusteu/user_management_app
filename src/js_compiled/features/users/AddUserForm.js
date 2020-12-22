var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// import from packages
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import from local packages
import InputForm from '../../components/InputForm';
// import from slices
import { requestAdd, getEligibleId, initAdd, getAddStatus } from './usersSlice';
// import from lib
import { UserActionType } from '../../lib/typeDeclarations';
// component function
var AddUserForm = function () {
    // map to redux store
    var dispatch = useDispatch();
    var eligibleId = useSelector(getEligibleId);
    var redirect = useSelector(getAddStatus);
    // map to react router
    var history = useHistory();
    // handle form submission for add user
    var handleAddUser = function (data, setSubmitting) { return __awaiter(void 0, void 0, void 0, function () {
        var email, firstName, lastName, avatar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // disable submit button
                    setSubmitting(true);
                    email = data.email, firstName = data.firstName, lastName = data.lastName, avatar = data.avatar;
                    // send async request
                    return [4 /*yield*/, dispatch(requestAdd({ id: eligibleId, email: email, firstName: firstName, lastName: lastName, avatar: avatar }))];
                case 1:
                    // send async request
                    _a.sent();
                    setSubmitting(false);
                    return [2 /*return*/];
            }
        });
    }); };
    // init add / set addSuccessful to false on mount
    useEffect(function () {
        dispatch(initAdd(null));
    }, []);
    // listen to addSuccessful and redirect back to users display page
    useEffect(function () {
        if (redirect) {
            history.push('/users');
        }
    }, [redirect]);
    return (React.createElement(InputForm, { type: UserActionType.AddNewUser, style: {
            width: '66%',
            margin: '0 auto',
        }, onSubmit: handleAddUser, errorResponse: true }));
};
export default AddUserForm;
//# sourceMappingURL=AddUserForm.js.map