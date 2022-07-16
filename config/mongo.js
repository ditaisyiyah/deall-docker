const { MongoClient } = require("mongodb");

const { mongo } = require('../config/index')

const client = new MongoClient(`mongodb://${mongo.host || '127.0.0.1'}:${mongo.port || 27017}`);
const dbName = 'deall-dita'

let dbMongo;

async function connectMongo() {
  await client.connect();

  dbMongo = client.db(dbName)
  console.log("Mongo connected!");
}

function getMongoDb() {
  return dbMongo
}

module.exports = { connectMongo, getMongoDb }
