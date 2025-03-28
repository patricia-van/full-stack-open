import { useState } from 'react'
import storage from '../services/storage'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  const nameOfUser = blog.user ? blog.user.name : 'anonymous'

  const canRemove = blog.user ? blog.user.username === storage.me() : true

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
