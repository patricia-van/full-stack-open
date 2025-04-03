const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    auhtor: 1,
  })

  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const users = await User.findById(request.params.id).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password) {
    return response
      .status(400)
      .json({ error: 'username and password are required' })
  } else if (username.length < 3 || password.length < 3) {
    return response
      .status(400)
      .json({
        error:
          'username and password does not meet minimum length (3) requirement',
      })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
