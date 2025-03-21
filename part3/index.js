// const http = require('http')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :response-time ms :body'));


morgan.token('body', function(req) {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!<h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p> 
        <p>${new Date()}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id === id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const {name, number} = request.body
    console.log(name, number)

    if (!name || !number) {
        return response.status(400).json({
            error: 'Name or number is missing'
        });
    } 

    const existingPerson = persons.find(p => p.name === name)
    if (existingPerson) {
        return response.status(400).json({
            error: 'name must be unique'
        });
    }

    // Create a new person object and add it to the phonebook
    const newPerson = { id: (persons.length + 1).toString(), name, number };
    persons.push(newPerson);

    // Respond with the new person data and status 201 (Created)
    response.status(201).json({
        message: 'New person added successfully',
        person: newPerson
    });
})

// app.put('api/persons/:id', (request, response) => {
//     const {name, number} = request.body
//     console.log(name, number)
// })

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
