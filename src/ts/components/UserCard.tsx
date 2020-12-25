// import from packages
import React from 'react'
import {
  Card,
  Grid,
  CardMedia,
  Typography,
  CardContent,
  Button,
  useMediaQuery,
  makeStyles,
} from '@material-ui/core'
import { motion } from 'framer-motion'

// local interfaces -- prop-types conversion safe
interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  avatar: string
}

interface UserCardProps {
  user: User
  handleRemove: (id: number) => void
}

// component function
const UserCard: React.FC<UserCardProps> = ({ user, handleRemove }) => {
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

  return (
    <Grid key={user.id} xs={12} sm={6} md={4} lg={3} item>
      <Card>
        <motion.div
          className={classes.userCard}
          key={user.id}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0, scale: 0.95 }}
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
              style={{ marginRight: '.5rem' }}
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
  )
}

export default UserCard
