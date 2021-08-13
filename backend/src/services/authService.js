const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class JWTService {
    constructor() {}

    verifyAccessToken(token) {
        return jwt.verify(token)
    }
    
    generateAccessToken(payload) {
        return jwt.sign(payload, process.env.JWTSIGNATURE, { expiresIn :'15m' })
    }
}

module.exports = class AuthService {
    constructor() {}

    async loginUser(username,password, cb) {
        try {
            const { user , valid } = await this._isUserValid(username,password);
            var payload = { username: username, userId: user._id }

            return (valid)
                ? cb(null, { accessToken: new JWTService().generateAccessToken(payload), user: username, name: user.name, isAuth: true })
                : cb('Invalid Login', null);
        }catch(err){
            cb(err,null);
        }
    }

    async registerUser(payload, cb) {
        try {
            var alreadyRegistered = await this._isUserRegistered(payload.username)
            if (alreadyRegistered) return cb('User Already Registered', null);
            
            var { salt, hashedPassword } = await this._hashPassword(payload.password, 10)
            payload.password = hashedPassword;
            payload.salt = salt;

            var user = new User(payload)
            let savedUser = await user.save()

            return cb(null, savedUser);
        } catch (err) {
            return cb(err, null);
        }
    }

    async _isUserRegistered(username) {
        var result = await User.findOne({ username: username })
        
        if (result == null || Object.keys(result).length === 0) {
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
            var user = await User.findOne({ username: username })
            if (user !== null) {
                // validate the password
                let matched = await bcrypt.compare(attemptedPassword, user.password)                
                
                // return the the userid and the matched var  
                return { user : user, valid: matched };
                
            }
            return { user: null, valid: false };

        }catch(err) {
            console.log(err)
            return { user: null, valid:false };
        }
    }
}
