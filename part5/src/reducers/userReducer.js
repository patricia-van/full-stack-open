import { createSlice } from '@reduxjs/toolkit'
import storage from '../services/storage'
import loginService from '../services/login'

import { notify } from './notificationRedcuer'

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

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))
      storage.saveUser(user)
      dispatch(notify(`Welcome back, ${user.name}`))
    } catch (error) {
      dispatch(notify('Wrong credentials', 'error'))
    }
  }
}

export const logoutUser = (user) => {
  return async (dispatch) => {
    dispatch(removeUser())
    storage.removeUser()
    dispatch(notify(`Bye, ${user.name}!`))
  }
}

export default slice.reducer
