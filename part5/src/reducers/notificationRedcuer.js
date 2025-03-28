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
export default slice.reducer
