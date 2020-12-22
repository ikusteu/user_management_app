// import from packages
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

// import from local components
import InputForm from '../../components/InputForm'

// import from slices
import { requestLogin, getUserToken, getLoginError } from './loginSlice'

// import from lib
import { UserActionType, FormValuesInterface } from '../../lib/typeDeclarations'

// component function
const LoginForm: React.FC = () => {
  // map selector and dispatch to redux store
  const dispatch = useDispatch()
  const userToken = useSelector(getUserToken)
  const loginError = useSelector(getLoginError)

  // map history to react router
  const history = useHistory()

  // handle submit function
  const handleLoginSubmit = async (
    data: FormValuesInterface,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    // disable submit button
    setSubmitting(true)
    // destructure data for type safety
    const { email, password, keepMeLoggedIn } = data
    // send async request
    await dispatch(requestLogin({ email, password, keepMeLoggedIn }))
    setSubmitting(false)
  }

  // use effect for login status change
  useEffect(() => {
    // if user token returned => login was successful
    if (userToken) {
      history.push('/users')
    }
  }, [userToken])

  return (
    <>
      <Typography
        variant='h3'
        style={{ textAlign: 'center', margin: '3rem auto 0 auto' }}
        component='h1'
      >
        Welcome to User Manager Pro
      </Typography>
      <Typography
        variant='h5'
        style={{ textAlign: 'center', margin: '1.5rem' }}
        component='p'
      >
        Please Login to Continue
      </Typography>
      <InputForm
        type={UserActionType.Login}
        style={{
          width: '66%',
          margin: '0 auto',
        }}
        onSubmit={handleLoginSubmit}
        errorResponse={loginError}
      />
    </>
  )
}

export default LoginForm
