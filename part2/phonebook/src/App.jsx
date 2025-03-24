import { useState, useEffect } from 'react'
import './index.css'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import personServive from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personServive
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if (person) {
      const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number wiht a new one?`);
      if (confirmed) {
        console.log('updating number')
        personServive
          .update(person.id, { ...person, number: newNumber })
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
      personServive
        .create({ name: newName, number: newNumber })
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
  
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter search={search} setSearch={setSearch} />

      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleOnSubmit={addPerson} setNewName={setNewName} setNewNumber={setNewNumber} />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App