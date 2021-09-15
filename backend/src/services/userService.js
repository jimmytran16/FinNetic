'use strict'
const User = require('../models/users')
const mongoose = require('mongoose')

module.exports = class UserService {
    constructor() {}

    async getUser(id, cb) {
        try{
            let result = await User.findById(mongoose.Types.ObjectId(id)).select('-_id -password -salt');
            return cb(null,result);
        }catch(err) {
            return cb(err.toString(), null);
        }
    }

    async updateUser(id, update, cb) {
        try{
            await User.findByIdAndUpdate(mongoose.Types.ObjectId(id), { $set: update });
            return cb(null, 'Sucessfully updated user!');
        }catch(err) {
            return cb(err.toString(), null);
        }
    }
}