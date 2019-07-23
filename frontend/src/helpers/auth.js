const jwt = require('jsonwebtoken');

module.exports = {
  authenticate(token){
    try {
      const authenticated = jwt.verify(token, process.env.JWT_SECRET);
      if(authenticated){
        localStorage.setItem('token', token);
        return true;
      } else {
        return false;
      };
    } catch(err) {
      return false;
    }
  },
}