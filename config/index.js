require('dotenv').config()

module.exports = {
  app: { 
    port: process.env.PORT,
  },
  jwt: { 
    privateKey: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRED
  },
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT
  }

}