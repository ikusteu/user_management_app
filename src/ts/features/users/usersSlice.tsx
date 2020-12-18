// import from components
import { createSlice } from '@reduxjs/toolkit'

// local types and interfaces
interface UserInterface {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

enum LoadStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

interface UsersState {
  list: UserInterface[]
  status: LoadStatus
  error: string | null
}

interface AddNewUserAction {
  type: 'users/addNewUser'
  payload: UserInterface
}

// init state
const initialState: UsersState = {
  list: [],
  status: LoadStatus.IDLE,
  error: null,
}

// create users slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state: UsersState, action: AddNewUserAction) => {},
  },
})

// export action creators
export const { addNewUser } = usersSlice.actions

// export reducer
export default usersSlice.reducer
