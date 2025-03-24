import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm  from './components/LoginForm'
import BlogForm  from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
      console.log(error.message)
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
        })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      {user === null ?
        <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleSubmit={handleLogin}/> :
        <div>
          <h2>blogs</h2>
          {user.name} logged-in
          <button onClick={handleLogout}>logout</button>

          <BlogForm createBlog={addBlog} />

          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
      }
    </div>
  )
}

export default App