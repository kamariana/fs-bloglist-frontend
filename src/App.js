import React, { useState, useEffect, useRef } from 'react'

import Togglable from './components/Togglable'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

import Success from './components/Notifications/Success';
import Error from './components/Notifications/Error';
import { logDOM } from '@testing-library/react'


const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs =>
      setBlogs(initialBlogs)
    )  
  }, [])

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
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 7000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    window.location.reload()
    return false;
  }

  const handleLikes = (id) => {
    const blog = blogs.find(b => b.id === id)
    const likes = blog.likes += 1;
    
    const blogObject = {
      user: blog.user.id,
      likes: likes,
      author: blog.author,
      title: blog.title,
      url: blog.url 
    }

    blogService
      .update(blog.id, blogObject)
      .then(returnBlog => {
        setBlogs(blogs.map(b => b.id !== blog.id ? b : blog));
      })
  }



  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnBlog => {
        setBlogs(blogs.concat(returnBlog))
        setSuccessMessage(
          `a new blog ${blogObject.title} by ${blogObject.author}`
        )
        setTimeout(() => {
          setSuccessMessage(null);
        }, 7000)
      })
      .catch(error => {
        console.log(error.response)
        setErrorMessage(
          `${error.response.data.error}`
        )
        setTimeout(() => {
          setErrorMessage(null);
        }, 7000)
      })
  }

  

  const loginForm = () => (
    <Togglable buttonLabel="Login">
      <LoginForm 
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="New blog" ref={noteFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )


  const sortedBlogsByLikes = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  return (
    <div className="blogs">   
      <h1>Blogs</h1>

      <Success message={successMessage} />
      <Error message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>
            {user.name} logged in &nbsp;
            <button onClick={handleLogout}>
              Logout
            </button>
          </p>
          {blogForm()}
        </div>
      }
  
      {sortedBlogsByLikes.map((blog, index) =>        
        <Blog key={blog.id} blog={blog} index={index} updateLikes={() => handleLikes(blog.id)} />
      )}
    </div>
  )
}

export default App