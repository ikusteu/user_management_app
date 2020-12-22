// import from packages
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// import from local packages
import InputForm from '../../components/InputForm'

// import from slices
import { requestAdd, getEligibleId, initAdd, getAddStatus } from './usersSlice'

// import from lib
import { UserActionType, AddUserFormValues } from '../../lib/typeDeclarations'

// component function
const AddUserForm: React.FC = () => {
  // map to redux store
  const dispatch = useDispatch()
  const eligibleId = useSelector(getEligibleId)
  const redirect = useSelector(getAddStatus)

  // map to react router
  const history = useHistory()

  // handle form submission for add user
  const handleAddUser = async (
    data: AddUserFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    // disable submit button
    setSubmitting(true)
    // destructure data for type safety
    const { email, firstName, lastName, avatar } = data
    // send async request
    await dispatch(
      requestAdd({ id: eligibleId, email, firstName, lastName, avatar })
    )
    setSubmitting(false)
  }

  // init add / set addSuccessful to false on mount
  useEffect(() => {
    dispatch(initAdd(null))
  }, [])

  // listen to addSuccessful and redirect back to users display page
  useEffect(() => {
    if (redirect) {
      history.push('/users')
    }
  }, [redirect])

  return (
    <InputForm
      type={UserActionType.AddNewUser}
      style={{
        width: '66%',
        margin: '0 auto',
      }}
      onSubmit={handleAddUser}
      errorResponse={}
    />
  )
}

export default AddUserForm
