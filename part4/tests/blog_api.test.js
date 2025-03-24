const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

const testUser = {
  username: "testuser",
  name: "Test User",
  password: "password"
}

let token

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  await api
    .post('/api/users')
    .send(testUser)

  const response = await api
    .post('/api/login')
    .send(testUser)

  token = response.body.token
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

test('blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'hello',
    url: 'www.async.com',
    likes: 101
  }

  const postResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
  
  await api.get('/api/blogs')
    
  const blogsAtEnd = await helper.blogsInDb()
  console.log('Blogs after adding:', blogsAtEnd.length);
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length+1)

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(titles.includes('async/await simplifies making async calls'))
})

test('missing likes default to 0', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'hello',
    url: 'www.async.com'
  }

  const postResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(postResponse.body.likes, 0)  
})

test('missing title error', async () => {
  const newBlog = {
    author: 'hello',
    url: 'www.async.com',
    likes: 101
  }

  await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`).expect(400)
    
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('missing url error'), async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'hello',
    likes: 101
  }

  await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`).expect(400)
    
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
}

test('delete blog', async () => {
  const blogToDelete = {
    title: 'async/await simplifies making async calls',
    author: 'hello',
    url: 'www.async.com',
    likes: 101
  }

  const postResponse = await api
    .post('/api/blogs')
    .send(blogToDelete)
    .set('Authorization', `Bearer ${token}`)


  await api
    .delete(`/api/blogs/${postResponse.body.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)
  
  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(r => r.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('update blog likes', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  blogToUpdate.likes++

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)
  
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

  const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
  assert.strictEqual(updatedBlog.likes, blogToUpdate.likes)
})


after(async () => {
  await mongoose.connection.close()
})