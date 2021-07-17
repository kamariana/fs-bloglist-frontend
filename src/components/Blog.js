import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)

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
        {/* {blog.user.name} */}
        <div className="blog__footer">
          <button className="btn" onClick={updateLikes}>
          Like
          </button>
          <button className="btn" onClick={deleteBlog}>
          Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog