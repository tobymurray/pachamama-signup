const bcrypt = require('bcryptjs');

export namespace CryptoUtils {
  export function encryptPassword(password) {
    return bcrypt.hash(password, 4);
  }

  export function passwordMatches(plaintextPassword, encryptedPassword) {
    return bcrypt.compare(plaintextPassword, encryptedPassword);
  }
}
