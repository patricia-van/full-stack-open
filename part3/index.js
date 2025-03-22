require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :response-time ms :body'))
morgan.token('body', function(req) {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})


app.get('/', (request, response) => {
  response.send('<h1>Hello World!<h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response, next) => {
  Person.countDocuments()  // This will count the number of documents in the 'Person' collection
    .then(count => {
      response.send(`
        <p>Phonebook has info for ${count} people</p> 
        <p>${new Date()}</p>
      `)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))

})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body
  console.log(name, number)

  if (!name || !number) {
    return response.status(400).json({
      error: 'Name or number is missing'
    })
  }

  const person = new Person ({
    name: name,
    number: number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  console.log(name, number)

  const person = ({
    name: name,
    number: number
  })

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(results => {
      response.json(results)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
