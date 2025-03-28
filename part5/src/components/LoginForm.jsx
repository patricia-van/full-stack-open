import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import loginService from '../services/login'
import storage from '../services/storage'
import { notify } from '../reducers/notificationRedcuer'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = { username, password }
    try {
      const user = await loginService.login(credentials)
      dispatch(setUser(user))
      storage.saveUser(user)
      dispatch(notify(`Welcome back, ${user.name}`))
    } catch (error) {
      dispatch(notify('Wrong credentials', 'error'))
    }
    // doLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username:
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              data-testid='username'
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(event.target.value)}
              data-testid='password'
            />
          </label>
        </div>
        <div>
          <button type='submit'>login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
