"use strict";
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
module.exports = {
    encryptPassword: function (inputPassword) {
        var salt = bcrypt.genSaltSync();
        var hashedPassword = bcrypt.hashSync(inputPassword, salt);
        return hashedPassword;
    },
    comparePasswords: function (inputPassword, databasePassword) {
        // compare input and database values
        return bcrypt.compareSync(inputPassword, databasePassword);
    },
    createToken: function (email) {
        var token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: 14400 });
        return token;
    },
    decode: function (token) {
        // checks jwt token for secret
        try {
            var decoded = jwt.verify(token, process.env.JWT_SECRET);
            // if secret is contained return decoded token
            return decoded;
        }
        catch (err) {
            // if secret is wrong return false
            return false;
        }
        ;
    },
    hasToken: function (req) {
        if (req.headers['authorization']) {
            // parse the token from the auth.string "Bearer ASgdASgAeGshT.uhuioSeGewvaVR.DfyTgerwe"
            var token = req.headers['authorization'].split(' ')[1];
            return this.decode(token);
        }
        else {
            return false;
        }
        ;
    },
};
