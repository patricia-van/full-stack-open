import { useEffect, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import storage from './services/storage'

import { notify } from './reducers/notificationRedcuer'
import { initialiseBlogs, createBlog } from './reducers/blogReducer'
import { loadExistingUser, removeUser, setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initialiseBlogs())
    dispatch(loadExistingUser())
  }, [])

  const blogFormRef = createRef()

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  const handleLogout = () => {
    dispatch(removeUser())
    storage.removeUser()
    dispatch(notify(`Bye, ${user.name}!`))
  }

  return (
    <div>
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm />
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
            <BlogForm toggleVisibility={toggleVisibility} />
          </Togglable>
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App
