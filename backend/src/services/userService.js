'use strict'
const User = require('../models/users')
const mongoose = require('mongoose')
const ReminderService = require('./reminderService')

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

    // CONTRAINTED TO ONLY UPDATE PHONE -- need to change logic to recognize if phone is being updated in order to call the reminder API
    async updateUser(id, update, cb) {
        try{
            await User.findByIdAndUpdate(mongoose.Types.ObjectId(id), { $set: update });
            if ('phone' in update) {
                const reminderService = new ReminderService()
                await reminderService.updateQueuePhoneNumber(id, update.phone)
            }  
            return cb(null, 'Sucessfully updated user!');
        }catch(err) {
            return cb(err.toString(), null);
        }
    }
}