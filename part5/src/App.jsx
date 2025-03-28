import { useState, useEffect, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'

import {
  createNotification,
  removeNotification,
} from './reducers/notificationRedcuer'
import {
  initialiseBlogs,
  createBlog,
  like,
  deleteBlog,
} from './reducers/blogReducer'
import { loadExistingUser, removeUser, setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  // const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [])

  useEffect(() => {
    dispatch(loadExistingUser())
  }, [])

  const blogFormRef = createRef()

  const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const notify = (message) => {
    dispatch(createNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      dispatch(setUser(user))
      storage.saveUser(user)
      notify(`Welcome back, ${user.name}`)
    } catch (error) {
      notify('Wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    dispatch(removeUser())
    storage.removeUser()
    notify(`Bye, ${user.name}!`)
  }

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog))
    notify(`Blog created: ${blog.title}, ${blog.author}`)
    blogFormRef.current.toggleVisibility()
  }

  const handleLike = async (blog) => {
    console.log('updating', blog)
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })

    notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`)
    dispatch(like(updatedBlog.id))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      dispatch(deleteBlog(blog.id))
      notify(`Blog ${blog.title}, by ${blog.author} removed`)
    }
  }

  return (
    <div>
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm doLogin={handleLogin} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <div>
            {user.name} logged-in
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm doCreate={handleCreate} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
