// import from packages
import {
  createSlice,
  SliceCaseReducers,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import axios from 'axios'

// import from lib
import {
  Credentials,
  AdminStateInterface,
  GlobalStateInterface,
  LoginThunkInput,
  LoginFulfilledAction,
} from '../../lib/typeDeclarations'
import { toUpperFirst } from '../../lib/functions'

// init state
const initialState = {
  credentials: {
    email: '',
    password: '',
    token: localStorage.getItem('userToken'),
  },
  error: null,
  fetching: false,
  keepMeLoggedIn: false,
}

// create async thunk for login api request
export const requestLogin = createAsyncThunk(
  'admin/requestLogin',
  async (data: LoginThunkInput) => {
    try {
      const res = await axios.post('https://reqres.in/api/login', { ...data })
      const [token, keepMeLoggedIn] = [res.data.token, data.keepMeLoggedIn]
      return { token, keepMeLoggedIn }
      // if error, catch before it gets serialized
    } catch (err) {
      // extract validation respones ie. "user not found"
      const errorMessage = err.response.data.error

      // throw validation response for thunk rejected handling
      throw errorMessage
    }
  }
)

// create slice
const loginSlice = createSlice<
  AdminStateInterface,
  SliceCaseReducers<AdminStateInterface>,
  string
>({
  name: 'admin',
  initialState,
  reducers: {
    logout: state => {
      state.credentials.email = ''
      state.credentials.password = ''
      state.credentials.token = ''
    },
  },
  // use builder for type safety
  extraReducers: builder => {
    builder.addCase(
      requestLogin.fulfilled,
      (state, action: LoginFulfilledAction) => {
        state.credentials.token = action.payload.token
        state.fetching = false
        if (action.payload.keepMeLoggedIn) {
          if (action.payload.token) {
            localStorage.setItem('userToken', action.payload.token)
          }
        }
      }
    )
    builder.addCase(requestLogin.rejected, (state, action) => {
      state.error = action.error.message && toUpperFirst(action.error.message)
      state.fetching = false
    })
    builder.addCase(requestLogin.pending, state => {
      state.fetching = true
    })
  },
})

// export selectors
export const getCredentials = (state: GlobalStateInterface): Credentials =>
  state.admin.credentials
export const getUserToken = (
  state: GlobalStateInterface
): string | undefined | null => state.admin.credentials.token
export const getLoginError = (
  state: GlobalStateInterface
): string | null | undefined => state.admin.error
export const getIsFetchingLogin = (state: GlobalStateInterface): boolean =>
  state.admin.fetching

// export action creators
export const { logout } = loginSlice.actions

// export reducer
export default loginSlice.reducer
