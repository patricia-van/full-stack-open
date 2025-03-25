import { useState } from 'react'

const BlogForm = ({ doCreate }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    doCreate({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
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
          <input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} id='title-input'/>
        </div>
        <div>
          <label>Author:</label>
          <input value={newAuthor} onChange={(event) => setNewAuthor(event.target.value)} id='author-input'/>
        </div>
        <div>
          <label>URL:</label>
          <input value={newUrl} onChange={(event) => setNewUrl(event.target.value)} id='url-input'/>
        </div>
        <div>
          <button type='submit'>Create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm