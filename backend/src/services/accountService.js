const Account = require('../models/accounts')

module.exports = class AccountService {

    constructor() { }

    async createAccount(name, balance, accountName, cb) {
        let account = new Account({
            name: name,
            balance: balance,
            accountName: accountName
        })

        try {
            let result = await account.save()
            cb(null,result)
        } catch (err) {
            cb(err,null)
        }
    }
}