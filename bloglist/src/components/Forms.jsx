import { useState } from 'react'
import PropTypes from 'prop-types'

function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (e) => {
    e.preventDefault()

    setUsername('')
    setPassword('')

    handleLogin(username, password)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <fieldset style={{ border: 'none' }}>
          <label htmlFor="username">
            Username:{' '}
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password:{' '}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
        </fieldset>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

function BlogForm({ handleAddBlog }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()

    handleAddBlog({
      title,
      author,
      url,
    })
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <fieldset style={{ border: 'none' }}>
          <label htmlFor="title">
            Title:{' '}
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="author">
            Author:{' '}
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <label htmlFor="url">
            Url:{' '}
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
        </fieldset>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleAddBlog: PropTypes.func.isRequired,
}

export { LoginForm, BlogForm }
