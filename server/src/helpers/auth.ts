const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

interface Req {
  headers: Headers
}

interface Headers {
  authorization: string
}

module.exports = {
  encryptPassword(inputPassword: string){
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(inputPassword, salt);
    return hashedPassword;
  },
  comparePasswords(inputPassword: string, databasePassword: string){
    // compare input and database values
    return bcrypt.compareSync(inputPassword, databasePassword);
  },
  createToken(email: string){
    const token = jwt.sign(
      { email: email },
      process.env.JWT_SECRET,
      { expiresIn: 14400 }
    );
    return token;
  },
  decode(token: Object){
    // checks jwt token for secret
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // if secret is contained return decoded token
      return decoded;
    } catch(err) {
      // if secret is wrong return false
      return false;
    };
  },
  hasToken(req: Req){
    if(req.headers['authorization']){
      // parse the token from the auth.string "Bearer ASgdASgAeGshT.uhuioSeGewvaVR.DfyTgerwe"
      let token = req.headers['authorization'].split(' ')[1];

      return this.decode(token);
    } else {
      return false;
    };
  },
};