const LoginForm = ({ username, password, setUsername, setPassword, handleSubmit }) => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            username <input type='text' value={username} onChange={(event) => setUsername(event.target.value)} data-testid='username'/>
          </div>
          <div>
            password <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} data-testid='password'/>
          </div>
          <div>
            <button type='submit'>login</button>
          </div>
        </form>
      </div>
    )
  }

export default LoginForm
