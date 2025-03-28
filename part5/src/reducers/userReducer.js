import { createSlice } from '@reduxjs/toolkit'
import storage from '../services/storage'

const slice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    },
  },
})

export const { setUser, removeUser } = slice.actions

export const loadExistingUser = () => {
  return async (dispatch) => {
    const user = storage.loadUser()
    if (user) {
      dispatch(setUser(user))
    }
  }
}

export default slice.reducer
