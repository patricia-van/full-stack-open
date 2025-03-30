import { createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BlogList from '../components/BlogList'
import LoginForm from '../components/LoginForm'
import BlogForm from '../components/BlogForm'
import Notification from '../components/Notification'
import Togglable from '../components/Togglable'

import { logoutUser } from '../reducers/loginReducer'

const Home = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.login)

  const blogFormRef = createRef()

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  const handleLogout = () => {
    dispatch(logoutUser(loggedUser))
  }

  return (
    <div>
      {loggedUser === null ? (
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
            {loggedUser.name} logged-in
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

export default Home
