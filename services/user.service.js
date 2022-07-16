const UserModel = require('../models/user.model')
const Bcrypt = require('../utilities/bcrypt')

class UserService {
  static async check(payload) {
    return await UserModel.count({ ...payload })
  }

  static async create(fullname, age, username, password, role) {
    return await UserModel.create({
      fullname: fullname || username,
      age,
      username,
      password: await Bcrypt.hash(password),
      role: role || 'user'
    })
  }

  static async findOne(payload) {
    return await UserModel.findOne({ ...payload })
  }

  static async findById(userId) {
    return await UserModel.findById(userId)
  }

  static async find() {
    return await UserModel.find()
  }

  static async findByIdAndUpdate(userId, payload) {
    return await UserModel.findByIdAndUpdate(userId, { ...payload }, { new: true })
  }

  static async findByIdAndDelete(userId) {
    return await UserModel.findByIdAndDelete(userId)
  }
}

module.exports = UserService