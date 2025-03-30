import { createSlice } from '@reduxjs/toolkit'
import storage from '../services/storage'
import loginService from '../services/login'

import { notify } from './notificationReducer'

const slice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLogin(state, action) {
      return action.payload
    },
    removeLogin(state, action) {
      return null
    },
  },
})

export const { setLogin, removeLogin } = slice.actions

export const loadExistingUser = () => {
  return async (dispatch) => {
    const user = storage.loadUser()
    if (user) {
      dispatch(setLogin(user))
    }
  }
}

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setLogin(user))
      storage.saveUser(user)
      dispatch(notify(`Welcome back, ${user.name}`))
    } catch (error) {
      dispatch(notify('Wrong credentials', 'error'))
    }
  }
}

export const logoutUser = (user) => {
  return async (dispatch) => {
    dispatch(removeLogin())
    storage.removeUser()
    dispatch(notify(`Bye, ${user.name}!`))
  }
}

export default slice.reducer
