import React, { useState } from 'react'

const Blog = ({ blog, user, updateLikes, deleteBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const userName = blog.user.name
  const loggedInUserName = user.name

  const showDelete = loggedInUserName === userName


  return (
    <div className="blog">
      <div className="blog__summary">
        <div>
          <h2 className="blog__title">
            {blog.title}
          </h2>
          <span className="blog__sub-title">
            {blog.author}
          </span>
        </div>
        <button className="btn btn--show" onClick={() => setBlogVisible(!blogVisible)}>
          {blogVisible ? 'Hide' : 'View'}
        </button>
      </div>
      <div className={ blogVisible ? 'open' : 'close' }>
        {blog.url} <br />
        Likes {blog.likes} <br />
        {userName}
        <div className="blog__footer">
          <button className="btn btn--like" onClick={updateLikes}>
          Like
          </button>
          {showDelete && (
            <button className="btn" onClick={deleteBlog}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog