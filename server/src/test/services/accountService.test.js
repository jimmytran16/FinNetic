require('dotenv').config()
const AccountService = require('../../services/accountService')
const Account = require('../../models/accounts')
const mongoose = require('mongoose')
const config = require('../../config/config')

let chai = require('chai');
let expect = chai.expect;

describe('TEST ACCOUNT SERVICE', () => {
    const dbUriTest = config.DB_TEST
    const mockUserId = '507f191e810c19729de860ea';
    const accountService = new AccountService()


    before(async () => {
        await mongoose.connect(dbUriTest, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        await addAccounts();
    })

    after(async () => {
        await deleteAccounts()
        await mongoose.disconnect()
    })

    it('Retrieve the account from the database', async () => {
        let result = await getAllAccounts(mockUserId);
        expect(result.length).equals(5);
        expect(result[0].accountName).equals('Test Account 1')
    })

    it('Update and fetch updated account from the database', async () => {
        const modifiedName = 'Modified Account 1';
        let update = { accountName: modifiedName };
        let filter = { accountName: 'Test Account 1' };
        await updateAccount(filter,update);
        // fetch account after it has been updated
        let fetched = await getAllAccounts(mockUserId);
        expect(fetched[0].accountName).equals(modifiedName);
    })

    // Will add a mock account to the database
    async function addAccounts() {
        let accounts = [
            {
                userId: mockUserId,
                name: 'Jimmy Tran',
                balance: 1000,
                accountName: 'Test Account 1',
                accountDueDay: 21,
                lastPayment: null
            },
            {
                userId: mockUserId,
                name: 'Jimmy Tran',
                balance: 80,
                accountName: 'Test Account 2',
                accountDueDay: 22,
                lastPayment: null
            },
            {
                userId: mockUserId,
                name: 'Jimmy Tran',
                balance: 900,
                accountName: 'Test Account 3',
                accountDueDay: 23,
                lastPayment: null
            },
            {
                userId: mockUserId,
                name: 'Jimmy Tran',
                balance: 1222,
                accountName: 'Test Account 4',
                accountDueDay: 24,
                lastPayment: null
            },
            {
                userId: mockUserId,
                name: 'Jimmy Tran',
                balance: 10,
                accountName: 'Test Account 5',
                accountDueDay: 25,
                lastPayment: null
            },
        ]
        return new Promise(async (resolve, reject) => {
            try {
                for (var i in accounts) {
                    let account = new Account({
                        userId: accounts[i].userId,
                        name: accounts[i].name,
                        balance: accounts[i].balance,
                        accountName: accounts[i].accountName,
                        accountDueDay: accounts[i].accountDueDay,
                        lastPayment: accounts[i].lastPayment
                    })
                    await account.save();
                }
                return resolve()
            } catch (err) {
                return reject(err)
            }
        })
    }

    async function deleteAccounts() {
        return new Promise(async (resolve, reject) => {
            try {
                await Account.deleteMany({ userId: mongoose.Types.ObjectId(mockUserId) });
                resolve()
            } catch (err) {
                reject(err)
            }
        })
    }

    async function getAllAccounts(userId) {
        return new Promise((resolve, reject) => {
            accountService.getAllAccounts(userId, (err, result) => {
                if (err) return reject(err)
                return resolve(result)
            })
        })
    }

    async function updateAccount(filter, update) {
        return new Promise((resolve,reject) => {
            accountService.updateAccount(filter,update,(err,result) => {
                if (err) return reject(err);
                return resolve(result);
            })
        })
    }

})
