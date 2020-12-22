// import from packages
import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// import from slices
import {
  fetchUsers,
  getEndOfList,
  getPageToFetch,
} from './features/users/usersSlice'

import { getUserToken } from './features/login/loginSlice'

// import from local components
import Layout from './components/Layout'
import LoginForm from './features/login/LoginForm'
import UserDisplayPage from './features/users/UserDisplayPage'
import AddUserForm from './features/users/AddUserForm'

// component function
const App: React.FC = () => {
  // map to redux store
  const dispatch = useDispatch()
  const fetching = !useSelector(getEndOfList)
  const fetchPage = useSelector(getPageToFetch)
  const loggedIn = !!useSelector(getUserToken)

  // fetch user data on app level if credentials saved in or upon login
  useEffect(() => {
    if (fetching && loggedIn) {
      dispatch(fetchUsers(fetchPage))
    }
  }, [fetchPage, fetching, loggedIn])

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path='/' exact component={LoginForm} />
          <Route path='/users' exact component={UserDisplayPage} />
          <Route path='/add_user' exact component={AddUserForm} />
          <Redirect to='/' />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
