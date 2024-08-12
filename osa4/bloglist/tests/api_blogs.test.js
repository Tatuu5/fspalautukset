const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')

const api = supertest(app)
const helper = require('./helper')
const Blog = require('../models/blogs')
const User = require('../models/user')
const { application } = require('express')

const testBlogs = helper.initialBlogs

describe('when two blogs initally added', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there is correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 2)
  })

  test('returned blogs have id field called "id"', async () => {
    const response = await api.get('/api/blogs')

    const blogs = response.body

    blogs.forEach(blog => {
        assert(Object.hasOwn(blog, 'id'))
    })
  })
})

describe('different post requests respond correctly', () => {
  test('valid blog can be added', async () => {
    const newBlog = {
      title: 'Brand New Blog',
      author: 'ME',
      url: "localhost:3003",
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(blog => blog.url)

    assert.strictEqual(response.body.length, testBlogs.length + 1)

    assert(contents.includes('localhost:3003'))
  })

  test('like field not given a value', async () => {
    const newBlog = {
      title: 'Brand New Blog',
      author: 'ME',
      url: "localhost:3003",
    }  
    const blogsAtStart = await helper.blogsInDb()
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(blog => blog.url)

    assert.strictEqual(response.body.length, blogsAtStart.length + 1)

    assert(contents.includes('localhost:3003'))
  })

  test('post request missing title or url', async () => {
    const newBlog = {
      likes: 5,
      author: 'MysteryMan',
      url: "localhost:3003"
    }

    const newBlog2 = {
      likes: 5,
      author: 'MysteryMan',
      title: "Super FUNNY :D",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)
  })
})

describe('deletion and updating', () => {
  test('deletion of blog is successful (204) with correct id', async () => {
  let blogsAtStart = await Blog.find({})
  blogsAtStart = blogsAtStart.map(blog => blog.toJSON())

  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  })

  test('updating blog likes', async () => {
    let blogsAtStart = await Blog.find({})
    blogsAtStart = blogsAtStart.map(blog => blog.toJSON())

    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 10
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body[0].likes, updatedBlog.likes)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jouts',
      name: 'Matti Laaksonen',
      password: 'salaSANA',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
  test('creation fails with non unique username', async () => {
    const newUser = {
      username: 'root',
      name: 'Kalle-Pekka',
      password: 'salaSANA1',
    }

    const response = await api
                        .post('/api/users')
                        .send(newUser)
                        .expect(400)

    assert.strictEqual(response.body.error, 'username must be unique')
  })
})

describe.only('username and password conditions', () => {
  test('creation fails with short password or short username', async () => {
    const newUser = {
      username: 'jouts',
      name: "TESTI",
      password: "1",
    }

    const newUser2 = {
      username: "j",
      name: "TESTI",
      password: "testi1",
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    await api
      .post('/api/users')
      .send(newUser2)
      .expect(400)

    const response = await api.post('/api/users').send(newUser)
    const response2 = await api.post('/api/users').send(newUser2)

    assert.strictEqual(response2.body.error, `User validation failed: username: Path \`username\` (\`${newUser2.username}\`) is shorter than the minimum allowed length (3).`)
    assert.strictEqual(response.body.error, 'password must be atleast 3 characters long')
  })
  test('creation fails with no password and there is correct error message', async () => {
    const newUser = {
      username: 'jouts',
      name: "TESTI",
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const response = await api.post('/api/users').send(newUser)

    assert.strictEqual(response.body.error, 'no password given')
  })

})

after(async () => {
    await mongoose.connection.close()
})