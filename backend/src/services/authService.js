const User = require('../models/users')
const bcrypt = require('bcrypt')

module.exports = class AuthService {
    constructor() { }

    async registerUser(payload, cb) {
        try {
            var alreadyRegistered = await this.isUserRegistered(payload.username)
            if (alreadyRegistered) return cb('User Already Registered', null);
            
            var { salt, hashedPassword } = await this.hashPassword(payload.password, 10)
            payload.password = hashedPassword;
            payload.salt = salt;

            var user = new User(payload)
            let savedUser = await user.save()

            return cb(null, savedUser);
        } catch (err) {
            return cb(err, null);
        }
    }

    async isUserRegistered(username) {
        var result = await User.findOne({ username: username })
        
        if (result == null || Object.keys(result).length === 0) {
            return false;
        }
        return true;
    }

    async hashPassword(password, saltRounds) {
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
}