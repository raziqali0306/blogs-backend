const argon2 = require('argon2')

exports.hash = async password => {
    try {
        return await argon2.hash(password);

    }
    catch (err) {
        return password
    }
}


exports.verify = async (hash, pass) => {
  try {
    if (await argon2.verify(hash, pass)) {
        return true;
    } else {
        return false;
    }
  } catch (err) {
    return false;
  }
}