const Jwt = require('../utilities/jwt')

class Middleware {
  static async authentication(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      
      if (!token) {
        return res.status(401).send({ message: 'Oops! Looks like you are unauthorized 🤔' })
      }

      const payload = Jwt.verify(token)
  
      req.user = payload
  
      next()
      
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).send({ message: 'Your access token is expired, please refresh token 🙂' })
      } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).send({ message: 'Oops! Looks like you are unauthorized 🤔' })
      }

      next(error)
    }

  }

  static async adminAuthorization(req, res, next) {
    const { role } = req.user

    if (role.toLowerCase() !== 'admin') {
      return res.status(403).send({ message: 'Hey! It\'s forbidden access 🤨' })
    }

    next()

  }

}

module.exports = Middleware