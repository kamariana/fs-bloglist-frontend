import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog, [name]: value
    })
  }

  const addBlog = (event) => {
    event.preventDefault()

    const { title, author, url } = newBlog
    const blogObject = {
      title,
      author,
      url
    }

    createBlog(blogObject)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div className="form">
      <h3>Create new </h3>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            id="url"
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleChange}
          />
        </div>
        <button id="create-blog-button" type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm