const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({username})
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({ error: 'password or username incorrect' })
    }

    const userToToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userToToken, process.env.SECRET, { expiresIn: 60*60 })

    response.status(200).send({ token, username: user.username, name: user.name})
})

module.exports = loginRouter