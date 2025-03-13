import { useState, useEffect } from 'react'
import './index.css'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

import personServive from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personServive
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(p => p.name.toLowerCase().includes(newName.toLowerCase()))

    if (person) {
      const confirmed = window.confirm(`${newName} is already added to phonebook, relace the old number wiht a new one?`);
      if (confirmed) {
        console.log('updating number')
        const newPerson = { ...person, number: newNumber }
        personServive
          .updatePerson(newPerson)
          .then(response => {
            console.log(response)
            setMessage(`Updated number for ${person.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.map(p => p.id === person.id ? response.data : p))
          })
      } else {
        console.log('cancelled')
      }
    } 
    else if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
    } 
    else {
      const newPerson = { name: newName, number: newNumber }

      personServive
        .create(newPerson)
        .then(response => {
          setMessage(`Added ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          setPersons(persons.concat(response.data))
          
        })
    }
    setNewName('')
    setNewNumber('')
    return 
  }

  const deletePerson = (id, name) => {
    const confirmed = window.confirm(`Delete ${name}?`);

    if (confirmed) {
      personServive 
        .deletePerson(id)
        .then(response => {
          console.log('delete', id, response.data.name)
          setPersons(persons.filter(person => person.id != id ))
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      console.log('cance delete')
    }
  }
  

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  } 

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const filteredPersons = search === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleOnSubmit={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App