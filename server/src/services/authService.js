const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const DatabaseService = require('./databaseService');
require('dotenv').config()

class JWTService {
    constructor() {
        this.expirationTime = config.TOKEN_EXPIRATION
    }

    verifyAccessToken(token) {
        return jwt.verify(token)
    }

    generateAccessToken(payload) {
        return jwt.sign(payload, config.JWTSIGNATURE, { expiresIn : this.expirationTime })
    }
}

module.exports = class AuthService {
    constructor() {
        this.databaseService = new DatabaseService();
    }

    async loginUser(username,password, cb) {
        try {
            const { user , valid } = await this._isUserValid(username,password);
            return (valid)
                ? cb(null, { accessToken: new JWTService().generateAccessToken({ username: username, userId: user.id  }), user: username, name: user.name, isAuth: true })
                : cb('Invalid Login', null);
        }catch(err){
            cb(err,null);
        }
    }

    async registerUser(payload, cb) {
        try {
            var { username, password } = payload;

            var alreadyRegistered = await this._isUserRegistered(payload.username)
            if (alreadyRegistered) return cb('User Already Registered', null);

            var { salt, hashedPassword } = await this._hashPassword(payload.password, 10)
            payload.password = hashedPassword;
            payload.salt = salt;

            // var user = new User(payload)
            let savedUser = await this.databaseService.query('INSERT into Users(username, password, salt) VALUES (?,?,?);', [username, payload.password, payload.salt]);
            return cb(null, savedUser);
        } catch (err) {
            return cb(err, null);
        }
    }

    async _isUserRegistered(username) {
        var result = await this.databaseService.query('SELECT * FROM Users WHERE username = ?;', [username]);

        if (result == null || result.length === 0) {
            return false;
        }
        return true;
    }

    async _hashPassword(password, saltRounds) {
        try {
            var salt = await bcrypt.genSalt(saltRounds);
            var hashedPassword = await bcrypt.hash(password, salt);
            return {
                salt:salt,
                hashedPassword:hashedPassword
            }
        }catch(err) {
            return null;
        }
    }

    async _isUserValid(username,attemptedPassword) {
        try {
            var user = await this.databaseService.query('SELECT * FROM Users WHERE username = ?', [username])
            if (user.length !== 0) {
                // validate the password
                let matched = await bcrypt.compare(attemptedPassword, user[0].password)

                // return the the userid and the matched var
                return { user : user[0], valid: matched };

            }
            return { user: null, valid: false };

        }catch(err) {
            console.log(err)
            return { user: null, valid: false };
        }
    }
}
