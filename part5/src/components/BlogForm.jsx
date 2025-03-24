import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
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
        <form onSubmit={addBlog}>
          <div>
            title:<input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} id='title-input'/>
          </div>
          <div>
            author:<input value={newAuthor} onChange={(event) => setNewAuthor(event.target.value)} id='author-input'/>
          </div>
          <div>
            url:<input value={newUrl} onChange={(event) => setNewUrl(event.target.value)} id='url-input'/>
          </div>
          <div>
            <button type='submit'>create</button>
          </div>
        </form>
      </div>
    )
  }

export default BlogForm