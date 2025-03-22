import axios from 'axios'
const baseUrl  = 'api/persons'

const getAll = () => {
    console.log('getting from', baseUrl)
    return axios.get(baseUrl)
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const update = (id, newPerson) => { 
    return axios.put(`${baseUrl}/${id}`, newPerson)
}

const getName = name => {
    return axios.get(baseUrl, { params : {name: `${name}`} })
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = newPerson => {
    return axios.put(`${baseUrl}/${newPerson.id}`, newPerson)
} 

export default { getAll, create, update, getName, deletePerson, updatePerson }