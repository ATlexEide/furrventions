import bcrypt from "bcrypt";

export default class Hash {
  static hashPassword(password) {
    let hashed;

    bcrypt.hash(password, 12, function (err, hash) {
      if (err) console.log(err);
      else {
        hashed = hash;
      }
    });
    return hashed;
  }
}
