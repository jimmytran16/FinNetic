'use strict'
const User = require('../models/users')
const mongoose = require('mongoose')
const ReminderService = require('./reminderService')
const DatabaseService = require('./databaseService')

module.exports = class UserService {
    constructor() {
        this.databaseService = new DatabaseService();
    }

    async getUser(id, cb) {
        try{
            // let result = await User.findById(mongoose.Types.ObjectId(id)).select('-_id -password -salt');
            let result = await this.databaseService.query("SELECT id, username, phone FROM Users WHERE id = ?", [id]);
            return cb(null,result[0]);
        }catch(err) {
            return cb(err.toString(), null);
        }
    }

    // CONTRAINTED TO ONLY UPDATE PHONE -- need to change logic to recognize if phone is being updated in order to call the reminder API
    async updateUser(id, update, cb) {
        try{
            // await User.findByIdAndUpdate(mongoose.Types.ObjectId(id), { $set: update });
            await this.databaseService.query("UPDATE Users SET phone = ? WHERE id = ?", [update.phone, id]);
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