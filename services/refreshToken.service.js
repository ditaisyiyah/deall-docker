const { v4: uuidv4 } = require('uuid');

const RefreshTokenModel = require('../models/refreshToken.model')

class RefreshTokenService {
  static async upsert(userId, username) {
    const refreshToken =  uuidv4()
    const expiredAt = new Date()
    expiredAt.setSeconds(expiredAt.getSeconds() + 600)

    const isExist = await RefreshTokenModel.findOne({ userId, username })

    if (isExist) {
      await RefreshTokenModel.findOneAndUpdate({ userId, username }, { refreshToken, expiredAt })
    } else {
      await RefreshTokenModel.create({ userId, username, refreshToken, expiredAt})
    }

    return refreshToken
  }

  static async findOne(payload) {
    return await RefreshTokenModel.findOne({ ...payload })
  }

  static async deleteOne(payload) {
    return await RefreshTokenModel.deleteOne({ ...payload })
  }
}

module.exports = RefreshTokenService