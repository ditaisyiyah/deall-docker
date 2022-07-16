const { ObjectId } = require('mongodb');
const { getMongoDb } = require('../config/mongo');

class RefreshTokenModel {
  static async findOneAndUpdate(where, payload) {
    return await getMongoDb().collection('refreshtokens').findOneAndUpdate({ ...where }, { $set: { ...payload } });
  }
  
  static async create(payload) {
    return await getMongoDb().collection('refreshtokens').insertOne({ ...payload });
  }

  static async findOne(payload) {
    return await getMongoDb().collection('refreshtokens').findOne({ ...payload, userId: ObjectId(payload.userId) });
  }

  static async deleteOne(payload) {
    return await getMongoDb().collection('refreshtokens').findOneAndDelete({ ...payload });
  }
}

module.exports = RefreshTokenModel;