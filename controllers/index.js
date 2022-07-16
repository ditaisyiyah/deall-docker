const UserService = require('../services/user.service')
const RefreshTokenService = require('../services/refreshToken.service')

const Bcrypt = require('../utilities/bcrypt')
const Jwt = require('../utilities/jwt')

class Controller {
  static async register(req, res, next) {
    try {
      const { fullname, age, username, password, role } = req.body
      const isUsernameUsed = await UserService.findOne({ username }) 
  
      if (isUsernameUsed) {
        return res.status(400).send({ message: 'Sorry, username has already been used 😞' })
      }
  
      await UserService.create(fullname, age, username, password, role)
  
      return res.status(201).send({ message: 'Yeay! You are now registered 😎' })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body
      const user = await UserService.findOne({ username })
      
      if (!user) {
        return res.status(401).send({ message: 'Oops! Your username and/or password is invalid 😮' })
      }
      
      const isPasswordValid = await Bcrypt.compare(password, user.password)
      
      if (!isPasswordValid) {
        return res.status(401).send({ message: 'Oops! Your username and/or password is invalid 😮' })
      }
      
      const accessToken = Jwt.sign({ userId: user._id, username, role: user.role })
      const refreshToken = await RefreshTokenService.upsert(user._id, username)

      return res.send({ accessToken, refreshToken, message: 'Welcome! 😃' })
    } catch (error) {
      next(error)   
    }
  }
    
  static async refreshToken(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      const { refreshToken: refreshTokenBody } = req.body
      
      if (!token) {
        return res.status(400).send({ message: 'Oops! Refresh token is invalid 😞' })
      }
      
      const { userId, username, role } = Jwt.verify(token, { ignoreExpiration: true })
      const refreshToken = await RefreshTokenService.findOne({ userId, username, refreshToken: refreshTokenBody })

      if (!refreshToken) {
        return res.status(400).send({ message: 'Oops! Refresh token is invalid 😞' })
      }
      
      if (new Date() > new Date(refreshToken.expiredAt)) {
        return res.status(400).send({ message: 'Your refresh token is expired, please login again 😊' })
      }
      
      const accessToken = Jwt.sign({ userId, username, role })

      return res.send({ accessToken, message: 'Here is your new access token! 😀' })
    } catch (error) {
      next(error) 
    }
  }

  static async getMyProfile(req, res, next) {
    try {
      const { userId } = req.user
      const user = await UserService.findById(userId)
      
      return res.send(user)
    } catch (error) {
      next(error)
    }
  }

  static async getUsers(_, res, next) {
    try {
      const users = await UserService.find()
      
      return res.send(users)
    } catch (error) {
      next(error)
    }
  }

  static async getUser(req, res, next) {
    try {
      const { userId } = req.params
      const user = await UserService.findById(userId)
      
      if (!user) {
        res.status(400).send({ message: 'User not found 🙁' })
      }
      
      return res.send(user)
    } catch (error) {
      next(error)
    }
  }

  static async editUser(req, res, next) {
    try {
      const { userId } = req.params
      const { fullname, age } = req.body
      const user = await UserService.findByIdAndUpdate(userId, { fullname, age })
      
      if (!user.value) {
        res.status(400).send({ message: 'User not found 🙁' })
      }
      
      return res.send({ message: 'Successfully updated!' })
    } catch (error) {
      next(error)
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { userId } = req.params
      const user = await UserService.findByIdAndDelete(userId)
      
      if (!user.value) {
        res.status(400).send({ message: 'User not found 🙁' })
      }
      
      return res.send({ message: 'Successfully deleted!' })
    } catch (error) {
      next(error)
    }
  }

  static async hello(_, res) {
    res.send({ message: `Kecoa Terbang` })
  }
}

module.exports = Controller
