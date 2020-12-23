// import from components
import {
  createSlice,
  createAsyncThunk,
  SliceCaseReducers,
} from '@reduxjs/toolkit'
import axios from 'axios'

// import from lib
import {
  UsersStateInterface,
  GlobalStateInterface,
  ApiUserInterface,
  UserInterface,
} from '../../lib/typeDeclarations'
import {
  processUserForApi,
  processUsersFromApi,
  processUserFromApi,
} from '../../lib/functions'

// init state
const initialState = {
  list: [],
  error: null,
  endOfList: false,
  pageToFetch: 1,
  eligibleId: 0,
  addSuccessful: false,
}

// create thunk for user fetching
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number) => {
    try {
      const res = await axios.get(
        `https://reqres.in/api/users?delay=1&page=${page}`
      )
      const users = processUsersFromApi(res.data.data)
      return users
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      return 0
    }
  }
)

// create thunk for adding of new users
export const requestAdd = createAsyncThunk(
  'users/requestAdd',
  async (data: UserInterface) => {
    try {
      // process user from arg to match api requirements
      let user: ApiUserInterface | UserInterface = processUserForApi(data)
      // call post request
      const res = await axios.post('https://reqres.in/api/users', { ...user })
      // if successful process user back to match UserInterface
      user = processUserFromApi(res.data)
      return user
      // if error, catch before it gets serialized
    } catch (err) {
      // extract validation respones ie. "user not found"
      const errorMessage = err.response.data.error

      // throw validation response for thunk rejected handling
      throw errorMessage
    }
  }
)

// create thunk for user removal
export const requestRemove = createAsyncThunk(
  'users/requestRemove',
  async (id: number) => {
    try {
      // call delete request
      const res = await axios.delete(`https://reqres.in/api/users/${id}`)
      // if successful process user back to match UserInterface
      if (res.status === 204) {
        return id
      } else throw 'something went wrong'
      // if error, catch before it gets serialized
    } catch (err) {
      // extract validation respones ie. "user not found"
      // eslint-disable-next-line no-console
      console.log(err)
      return 0
    }
  }
)

// create users slice
const usersSlice = createSlice<
  UsersStateInterface,
  SliceCaseReducers<UsersStateInterface>,
  string
>({
  name: 'users',
  initialState,
  reducers: {
    // add successful to false when redirected
    redirected: state => {
      state.addSuccessful = false
    },
  },
  extraReducers: build => {
    build.addCase(fetchUsers.fulfilled, (state, action) => {
      if (action.payload) {
        // unwrap users from payload
        const users = action.payload
        // get number of users loaded
        const numUsers = users.length
        if (numUsers !== 0) {
          // get the id of last user on the list and save +1 as first eligible id for new users
          state.eligibleId = users[numUsers - 1].id + 1
          // concat user array to list in state
          state.list = state.list.concat(users)
          // save number of next page to fetch
          state.pageToFetch++
        } else {
          // if no more users set end of list to stop fetching
          state.endOfList = true
        }
      }
    })
    build.addCase(requestAdd.fulfilled, (state, action) => {
      if (action.payload) {
        // unwrap user from payload
        const user = action.payload
        // update eligible id based on new info
        state.eligibleId = user.id + 1
        // set update success
        state.addSuccessful = true
        // push user to users state list
        state.list.push(user)
      }
    })
    build.addCase(requestRemove.fulfilled, (state, action) => {
      if (action.payload) {
        // extract id from payload
        const id = action.payload
        // remove user from list
        state.list = state.list.filter(user => user.id !== id)
      }
    })
  },
})

// export selectors
export const getUserList = (state: GlobalStateInterface): UserInterface[] =>
  state.users.list
export const getEndOfList = (state: GlobalStateInterface): boolean =>
  state.users.endOfList
export const getPageToFetch = (state: GlobalStateInterface): number =>
  state.users.pageToFetch
export const getEligibleId = (state: GlobalStateInterface): number =>
  state.users.eligibleId
export const getAddStatus = (state: GlobalStateInterface): boolean =>
  state.users.addSuccessful
export const getUserById = (
  state: GlobalStateInterface,
  id: number
): UserInterface | undefined => state.users.list.find(user => user.id === id)

// export action creators
export const { redirected } = usersSlice.actions

// export reducer
export default usersSlice.reducer
