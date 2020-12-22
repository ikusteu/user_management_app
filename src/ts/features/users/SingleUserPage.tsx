// import from packages
import React from 'react'
import { useSelector } from 'react-redux'
import { Paper } from '@material-ui/core'

// import from slices
import { getUserById, getEndOfList } from './usersSlice'

// import from lib
import {
  SingleUserPageProps,
  GlobalStateInterface,
} from '../../lib/typeDeclarations'

// component function
const SingleUserPage: React.FC<SingleUserPageProps> = ({ match }) => {
  // get user id from react router
  const userId = parseInt(match.params.id)
  const fetching = !useSelector(getEndOfList) // in case user not fetched, display progress

  // map to redux store
  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
  const user = useSelector<GlobalStateInterface>(state =>
    getUserById(state, userId)
  )

  return (
    <Paper style={{ width: '100%', height: '80vh' }} elevation={3}>
      {userId}
    </Paper>
  )
}

export default SingleUserPage
