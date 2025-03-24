import { useState } from "react"

const Blog = ({ blog, updateLikes }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div>
      {blog.title} {blog.author} <button onClick={() => console.log(blog)}>{showDetails ? 'hide' : 'view'}</button><br />
      {showDetails ? 
        <div>
          {blog.url} <br />
          likes {blog.likes} <button onClick={() => updateLikes(blog)}>like</button> < br/>
          {blog.user}
        </div> 
        : <div></div>
      }
    </div>  
  )
}

export default Blog