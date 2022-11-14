const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { user } = request

  if (!user) {
    return response
      .status(401)
      .json({ error: 'must be logged in to edit blogs' })
  }

  const blog = await Blog.findById(request.params.id).populate('user')
  const isBlogOwner = blog.user._id.toString() === user._id.toString()

  if (blog && isBlogOwner) {
    const { title, author, url, likes } = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes }, // undefined values are removed
      { new: true, runValidators: true, context: 'query' }
    )

    return response.status(201).json(updatedBlog)
  }

  return response
    .status(401)
    .json({ error: "only the blog's creator can edit the blog" })
})

blogsRouter.post('/', async (request, response) => {
  const { body, user } = request

  if (!user) {
    return response
      .status(401)
      .json({ error: 'must be logged in to add blogs' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { user } = request

  if (!user) {
    return response
      .status(401)
      .json({ error: 'must be logged in to delete blogs' })
  }

  const blog = await Blog.findById(request.params.id).populate('user')
  const isBlogOwner = blog.user._id.toString() === user._id.toString()

  if (blog && isBlogOwner) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }

  return response
    .status(401)
    .json({ error: "only the blog's creator can delete the blog" })
})

module.exports = blogsRouter
