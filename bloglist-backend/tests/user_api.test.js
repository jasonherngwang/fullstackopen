const bcrypt = require('bcrypt')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./tests_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds (201) with a new username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jhw',
      name: 'Jason Wang',
      password: 'pspspsps',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((user) => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails (400) if username is taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: usersAtStart[0].username,
      name: 'Jason Wang',
      password: 'pspspsps',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails (400) if username is too short', async () => {
    const newUser = {
      username: 'j',
      name: 'Jason Wang',
      password: 'pspspsps',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed')
  })

  test('creation fails (400) if password is too short', async () => {
    const newUser = {
      username: 'jhw',
      name: 'Jason Wang',
      password: 'ps',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'password must be at least 3 characters'
    )
  })
})

afterAll(() => {
  mongoose.connection.close()
})
