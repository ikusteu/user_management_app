// import from packages
import React, { useState, useEffect } from 'react'
import {
  TextField,
  Grid,
  useMediaQuery,
  Button,
  CircularProgress,
} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatePresence } from 'framer-motion'

// import from local componetns
import UserCard from '../../components/UserCard'

// import from slices
import { getEndOfList, getUserList, requestRemove } from './usersSlice'

// import from lib
import { UserInterface } from '../../lib/typeDeclarations'

// component funtion
const UserDisplayPage: React.FC = () => {
  // map to redux store
  const users = useSelector(getUserList)
  const fetching = !useSelector(getEndOfList)
  const dispatch = useDispatch()

  // map to media queries
  const smallScr = useMediaQuery('(max-width:600px)')

  // init search state
  const [search, setSearch] = useState('')
  const [input, setInput] = useState('')

  // handle search change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInput(e.target.value)
  }

  // handle search
  useEffect(() => {
    if (input.length > 2) {
      // set to lowercase to compare with lowercased user data for case insensitivity
      setSearch(input.toLowerCase())
    } else {
      setSearch('')
    }
  }, [input, setSearch])

  // handle remove user
  const handleRemove = (id: number) => {
    dispatch(requestRemove(id))
  }

  return (
    <>
      <TextField
        style={{ marginBottom: '1.5rem' }}
        variant='outlined'
        value={input}
        onChange={handleInputChange}
        fullWidth
        placeholder='Search users...'
      />
      <AnimatePresence>
        <Grid spacing={3} container>
          {users
            .filter(user =>
              `${user.firstName} ${user.lastName}`
                .toLowerCase()
                .includes(search)
            )
            .map((user: UserInterface) => (
              <UserCard key={user.id} user={user} handleRemove={handleRemove} />
            ))}
          {fetching && (
            <Grid key='loader' xs={12} sm={6} md={4} lg={3} item>
              <div
                style={{
                  height: smallScr ? 120 : 238,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CircularProgress size={28} color='primary' />
              </div>
            </Grid>
          )}
        </Grid>
      </AnimatePresence>
      <div
        style={{
          height: '3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1.5rem',
        }}
      >
        <Link to='/add_user'>
          <Button
            style={{
              display: 'flex',
              height: '4rem',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              borderRadius: 1000,
              position: 'fixed',
              bottom: '1.5rem',
              right: smallScr ? '10vw' : '20vw',
            }}
            variant='contained'
            color='secondary'
          >
            <PersonAddIcon fontSize='large' />
          </Button>
        </Link>
      </div>
    </>
  )
}

export default UserDisplayPage
