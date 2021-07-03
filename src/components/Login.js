import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedInBlogAppUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedInBlogAppUserJSON) {
      const user = JSON.parse(loggedInBlogAppUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user  = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedInBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)

      //reset the username and password
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 7000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          name="username"
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password" 
          type="password"
          value={password}
          name="password"
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const loggedIn = () => (
    <div>
      <p>{user.name} logged-in</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )

  return (
    <>
    <p>
      {errorMessage}
    </p> 
    {
      user === null 
      ? loginForm()
      : loggedIn()
    }
  </>
  )
}

export default Login