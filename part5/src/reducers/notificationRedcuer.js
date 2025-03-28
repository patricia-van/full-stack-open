import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    },
  },
})

export const { createNotification, removeNotification } = slice.actions

export const notify = (message) => {
  return async (dispatch) => {
    console.log(message)
    dispatch(createNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}

export default slice.reducer
