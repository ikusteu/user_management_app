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
import { useSelector } from 'react-redux'

// import from slices
import { getEndOfList, getUserList } from './usersSlice'

// import from lib
import { UserInterface } from '../../lib/typeDeclarations'

// component funtion
const UserDisplayPage: React.FC = () => {
  // map to redux store
  const users = useSelector(getUserList)
  const fetching = !useSelector(getEndOfList)

  // create style for responsive user cards
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
  const classes = useStyle()

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
      <Grid spacing={3} container>
        {users
          .filter(user =>
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(search)
          )
          .map((user: UserInterface) => (
            <Grid key={user.id} xs={12} sm={6} md={4} lg={3} item>
              <Card className={classes.userCard}>
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
              </Card>
            </Grid>
          ))}
      </Grid>
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
            style={{ float: 'right' }}
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
