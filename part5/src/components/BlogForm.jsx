import { useState, createRef } from 'react'
import { useDispatch } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationRedcuer'

const BlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch()

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const blogFormRef = createRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    dispatch(createBlog(blog))
    dispatch(notify(`Blog created: ${blog.title}, ${blog.author}`))
    toggleVisibility()
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            id='title-input'
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
            id='author-input'
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
            id='url-input'
          />
        </div>
        <div>
          <button type='submit'>Create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
