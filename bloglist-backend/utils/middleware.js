const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const logger = require('./logger')
const User = require('../models/user')

morgan.token('body', (req) =>
  ['POST', 'PUT'].includes(req.method) ? JSON.stringify(req.body) : ''
)

const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :body'
)

const tokenExtractor = (request, response, next) => {
  request.token = null

  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (request, response, next) => {
  request.user = null

  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    request.user = await User.findById(decodedToken.id)
  }

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  return next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
}
