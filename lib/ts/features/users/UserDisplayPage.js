// import from local packages
import React, { useState, useEffect } from 'react'
import {
  Typography,
  Grid,
  Card,
  useMediaQuery,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
  TextField,
  makeStyles,
} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion' // import from slices

import { getEndOfList, getUserList, requestRemove } from './usersSlice' // import from lib

// component funtion
const UserDisplayPage = () => {
  // map to redux store
  const users = useSelector(getUserList)
  const fetching = !useSelector(getEndOfList)
  const dispatch = useDispatch() // create style for responsive user cards

  const smallScr = useMediaQuery('(max-width:600px)')
  const useStyle = makeStyles({
    userCard: {
      display: 'flex',
      flexDirection: smallScr ? 'row' : 'column',
      width: '100%',
    },
    userCardItems: {
      width: smallScr ? '50%' : '100%',
    },
  })
  const classes = useStyle() // init search state

  const [search, setSearch] = useState('')
  const [input, setInput] = useState('') // handle search change

  const handleInputChange = e => {
    setInput(e.target.value)
  } // handle search

  useEffect(() => {
    if (input.length > 2) {
      // set to lowercase to compare with lowercased user data for case insensitivity
      setSearch(input.toLowerCase())
    } else {
      setSearch('')
    }
  }, [input, setSearch]) // handle remove user

  const handleRemove = id => {
    dispatch(requestRemove(id))
  }

  return (
    <>
      <TextField
        style={{
          marginBottom: '1.5rem',
        }}
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
            .map(user => (
              <Grid key={user.id} xs={12} sm={6} md={4} lg={3} item>
                <Card>
                  <motion.div
                    className={classes.userCard}
                    key={user.id}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                  >
                    <CardMedia
                      className={classes.userCardItems}
                      component='img'
                      height='120'
                      image={user.avatar}
                    />
                    <CardContent className={classes.userCardItems}>
                      <Typography variant='h6' component='h2'>
                        {user.firstName}
                      </Typography>
                      <Typography variant='body1' component='p'>
                        {user.lastName}
                      </Typography>
                    </CardContent>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        alignSelf: 'flex-end',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Button
                        style={{
                          marginRight: '.5rem',
                        }}
                        size='small'
                        color='primary'
                        onClick={() => handleRemove(user.id)}
                      >
                        REMOVE USER
                      </Button>
                    </div>
                  </motion.div>
                </Card>
              </Grid>
            ))}
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
        <div>{fetching && <CircularProgress size={28} color='primary' />}</div>
        <Link to='/add_user'>
          <Button
            startIcon={<PersonAddIcon fontSize='large' />}
            style={{
              float: 'right',
            }}
            variant='contained'
            color='secondary'
          >
            {!smallScr && 'Add User'}
          </Button>
        </Link>
      </div>
    </>
  )
}

export default UserDisplayPage
