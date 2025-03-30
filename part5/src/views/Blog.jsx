import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { like, deleteBlog } from '../reducers/blogReducer'

const Blogs = () => {
  const id = useParams().id
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))

  const dispatch = useDispatch()

  const handleLike = async (blog) => {
    dispatch(like(blog))
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      added by {blog.author}
    </div>
  )
}

export default Blogs
