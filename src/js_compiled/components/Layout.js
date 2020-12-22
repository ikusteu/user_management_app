// import from packages
import React, { useEffect, useState } from 'react';
import { Paper, Typography, Button, useMediaQuery } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import from slices
import { logout, getUserToken } from '../features/login/loginSlice';
// component function
var Layout = function (_a) {
    var children = _a.children;
    // map to redux store
    var dispatch = useDispatch();
    var token = useSelector(getUserToken);
    // map to media query
    var smallScr = useMediaQuery('(max-width:600px)');
    // map to react router
    var history = useHistory();
    // hide "logout" button on login page
    var path = useLocation().pathname;
    var _b = useState(false), showButton = _b[0], setShowButton = _b[1];
    // use effect to subscribe to path changes
    useEffect(function () {
        if (path === '/') {
            setShowButton(false);
        }
        else if (!showButton) {
            setShowButton(true);
        }
    }, [path]);
    // handle view based on login state
    useEffect(function () {
        if (path !== '/') {
            if (!token) {
                history.push('/');
            }
        }
    }, [path, token]);
    return (React.createElement(Paper, { style: {
            minHeight: '66vh',
            width: smallScr ? '100%' : '66vw',
            margin: smallScr ? '0' : '1.5rem auto 0 auto',
            overflow: 'hidden',
        }, elevation: 5 },
        React.createElement("section", { style: {
                backgroundColor: '#343d46',
                padding: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            } },
            React.createElement(Typography, { style: { float: 'left', color: 'white' }, variant: smallScr ? 'h6' : 'h5', component: 'h1' }, "User Manager"),
            showButton && (React.createElement(Button, { startIcon: React.createElement(ExitToApp, { fontSize: 'large' }), style: { float: 'right' }, variant: 'contained', color: 'secondary', onClick: function () {
                    dispatch(logout(null));
                    localStorage.removeItem('userToken');
                } }, !smallScr && 'Logout'))),
        React.createElement("section", { style: { padding: '1.5rem' } }, children)));
};
export default Layout;
//# sourceMappingURL=Layout.js.map