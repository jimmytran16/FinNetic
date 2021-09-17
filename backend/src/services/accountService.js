'use strict'
const Account = require('../models/accounts')
const Payment = require('../models/payments')
const User = require('../models/users')
const mongoose = require('mongoose')
const ReminderService = require('./reminderService')
const { DashboardUtil } = require('../utils/index')

module.exports = class AccountService {

    constructor() { }

    async getAllAccounts(userId, cb) {
        try {
            let result = await Account.find({ userId: mongoose.Types.ObjectId(userId) }).select('-userId')
            result = DashboardUtil.getLatestDueDate(result)
            cb(null, result)
        } catch (err) {
            cb(err, null)
        }
    }

    async getAccount(userId, accountId, cb) {
        try {
            let result = await Account.findOne({ _id: mongoose.Types.ObjectId(accountId), userId: mongoose.Types.ObjectId(userId) }).select('-userId');
            cb(null, result)
        } catch (err) {
            cb(err, null)
        }
    }

    async createAccount(name, balance, accountName, accountDueDay, userId, cb) {
        let user = await User.findById(mongoose.Types.ObjectId(userId)).select('phone')
        let reminderService = new ReminderService();
        let account = new Account({
            userId: userId,
            name: name,
            balance: balance,
            accountName: accountName,
            accountDueDay: accountDueDay,
            lastPayment: null
        })
        let result = []
        try {
            result = await account.save()
        } catch (err) {
            cb(err, null)
        }
        // set the payload to be send to the Reminder API to be saved
        const payload = {
            accountName: name,
            accountId: result._id,
            userId: userId,
            scheduledToSend: accountDueDay,
            sendReminder: false,
            phone: user.phone
        }
        reminderService.saveAccountToQueue(payload, (err, result) => {
            return cb(err, result);
        })
    }

    async deleteAccount(id, cb) {
        try { // delete specific account, and all payments under that account
            let reminderService = new ReminderService();
            await reminderService.deleteAccountFromQueue(id);
            await Account.findByIdAndDelete(new mongoose.Types.ObjectId(id));
            await Payment.deleteMany({ accountId: mongoose.Types.ObjectId(id) });
            return cb(null, `Sucessfully deleted account ${id}`)
        } catch (err) {
            console.log(err)
            return cb(err, null)
        }
    }

    async updateAccount(filter, update, cb) {
        try {
            let result = await Account.findOneAndUpdate(filter, update)
            cb(null, result)
        } catch (err) {
            cb(err, null)
        }
    }

    // _getLatestDueDate(data) {
    //     let todaysDate = new Date()
    //     let todaysDateDay = todaysDate.getUTCDate();
    //     for (var i in data) {
    //         let accountDueDay = data[i].accountDueDay
    //         // if current date's day is past the accountDueDate's day, then change month to be one month ahead
    //         if (todaysDateDay > accountDueDay) {
    //             data[i]['accountDueDate'] = moment.utc(todaysDate).set("date", accountDueDay).add(1, "month")
    //         }
    //         else {
    //             data[i]['accountDueDate'] = moment.utc(todaysDate).set("date", accountDueDay)
    //         }
    //     }
    //     return data;
    // }
}
