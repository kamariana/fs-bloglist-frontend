import React, { useState } from 'react'

const Blog = ({ blog, index, updateLikes, deleteBlog }) => {
  const [blogVisible, setBlogVisible] = useState(0)
  const isOpen = blogVisible === index

  const btnLable = isOpen ? 'Hide' : 'View'
  
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
        <button className="btn" onClick={() => setBlogVisible(index)}>
          {btnLable}
        </button>
      </div>
      <div className="blog__content" style={{ display: isOpen ? 'block' : 'none' }}>
        {blog.url} <br />
        Likes {blog.likes} <br />
        {blog.user.name}
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