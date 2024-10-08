const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, id: 1, name: 1 })
    response.json(blogs)
  })

blogsRouter.post('/', userExtractor ,async (request, response) => {
    const body = request.body
    
    const user = request.user

    const blog = new Blog(
      {
        author: body.author,
        title: body.title,
        likes: body.likes,
        url: body.url,
        user: user.id
      }
    )
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
  })

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  } else {
    return response.status(401).json({ error: 'permission denied' })
  }
  
  
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter