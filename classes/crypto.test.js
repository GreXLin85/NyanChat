const Crypto = require("./crypto");

function getRandomPass() {
  /* thanks stackoverflow lol */
  var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return String(
    Array(32)
      .join()
      .split(",")
      .map(function () {
        return s.charAt(Math.floor(Math.random() * s.length));
      })
      .join("")
  );
}

let key = getRandomPass();
const crypto = new Crypto(key);
let encrypted;

test("Is encrypt function ok?", () => {
  encrypted = crypto.encrypt("asd").cipher;
  expect(crypto.encrypt("asd", key).status).toBe("success");
});
test("Is decrypt function ok?", () => {
  expect(crypto.decrypt(encrypted).plaintext).toBe("asd");
});
