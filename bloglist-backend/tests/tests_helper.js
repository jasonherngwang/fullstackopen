const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Cats',
    author: 'Jason',
    url: 'www.cats.com',
    likes: 1,
  },
  {
    title: 'Dogs',
    author: 'John',
    url: 'www.dogs.com',
    likes: 5,
  },
  {
    title: 'Turtles',
    author: 'Sally',
    url: 'www.turtles.com',
    likes: 22,
  },
]

const nonExistentId = async () => {
  const blog = new Blog({
    title: 'removeme',
    author: 'removeme',
    url: 'removeme',
    likes: 0,
  })

  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const loginUser = async () => {
  const user = new User({
    username: 'jason',
    name: 'Jason Wang',
    passwordHash: await bcrypt.hash('abc', 10),
  })

  const savedUser = await user.save()

  const token = jwt.sign(
    {
      username: user.username,
      id: savedUser._id,
    },
    process.env.SECRET,
    { expiresIn: 60 * 60 }
  )

  return { ...savedUser.toJSON(), token }
}

const createBlogWithAuthenticatedUser = async () => {
  const user = await loginUser()

  const newBlog = new Blog({
    title: 'Squirrels',
    author: 'Allie',
    url: 'www.squirrels.com',
    likes: 900,
    user: user.id,
  })

  let blog = await newBlog.save()
  blog = await Blog.findById(blog._id).populate('user')

  return { blog, token: user.token }
}

const createBlogWithMissingLikes = async () => {
  const user = await loginUser()

  const newBlog = new Blog({
    title: 'Squirrels',
    author: 'Allie',
    url: 'www.squirrels.com',
    user: user.id,
  })

  let blog = await newBlog.save()
  blog = await Blog.findById(blog._id).populate('user')

  return { blog, token: user.token }
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistentId,
  loginUser,
  createBlogWithAuthenticatedUser,
  blogsInDb,
  usersInDb,
}
