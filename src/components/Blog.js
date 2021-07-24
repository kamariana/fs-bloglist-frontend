import React, { useState } from 'react'

const Blog = ({ blog, user, updateLikes, deleteBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const showDeleteButton = user === null
    ? ''
    : user.name === blog.user.name

  return (
    <div className="blog">
      <div className="blog__summary">
        <h2 className="blog__title">
          {blog.title}
        </h2>
        <span className="blog__sub-title">
          {blog.author}
        </span>
        <button className="btn btn--show" onClick={() => setBlogVisible(!blogVisible)}>
          {blogVisible ? 'Hide' : 'View'}
        </button>
      </div>
      <div className={ blogVisible ? 'open' : 'close' }>
        {blog.url} <br />
        Likes {blog.likes} <br />
        {blog.user.name}
        <div className="blog__footer">
          <button className="btn btn--like" onClick={updateLikes}>
            Like
          </button>
          {showDeleteButton && (
            <button className="btn btn--delete" onClick={deleteBlog}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog