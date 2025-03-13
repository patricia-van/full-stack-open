import axios from 'axios'
const baseUrl  = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const update = (id, newPerson) => { 
    return axios.put(`${baseUrl}/${id}`, newPerson)
}

const getName = name => {
    return axios.get(baseUrl, {
        params : {name: `${name}`}
    })
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = newPerson => {
    return axios.put(`${baseUrl}/${newPerson.id}`, newPerson)
} 

export default { 
    getAll: getAll, 
    create: create, 
    update: update,
    getName: getName,
    deletePerson: deletePerson,
    updatePerson: updatePerson
}