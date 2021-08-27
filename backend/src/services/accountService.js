const Account = require('../models/accounts')
const mongoose = require('mongoose')
const moment = require('moment')
const ReminderService = require('../services/reminderService')

module.exports = class AccountService {

    constructor() { }

    async getAllAccounts(userId,cb) {
        try {
            let result = await Account.find({ userId: mongoose.Types.ObjectId(userId) })
            result = this._getLatestDueDate(result);
            cb(null,result)
        } catch (err) {
            cb(err,null)
        }
    }

    async createAccount(name, balance, accountName, accountDueDate, userId, cb) {
        let reminderService = new ReminderService();
        let account = new Account({
            userId: userId,
            name: name,
            balance: balance,
            accountName: accountName,
            accountDueDate, accountDueDate,
            lastPayment: null
        })

        try {
            let result = await account.save()
        } catch (err) {
            cb(err,null)
        }
        // set the payload to be send to the Reminder API to be saved
        const payload = {
            "accountName": name,
            "userId": userId,
            "paymentDue": accountDueDate,
            "scheduledToSend": accountDueDate,
            "phone": "7812671202"
        }
        reminderService.saveAccountToQueue(payload,(err,result) => {
            return cb(err,result);
        })

    }

    async deleteAccount(id, cb) {
        try {
            let result = await Account.findByIdAndDelete(new mongoose.Types.ObjectId(id))
            cb(null,result)
        } catch (err) {
            cb(err,null)
        }
    }

    async updateAccount(filter, data, cb) {
        try {
            let result = await Account.findOneAndUpdate(filter,data)
            console.log(result)
            cb(null,result)
        } catch (err) {
            cb(err,null)
        }
    }

    _getLatestDueDate(data) {
        let todaysDate = new Date()
        for(var i in data) {
            let accountDueDate = new Date(data[i].accountDueDate)
            console.log(accountDueDate);
            let accountDueDay = accountDueDate.getUTCDate()
            // if current date's day is past the accountDueDate's day, then change month to be one month ahead
            console.log(todaysDate.getDate(), accountDueDay)
            if (todaysDate.getDate() > accountDueDay) {
                data[i].accountDueDate = moment.utc(todaysDate).set("date",accountDueDay).add(1,"month")
            }
        }
        return data;
    }
}
