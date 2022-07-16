const bcrypt = require('bcryptjs');

class Bcrypt {
  static salt = 8

  static async hash(payload) {
    return await bcrypt.hash(payload, this.salt)
  }
  
  static async compare(payload, hashedPayload) {
    return await bcrypt.compare(payload, hashedPayload)
  }
  
}

module.exports = Bcrypt
