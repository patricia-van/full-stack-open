import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = slice.actions

export const initialiseUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default slice.reducer
