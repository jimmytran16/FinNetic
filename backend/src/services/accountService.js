const Account = require('../models/accounts')
const mongoose = require('mongoose')

module.exports = class AccountService {

    constructor() { }

    async getAllAccounts(username,cb) {
        try {
            let result = await Account.find({})
            cb(null,result)
        } catch (err) {
            cb(err,null)
        }
    }

    async createAccount(name, balance, accountName, cb) {
        let account = new Account({
            name: name,
            balance: balance,
            accountName: accountName,
            lastPayment: null
        })

        try {
            let result = await account.save()
            cb(null,result)
        } catch (err) {
            cb(err,null)
        }
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
}