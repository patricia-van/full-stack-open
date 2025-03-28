import { useState } from 'react'
import { useDispatch } from 'react-redux'
import storage from '../services/storage'
import blogService from '../services/blogs'

import { notify } from '../reducers/notificationRedcuer'
import { like, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  const nameOfUser = blog.user ? blog.user.name : 'anonymous'

  const canRemove = blog.user ? blog.user.username === storage.me() : true

  const handleLike = async (blog) => {
    console.log('updating', blog)
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    console.log('notifying')
    dispatch(notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`))
    dispatch(like(updatedBlog.id))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      dispatch(deleteBlog(blog.id))
      dispatch(notify(`Blog ${blog.title}, by ${blog.author} removed`))
    }
  }

  return (
    <div style={style} className='blog'>
      {blog.title} by {blog.author}
      <button style={{ marginLeft: 3 }} onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      <br />
      {visible ? (
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            likes {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{nameOfUser}</div>
          {canRemove && (
            <button onClick={() => handleDelete(blog)}>remove</button>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Blog
