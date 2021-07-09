import React from 'react'

const LoginForm = ({ 
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
 }) => {

  return (
    <div>
      <h3>Login to application</h3>
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          name="username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password" 
          type="password"
          value={password}
          name="password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
    </div>
  )
}

export default LoginForm