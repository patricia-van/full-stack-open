import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useParams, Link } from 'react-router-dom'
import { initialiseBlogs } from './reducers/blogReducer'
import { loadExistingUser } from './reducers/loginReducer'
import { initialiseUsers } from './reducers/usersReducer'

import Home from './views/Home'
import Users from './views/Users'
import User from './views/User'
import Blog from './views/Blog'

// const Blog = () => {
//   const id = useParams().id
//   const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
//   return (
//     <div>
//       <h1>{blog.title}</h1>
//       {blog.url}
//       {blog.likes} likes added by {blog.author}
//     </div>
//   )
// }

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initialiseBlogs())
    dispatch(loadExistingUser())
    dispatch(initialiseUsers())
  }, [])

  const padding = {
    padding: 5,
  }
  return (
    <div className='container'>
      <div>
        <Link to='/' style={padding}>
          home
        </Link>
        <Link to='/users' style={padding}>
          users
        </Link>
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App
