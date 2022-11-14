import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { LoginForm, BlogForm } from './components/Forms'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

function App() {
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const sortByLikesDescending = (blogs) =>
    blogs.sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    const fetchData = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(sortByLikesDescending(allBlogs))
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)
    }
  }, [])

  const flashMessage = (message, type) => {
    setMessage({ message, type })
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  const handleLogin = async (username, password) => {
    try {
      const loggedInUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)
      flashMessage('Logged in', 'info')
    } catch (exception) {
      flashMessage('Incorrect credentials', 'error')
    }
  }

  const handleLogout = (e) => {
    console.log('logging out')

    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)
    flashMessage('Logged out', 'info')
  }

  const handleAddBlog = async (newBlog) => {
    if (Object.values(newBlog).some((field) => !field)) {
      flashMessage(
        'Blog could not be added. Must provide title, author, and url.',
        'error'
      )
      return
    }

    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(sortByLikesDescending([...blogs, returnedBlog]))
      flashMessage(
        `New blog added: ${returnedBlog.title} by ${returnedBlog.author}`,
        'info'
      )
    } catch (exception) {
      if (exception.response.data.error === 'token expired') {
        alert('Your session is expired. Please log in again.')
        handleLogout()
      }
    }
  }

  const handleUpdateBlog = async (updatedBlog) => {
    try {
      const { title, author, url, likes } = await blogService.update(
        updatedBlog
      )

      setBlogs(
        sortByLikesDescending(
          blogs.map((blog) =>
            blog.id === updatedBlog.id
              ? {
                  ...blog,
                  title,
                  author,
                  url,
                  likes,
                } // Avoid overwriting user
              : blog
          )
        )
      )
    } catch (exception) {
      if (exception.response.data.error === 'token expired') {
        alert('Your session is expired. Please log in again.')
        handleLogout()
      }
    }
  }

  const handleDeleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(sortByLikesDescending(blogs.filter((blog) => blog.id !== id)))
    } catch (exception) {
      if (exception.response.data.error === 'token expired') {
        alert('Your session is expired. Please log in again.')
        handleLogout()
      }
    }
  }

  return (
    <main>
      <h1>Blogs</h1>
      <Notification message={message} />
      {user === null ? (
        <Togglable buttonLabel="Login">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      ) : (
        <>
          <div>
            <p>Logged in as: {user.name}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <hr />

          <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
            <BlogForm handleAddBlog={handleAddBlog} />
          </Togglable>

          <hr />

          <section>
            <ul>
              {blogs.map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleUpdateBlog={handleUpdateBlog}
                  handleDeleteBlog={handleDeleteBlog}
                />
              ))}
            </ul>
          </section>
        </>
      )}
    </main>
  )
}

export default App
