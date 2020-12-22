// import from packages
import { configureStore } from '@reduxjs/toolkit';
// import from slices
import admin from '../features/login/loginSlice';
import users from '../features/users/usersSlice';
// create store
var store = configureStore({
    reducer: {
        admin: admin,
        users: users,
    },
});
export default store;
//# sourceMappingURL=store.js.map