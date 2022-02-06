'use strict'
const Account = require('../models/accounts')
const Payment = require('../models/payments')
const User = require('../models/users')
const mongoose = require('mongoose')
const ReminderService = require('./reminderService')
const DatabaseService = require('./databaseService')
const { DashboardUtil } = require('../utils/index')

module.exports = class AccountService {

    constructor() {
        this.databaseService = new DatabaseService();
    }

    async getAllAccounts(userId, cb) {
        try {
            // let result = await Account.find({ userId: mongoose.Types.ObjectId(userId) }).select('-userId')
            let result = await this.databaseService.query('SELECT * FROM Accounts WHERE userId = ?', [userId]);
            result = DashboardUtil.getLatestDueDate(result)
            cb(null, result)
        } catch (err) {
            cb(err, null)
        }
    }

    async getAccount(userId, accountId, cb) {
        try {
            // let result = await Account.findOne({ _id: mongoose.Types.ObjectId(accountId), userId: mongoose.Types.ObjectId(userId) }).select('-userId');
            let result = await this.databaseService.query('SELECT * FROM Accounts WHERE id = ? AND userId = ?', [accountId, userId]);
            cb(null, result[0])
        } catch (err) {
            cb(err, null)
        }
    }


    async createAccount(name, balance, accountName, accountDueDay, userId, cb) {
        // let user = await User.findById(mongoose.Types.ObjectId(userId)).select('phone')

        try {

            let user = await this.databaseService.query('SELECT phone FROM Users WHERE id = ?', [userId]);
            let reminderService = new ReminderService();
            let result = []

            result = await this.databaseService.query('INSERT INTO Accounts(userId, name, balance, accountHolder, accountDueDay) VALUES(?,?,?,?,?);', [userId, name, balance, accountName, accountDueDay]);
            // set the payload to be send to the Reminder API to be saved
            const payload = {
                accountName: name,
                accountId: result._id,
                userId: userId,
                scheduledToSend: accountDueDay,
                sendReminder: false,
                phone: user[0].phone
            }
            await reminderService.saveAccountToQueue(payload);
            return cb(null, result);
        } catch (err) {
            return cb(err, null);
        }
    }

    async deleteAccount(id, cb) {
        try { // delete specific account, and all payments under that account, and also delete the payment from the reminder queue
            let reminderService = new ReminderService();

            await reminderService.deleteAccountFromQueue(id);
            await this.databaseService.query("DELETE FROM Accounts WHERE id = ?;", [id]);
            await this.databaseService.query("DELETE FROM Payments WHERE accountId = ?;", [id]);
            // await Account.findByIdAndDelete(new mongoose.Types.ObjectId(id));
            // await Payment.deleteMany({ accountId: mongoose.Types.ObjectId(id) });
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
}
