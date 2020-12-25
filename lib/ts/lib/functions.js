// import shared types
import * as types from './typeDeclarations';
import * as yup from 'yup'; // get validation schema based on type

export const getValidationSchema = type => {
  const yupRequired = yup.string().required();
  const password = yupRequired;
  const email = yupRequired.email();
  const firstName = yupRequired.matches(/^[a-zA-Z%s]+$/, 'Please write your name using only basic ASCII letters');
  const lastName = yupRequired.matches(/^[a-zA-Z%s]+$/, 'Please write your name using only basic ASCII letters');
  const avatar = yupRequired;
  const adminShape = {
    email,
    password
  };
  const userShape = {
    avatar,
    firstName,
    lastName,
    email
  };
  return yup.object(type === types.UserActionType.Login ? adminShape : userShape);
}; // get initial values for input form

export const getInitialValues = type => {
  const password = '';
  const email = '';
  const firstName = '';
  const lastName = '';
  const avatar = '/images/avatar.jpg';
  const keepMeLoggedIn = false;
  const adminShape = {
    email,
    password,
    keepMeLoggedIn
  };
  const userShape = {
    avatar,
    firstName,
    lastName,
    email
  };
  return type === types.UserActionType.Login ? adminShape : userShape;
}; // first letter upper case

export const toUpperFirst = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}; // first letter to lower case

export const toLowerFirst = string => {
  return string.charAt(0).toLowerCase() + string.slice(1);
}; // split camelCase with spaces and Capital Firsts

export const splitCamel = string => {
  return toUpperFirst(string.replace(/([A-Z])/, letter => ' ' + letter));
}; // split camelCase string with spaces and Capital Firsts

export const toCamelCase = string => {
  return toLowerFirst(string).replace(/([-_\s][a-z])/gi, letter => letter.toUpperCase().replace(' ', '').replace('-', '').replace('_', ''));
}; // split replace camelCase or PascalCase strings with snake_case

export const toSnakeCase = string => {
  return toLowerFirst(string).replace(/([A-Z])/, letter => '_' + letter.toLowerCase());
}; // process user for put / post request -- replace camelCase keys with snake_case

export const processUserForApi = user => {
  const newUser = {};
  Object.keys(user).forEach(key => {
    const newKey = toSnakeCase(key);
    newUser[newKey] = user[key];
  });
  return newUser;
}; // process user from api response to camelCased keys

export const processUserFromApi = user => {
  const newUser = {};
  Object.keys(user).forEach(key => {
    const newKey = toCamelCase(key);
    newUser[newKey] = user[key];
  });
  return newUser;
}; // process array of users from api response

export const processUsersFromApi = users => {
  return users.map(user => processUserFromApi(user));
};