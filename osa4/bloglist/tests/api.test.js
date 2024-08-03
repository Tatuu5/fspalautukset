const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blogs')

const testBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      },
]

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

after(async () => {
    await mongoose.connection.close()
})