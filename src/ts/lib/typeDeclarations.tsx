import { ReactNode } from 'react'

/*******  Component Props  *******/

// layout interface
export interface FCProps {
  children?: ReactNode
}

// props for input form
export interface InputFormProps {
  type: UserActionType
  style?: React.CSSProperties | undefined
  onSubmit: (
    data: LoginFormValues | AddUserFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => void
  errorResponse?: string | null | undefined
}

// single user page props
export interface SingleUserPageProps extends FCProps {
  match: {
    params: {
      id: string
    }
  }
}

/*******  Forms  *******/

// type of form / redux user action
export enum UserActionType {
  Login = 'login',
  AddNewUser = 'addNewUser',
  EditUser = 'editUser',
}

// initial form values interface
export interface LoginFormValues {
  email: string
  password: string
  keepMeLoggedIn: boolean
}

export interface AddUserFormValues {
  email: string
  firstName: string
  lastName: string
  avatar: string
}

/*******  Slices *******/

// global state
export interface GlobalStateInterface {
  admin: AdminStateInterface
  users: UsersStateInterface
}

/***** Login Slice *****/

// state interface for login slice
export interface Credentials {
  email: string | undefined
  password: string | undefined
  token?: string | null
}

export interface AdminStateInterface {
  credentials: Credentials
  error: string | null | undefined
  fetching: boolean
}

// login thunk input
export interface LoginThunkInput extends Credentials {
  keepMeLoggedIn: boolean | undefined
}

// login thunk fulfilled payload
export interface LoginFulfilledAction {
  type: string
  payload: {
    token: string | null
    keepMeLoggedIn: boolean | undefined
  }
}

/***** Users Slice *****/

// user interface from api response
export interface ApiUserInterface {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

// user interface after processing
export interface UserInterface {
  id: number
  email: string
  firstName: string
  lastName: string
  avatar: string
}

// initial state
export interface UsersStateInterface {
  list: UserInterface[]
  error: string | null
  endOfList: boolean
  pageToFetch: number
  addSuccessful: boolean
  eligibleId: number
}
