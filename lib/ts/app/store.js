// import from packages
import { configureStore } from '@reduxjs/toolkit'; // import from slices

import admin from '../features/login/loginSlice';
import users from '../features/users/usersSlice'; // create store

const store = configureStore({
  reducer: {
    admin,
    users
  }
});
export default store;