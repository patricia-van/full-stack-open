import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notify } from './notificationRedcuer'

const byLikes = (a, b) => b.votes - a.votes

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
    updateBlog(state, action) {
      state.map((b) => (b.id === action.payload.id ? action.payload : b))
    },
    removeBlog(state, action) {
      state.filter((b) => b.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = slice.actions

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
    dispatch(notify(`Blog created: ${blog.title}, ${blog.author}`))
  }
}

export const like = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(updateBlog(updatedBlog))
    dispatch(notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch(removeBlog(blog.id))
    dispatch(notify(`Blog ${blog.title}, by ${blog.author} removed`))
  }
}

export default slice.reducer
