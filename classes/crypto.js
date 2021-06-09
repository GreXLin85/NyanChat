const cryptico = require("cryptico");

class Crypto {
  #privateKey

  /**
   * 
   * @param {String} pass 
   */
  constructor(pass) {
    if (!pass) {
      throw Error("No passphrase")
    }
    
    this.#privateKey = cryptico.generateRSAKey(pass, 1024);
    this.publicKey = cryptico.publicKeyString(this.#privateKey);
  }
  /**
   * 
   * @param {String} message
   */
  decrypt(message) {
    return cryptico.decrypt(message, this.#privateKey);
  }

  /**
   * 
   * @param {String} message
   * @param {String} key
   */
  encrypt(message,key) {
    return cryptico.encrypt(message, key);
  }
}

module.exports = Crypto