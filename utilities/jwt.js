const jwt = require('jsonwebtoken');

const config = require('../config/index')

class Jwt {
  static privateKey = config.jwt.privateKey
  static expiresIn =  config.jwt.expiresIn

  static sign(payload) {
    return jwt.sign(payload, this.privateKey, { expiresIn: this.expiresIn })
  }

  static verify(token, options) {
    return jwt.verify(token, this.privateKey, options)
  }

}

module.exports = Jwt