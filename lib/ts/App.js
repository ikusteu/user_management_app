// import from packages
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion'; // import from slices

import { fetchUsers, getEndOfList, getPageToFetch } from './features/users/usersSlice';
import { getUserToken } from './features/login/loginSlice'; // import from local components

import Layout from './components/Layout';
import LoginForm from './features/login/LoginForm';
import UserDisplayPage from './features/users/UserDisplayPage';
import AddUserForm from './features/users/AddUserForm'; // framer motion args

const motionArgs = {
  initial: {
    opacity: 0,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    scale: 1
  },
  transition: {
    duration: 0.2
  }
}; // component function

const App = () => {
  // map to redux store
  const dispatch = useDispatch();
  const fetching = !useSelector(getEndOfList);
  const fetchPage = useSelector(getPageToFetch);
  const loggedIn = !!useSelector(getUserToken); // fetch user data on app level if credentials saved in or upon login

  useEffect(() => {
    if (fetching && loggedIn) {
      dispatch(fetchUsers(fetchPage));
    }
  }, [fetchPage, fetching, loggedIn]);
  return <Router>
      <Layout>
        <Switch>
          <AnimatePresence>
            <Route path='/' key='login' exact>
              <LoginForm />
            </Route>
            <Route path='/users' key='users' exact>
              <motion.div {...motionArgs}>
                <UserDisplayPage />
              </motion.div>
            </Route>
            <Route path='/add_user' key='adduser' exact>
              <motion.div {...motionArgs}>
                <AddUserForm />
              </motion.div>
            </Route>
            <Redirect to='/' />
          </AnimatePresence>
        </Switch>
      </Layout>
    </Router>;
};

export default App;