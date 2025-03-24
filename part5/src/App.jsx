import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm  from './components/LoginForm'
import BlogForm  from './components/BlogForm'
import Notification  from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogs(blogs))
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortBlogs = blogs => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })
      console.log(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = (newBlog) => {
    console.log('create new blog')
    try {
      blogService
        .create(newBlog)
        .then(savedBlog => {
          setBlogs(blogs.concat(savedBlog))
          setMessage(`A new blog ${savedBlog.title} by ${savedBlog.author} added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    } catch (error) {
      console.log(error.message)
    }
  }

  const updateLikes = async (blog) => {
    console.log(blog)
    try {
      const updatedBlog = await blogService
        .update({
          ...blog,
          likes: blog.likes + 1
        })
      setBlogs(sortBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {user === null ?
        <div>
          <h2>log in to application</h2>
          <Notification message={message}/>
          <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleSubmit={handleLogin}/>
        </div> :
        <div>
          <h2>blogs</h2>
          <div>
            <Notification message={message}/>
            {user.name} logged-in
            <button onClick={handleLogout}>logout</button>
          </div>


          {!visible && <button onClick={() => setVisible(!visible)}>new blog</button>}
          {visible && <BlogForm createBlog={addBlog} />}
          {visible && <button onClick={() => setVisible(!visible)}>cancel</button>}

          {blogs.map(blog => <Blog key={blog.id} blog={blog} updateLikes={updateLikes}/>)}
        </div>
      }
    </div>
  )
}

export default App