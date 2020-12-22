// import from packages
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import from slices
import { fetchUsers, getEndOfList, getPageToFetch, } from './features/users/usersSlice';
import { getUserToken } from './features/login/loginSlice';
// import from local components
import Layout from './components/Layout';
import LoginForm from './features/login/LoginForm';
import UserDisplayPage from './features/users/UserDisplayPage';
import AddUserForm from './features/users/AddUserForm';
// component function
var App = function () {
    // map to redux store
    var dispatch = useDispatch();
    var fetching = !useSelector(getEndOfList);
    var fetchPage = useSelector(getPageToFetch);
    var loggedIn = !!useSelector(getUserToken);
    // fetch user data on app level if credentials saved in or upon login
    useEffect(function () {
        if (fetching && loggedIn) {
            dispatch(fetchUsers(fetchPage));
        }
    }, [fetchPage, fetching, loggedIn]);
    return (React.createElement(Router, null,
        React.createElement(Layout, null,
            React.createElement(Switch, null,
                React.createElement(Route, { path: '/', exact: true, component: LoginForm }),
                React.createElement(Route, { path: '/users', exact: true, component: UserDisplayPage }),
                React.createElement(Route, { path: '/add_user', exact: true, component: AddUserForm }),
                React.createElement(Redirect, { to: '/' })))));
};
export default App;
//# sourceMappingURL=App.js.map