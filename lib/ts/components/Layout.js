import { forbidExtraProps as _forbidExtraProps } from "airbnb-prop-types";
// import from packages
import React, { useEffect, useState } from 'react';
import { Paper, Typography, Button, useMediaQuery } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // import from slices

import { logout, getUserToken } from '../features/login/loginSlice'; // component function

const Layout = ({
  children
}) => {
  // map to redux store
  const dispatch = useDispatch();
  const token = useSelector(getUserToken); // map to media query

  const smallScr = useMediaQuery('(max-width:600px)'); // map to react router

  const history = useHistory(); // hide "logout" button on login page

  const path = useLocation().pathname;
  const [showButton, setShowButton] = useState(false); // use effect to subscribe to path changes

  useEffect(() => {
    if (path === '/') {
      setShowButton(false);
    } else if (!showButton) {
      setShowButton(true);
    }
  }, [path]); // handle view based on login state

  useEffect(() => {
    if (path !== '/') {
      if (!token) {
        history.push('/');
      }
    }
  }, [path, token]);
  return <Paper style={{
    minHeight: '66vh',
    width: smallScr ? '100%' : '66vw',
    margin: smallScr ? '0' : '1.5rem auto 0 auto',
    overflow: 'hidden'
  }} elevation={5}>
      <section style={{
      backgroundColor: '#343d46',
      padding: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
        <Typography style={{
        float: 'left',
        color: 'white'
      }} variant={smallScr ? 'h6' : 'h5'} component='h1'>
          User Manager
        </Typography>
        {showButton && <Button startIcon={<ExitToApp fontSize='large' />} style={{
        float: 'right'
      }} variant='contained' color='secondary' onClick={() => {
        dispatch(logout(null));
        localStorage.removeItem('userToken');
      }}>
            {!smallScr && 'Logout'}
          </Button>}
      </section>
      <section style={{
      padding: '1.5rem'
    }}>{children}</section>
    </Paper>;
};

export default Layout;