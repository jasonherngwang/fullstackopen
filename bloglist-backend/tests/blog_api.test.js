const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./tests_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))

  const promises = blogObjects.map((blog) => blog.save())
  await Promise.all(promises)
})

describe('when retrieving blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const allBlogs = await helper.blogsInDb()
    const titles = allBlogs.map((blog) => blog.title)
    expect(titles).toContain('Dogs')
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('each blog has the id property', async () => {
    const allBlogs = await helper.blogsInDb()

    allBlogs.forEach((blog) => expect(blog.id).toBeDefined())
  })
})

describe('when adding blogs', () => {
  test('when not logged in, adding a blog fails (401)', async () => {
    const newBlog = {
      title: 'Squirrels',
      author: 'Allie',
      url: 'www.squirrels.com',
      likes: 900,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('when logged in, a valid blog can be added', async () => {
    const user = await helper.loginUser()

    const newBlog = {
      title: 'Squirrels',
      author: 'Allie',
      url: 'www.squirrels.com',
      likes: 900,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((blog) => blog.title)
    expect(titles).toContain('Squirrels')
  })

  test('when logged in, a blog without title is not added', async () => {
    const user = await helper.loginUser()

    const newBlog = {
      title: '',
      author: 'Allie',
      url: 'www.squirrels.com',
      likes: 900,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

test('when logged in, a specific blog can be edited', async () => {
  const { blog, token } = await helper.createBlogWithAuthenticatedUser()

  await api
    .put(`/api/blogs/${blog._id}`)
    .send({ title: 'Camels', likes: 8 })
    .set('Authorization', `Bearer ${token}`)

  const updatedBlog = await Blog.findById(blog._id)

  expect(updatedBlog.title).toEqual('Camels')
  expect(updatedBlog.likes).toEqual(8)
})

test('when logged in, a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const { blog, token } = await helper.createBlogWithAuthenticatedUser()

  await api
    .delete(`/api/blogs/${blog._id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAfterDelete = await helper.blogsInDb()
  expect(blogsAfterDelete).toHaveLength(blogsAtStart.length)

  const blogIds = blogsAfterDelete.map((blog) => blog.id)
  expect(blogIds).not.toContain(blog._id)
})

test('likes defaults to 0', async () => {
  const user = await helper.loginUser()

  const newBlog = {
    title: 'Squirrels',
    author: 'Allie',
    url: 'www.squirrels.com',
  }

  const returnedBlog = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${user.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const retrievedBlog = await api
    .get(`/api/blogs/${returnedBlog.body.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(retrievedBlog.body.likes).toEqual(0)
})

afterAll(async () => {
  mongoose.connection.close()
})
