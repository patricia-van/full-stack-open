const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifer is named id, not _id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach((blog) => {
    assert.ok(blog.id) 
    assert.strictEqual(blog._id, undefined)  
  })
})

test('blog can be added'), async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'hello',
    url: 'www.async.com',
    likes: 101
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
    
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)


  const titles = blogsAtEnd.map(n => n.title)
  assert(titles.includes('async/await simplifies making async calls'))
}

test('missing likes default to 0'), async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'hello',
    url: 'www.async.com'
  }

  const savedBlog = await api.post('/api/blogs').send(newBlog)
  savedBlog
    .expect(201)
    .expect('Content-Type', /application\/json/)
  console.log(savedBlog)
    
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  assert.strictEqual(savedBlog.likes, 0)
}

test('missing title error'), async () => {
  const newBlog = {
    author: 'hello',
    url: 'www.async.com',
    likes: 100
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
    
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
}

test('missing url error'), async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'hello',
    likes: 100
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
    
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
}

test('delete blog'), async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(r => r.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
}

test('update blog liks'), async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  blogToUpdate.likes++

  const updatedBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
  
  updatedBlog.expect(204)
  
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

  assert.strictEqual(updatedBlog.likes, blogToUpdate.likes)
}


after(async () => {
  await mongoose.connection.close()
})