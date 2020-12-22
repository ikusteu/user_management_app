// import from local packages
import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, useMediaQuery, CardMedia, CardContent, Button, CircularProgress, TextField, makeStyles, } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import from slices
import { getEndOfList, getUserList } from './usersSlice';
// component funtion
var UserDisplayPage = function () {
    // map to redux store
    var users = useSelector(getUserList);
    var fetching = !useSelector(getEndOfList);
    // create style for responsive user cards
    var smallScr = useMediaQuery('(max-width:600px)');
    var useStyle = makeStyles({
        userCard: {
            display: 'flex',
            flexDirection: smallScr ? 'row' : 'column',
            width: '100%',
        },
        userCardItems: {
            width: smallScr ? '50%' : '100%',
        },
    });
    var classes = useStyle();
    // init search state
    var _a = useState(''), search = _a[0], setSearch = _a[1];
    var _b = useState(''), input = _b[0], setInput = _b[1];
    // handle search change
    var handleInputChange = function (e) {
        setInput(e.target.value);
    };
    // handle search
    useEffect(function () {
        if (input.length > 2) {
            // set to lowercase to compare with lowercased user data for case insensitivity
            setSearch(input.toLowerCase());
        }
        else {
            setSearch('');
        }
    }, [input, setSearch]);
    return (React.createElement(React.Fragment, null,
        React.createElement(TextField, { style: { marginBottom: '1.5rem' }, variant: 'outlined', value: input, onChange: handleInputChange, fullWidth: true, placeholder: 'Search users...' }),
        React.createElement(Grid, { spacing: 3, container: true }, users
            .filter(function (user) {
            return (user.firstName + " " + user.lastName).toLowerCase().includes(search);
        })
            .map(function (user) { return (React.createElement(Grid, { key: user.id, xs: 12, sm: 6, md: 4, lg: 3, item: true },
            React.createElement(Card, { className: classes.userCard },
                React.createElement(CardMedia, { className: classes.userCardItems, component: 'img', height: '120', image: user.avatar }),
                React.createElement(CardContent, { className: classes.userCardItems },
                    React.createElement(Typography, { variant: 'h6', component: 'h2' }, user.firstName),
                    React.createElement(Typography, { variant: 'body1', component: 'p' }, user.lastName))))); })),
        React.createElement("div", { style: {
                height: '3rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1.5rem',
            } },
            React.createElement("div", null, fetching && React.createElement(CircularProgress, { size: 28, color: 'primary' })),
            React.createElement(Link, { to: '/add_user' },
                React.createElement(Button, { startIcon: React.createElement(PersonAddIcon, { fontSize: 'large' }), style: { float: 'right' }, variant: 'contained', color: 'secondary' }, !smallScr && 'Add User')))));
};
export default UserDisplayPage;
//# sourceMappingURL=UserDisplayPage.js.map