const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'blogger1',
    url: 'http://',
    likes: 100
  },
  {
    title: 'Browser can execute only JavaScript',
    author: 'javascript',
    url: 'http://js.com',
    likes: 10
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}