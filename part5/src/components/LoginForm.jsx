const LoginForm = ({ username, password, setUsername, setPassword, handleSubmit }) => {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleSubmit}>
          <div>
            username <input type='text' value={username} onChange={(event) => setUsername(event.target.value)}/>
          </div>
          <div>
            password <input type='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
          </div>
          <div>
            <button type='submit'>login</button>
          </div>
        </form>
      </div>
    )
  }

export default LoginForm
