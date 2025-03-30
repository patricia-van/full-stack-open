import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { loginUser } from '../reducers/loginReducer'

import { Table, Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>
            Username:
            <Form.Control
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              data-testid='username'
            />
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Password:
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => setPassword(event.target.value)}
              data-testid='password'
            />
          </Form.Label>
        </Form.Group>
        <Button variant='primary' type='submit'>
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
