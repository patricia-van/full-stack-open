import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const slice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    like(state, action) {
      const blog = state.find((b) => b.id === action.payload)
      if (blog) {
        blog.votes += 1
      }
    },
    deleteBlog(state, action) {
      state.filter((b) => b.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, like, deleteBlog } = slice.actions

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export default slice.reducer
