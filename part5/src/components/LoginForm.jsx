import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ doLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    doLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} data-testid='username'/>
        </label>
        <label>
          Password:
          <input type='password' value={password} onChange={(e) => setPassword(event.target.value)} data-testid='password'/>
        </label>
        <div>
          <button type='submit'>login</button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm
