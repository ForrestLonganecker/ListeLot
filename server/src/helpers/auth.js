const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  encryptPassword(inputPassword){
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(inputPassword, salt);
    return hashedPassword;
  },
  comparePasswords(inputPassword, databasePassword){
    // compare input and database values
    return bcrypt.compareSync(inputPassword, databasePassword);
  },
  createToken(email){
    let token = jwt.sign(
      { email: email },
      process.env.JWT_SECRET,
      { expiresIn: 14400 }
    );
    return token;
  },
};