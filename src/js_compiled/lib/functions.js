// import shared types
import * as types from './typeDeclarations';
import * as yup from 'yup';
// get validation schema based on type
export var getValidationSchema = function (type) {
    var yupRequired = yup.string().required();
    var password = yupRequired;
    var email = yupRequired;
    var firstName = yupRequired;
    var lastName = yupRequired;
    var avatar = yupRequired;
    var adminShape = { email: email, password: password };
    var userShape = { firstName: firstName, lastName: lastName, email: email, avatar: avatar };
    return yup.object(type === types.UserActionType.Login ? adminShape : userShape);
};
// get initial values for input form
export var getInitialValues = function (type) {
    var password = '';
    var email = '';
    var firstName = '';
    var lastName = '';
    var avatar = '';
    var keepMeLoggedIn = false;
    var adminShape = { email: email, password: password, keepMeLoggedIn: keepMeLoggedIn };
    var userShape = { firstName: firstName, lastName: lastName, email: email, avatar: avatar };
    return type === types.UserActionType.Login ? adminShape : userShape;
};
// first letter upper case
export var toUpperFirst = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
// first letter to lower case
export var toLowerFirst = function (string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
};
// split camelCase with spaces and Capital Firsts
export var splitCamel = function (string) {
    return toUpperFirst(string).replace(/([A-Z])/, function (letter) { return ' ' + letter; });
};
// split camelCase string with spaces and Capital Firsts
export var toCamelCase = function (string) {
    return toLowerFirst(string).replace(/([-_\s][a-z])/gi, function (letter) {
        return letter.toUpperCase().replace(' ', '').replace('-', '').replace('_', '');
    });
};
// split replace camelCase or PascalCase strings with snake_case
export var toSnakeCase = function (string) {
    return toLowerFirst(string).replace(/([A-Z])/, function (letter) { return '_' + letter.toLowerCase(); });
};
// process user for put / post request -- replace camelCase keys with snake_case
export var processUserForApi = function (user) {
    var newUser = {};
    Object.keys(user).forEach(function (key) {
        var newKey = toSnakeCase(key);
        newUser[newKey] = user[key];
    });
    return newUser;
};
// process user from api response to camelCased keys
export var processUserFromApi = function (user) {
    var newUser = {};
    Object.keys(user).forEach(function (key) {
        var newKey = toCamelCase(key);
        newUser[newKey] = user[key];
    });
    return newUser;
};
// process array of users for pus / post api call
export var processUsersForApi = function (users) {
    return users.map(function (user) { return processUserForApi(user); });
};
// process array of users from api response
export var processUsersFromApi = function (users) {
    return users.map(function (user) { return processUserFromApi(user); });
};
//# sourceMappingURL=functions.js.map