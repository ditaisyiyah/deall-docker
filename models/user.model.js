const { ObjectId } = require('mongodb');
const { getMongoDb } = require('../config/mongo');

class UserModel {
  static async count(payload) {
    return await getMongoDb().collection('users').countDocuments({ ...payload });
  }
  
  static async create(payload) {
    return await getMongoDb().collection('users').insertOne({ ...payload });
  }
  
  static async findOne(payload) {
    return await getMongoDb().collection('users').findOne({ ...payload });
  }

  static async findById(id) {
    return await getMongoDb().collection('users').findOne({ _id: ObjectId(id) });
  }

  static async find() {
    return await getMongoDb().collection('users').find().toArray();
  }

  static async findByIdAndUpdate(id, payload) {
    return await getMongoDb().collection('users').findOneAndUpdate({ _id: ObjectId(id) }, { $set: payload });
  }
  static async findByIdAndDelete(id) {
    return await getMongoDb().collection('users').findOneAndDelete({ _id: ObjectId(id) });
  }
}

module.exports = UserModel;

