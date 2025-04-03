import axios from 'axios'
import storage from './storage'

const baseUrl = '/api/blogs'

const getConfig = () => ({
  headers: { Authorization: `Bearer ${storage.loadUser().token}` },
})

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, getConfig())
  return response.data
}

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data
}

const comment = async (id, comment) => {
  const request = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment },
    getConfig()
  )
  return request.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

export default { getAll, create, update, remove }
