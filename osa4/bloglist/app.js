const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogRouters')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')


mongoose.connect(config.MONGODB_URL)
    .then(() => {
        logger.info('connecting to', config.MONGODB_URL)
        logger.info('connected to database')
    })
    .catch((error) => {
        logger.error('error connecting to database', error.message)
    })



app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)
module.exports = app