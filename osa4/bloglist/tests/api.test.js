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
  
  assert.strictEqual(response.body[0].likes, 10)
})

after(async () => {
    await mongoose.connection.close()
})