const AccountService = require('../../services/accountService')
const accountService = new AccountService()
const Account = require('../../models/accounts')
const mongoose = require('mongoose')
const db = require('../../db/db')

// NOT DONE 
beforeAll(() => {
    db.connect()
})

afterAll(() => {
    removeAllRecords();
})

test('', async () => {
    const mockAccounts = [
        { name: "Account 1", balance: 1233, accountName: 'Jimmy Tran', userId: '80acaf17758b7d4f159864e1' },
    ]
    for (var i in mockAccounts) {
        var account = mockAccounts[i];
        accountService.createAccount(account.name, account.balance, account.accountName, account.userId, (err, result) => {
            expect(err).toBe(null);
        });
    }
})


function removeAllRecords() {
    Account.deleteMany({ userId: mongoose.Types.ObjectId('80acaf17758b7d4f159864e1') })
}