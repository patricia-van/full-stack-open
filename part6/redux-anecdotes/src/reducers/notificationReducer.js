
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'notificaiton',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const { createNotification, clearNotification } = slice.actions

export const setNotification = (notification) => {
  return async dispatch => {
    dispatch(createNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}
export default slice.reducer