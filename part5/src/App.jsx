import { useState, useEffect, createRef } from 'react'
import Blog from './components/Blog'
import LoginForm  from './components/LoginForm'
import BlogForm  from './components/BlogForm'
import Notification  from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogs(blogs))
    )
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      setUser(user)
    }
  }, [])

  const blogFormRef = createRef()

  const sortBlogs = blogs => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      storage.saveUser(user)
      notify(`Welcome back, ${user.name}`)
    } catch (error) {
      notify('Wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.removeUser()
    notify(`Bye, ${user.name}!`)
  }

  const handleCreate = async (blog) => {
    const newBlog = await blogService.create(blog)
    setBlogs(blogs.concat(newBlog))
    notify(`Blog created: ${newBlog.title}, ${newBlog.author}`)
    blogFormRef.current.toggleVisibility()
  }

  const handleLike = async (blog) => {
    console.log('updating', blog)
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1
    })

    notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`)
    setBlogs(sortBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b)))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      notify(`Blog ${blog.title}, by ${blog.author} removed`)
    }
  }

  return (
    <div>
      {user === null ?
        <div>
          <h2>log in to application</h2>
          <Notification notification={notification}/>
          <LoginForm handleLogin={handleLogin}/>
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <div>
            {user.name} logged-in
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm doCreate={handleCreate} />
          </Togglable>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>)}
        </div>
      }
    </div>
  )
}

export default App