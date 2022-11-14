import { useState } from 'react'

function Blog({ blog, handleUpdateBlog, handleDeleteBlog }) {
  const [showDetails, setShowDetails] = useState(false)

  const likeBlog = (e) => {
    handleUpdateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const deleteBlog = (e) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      handleDeleteBlog(blog.id)
    }
  }

  return (
    <li
      className="blog"
      style={{ border: '1px solid grey', marginBottom: 8, listStyle: 'none' }}
    >
      <h3 className="blog-title">
        {blog.title} {blog.author}
      </h3>
      <button
        className="toggle-button"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide' : 'View'}
      </button>
      {showDetails && (
        <>
          <p className="blog-url">{blog.url}</p>
          <p className="blog-likes">
            Likes: {blog.likes}
            <button className="like-button" onClick={likeBlog}>
              Like
            </button>
          </p>
          <p>{blog.user.name}</p>
          <button onClick={deleteBlog}>Delete</button>
        </>
      )}
    </li>
  )
}

export default Blog
