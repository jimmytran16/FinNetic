const config = require('../../config/config')
const PaymentService = require('../../services/paymentService')
const mongoose = require('mongoose')
const Account = require('../../models/accounts')
const Payment = require('../../models/payments')


let chai = require('chai');
let expect = chai.expect;


describe('TEST PAYMENT SERVICE', () => {
    const paymentService = new PaymentService()
    const dbUriTest = config.DB_TEST
    const mockUserId = '507f191e810c19729de860ea';
    const mockAccountName = 'Jimmy Tran';
    const mockName = 'Test Account 1';

    var accountId = '';

    // connect to test database
    // create a mock open account
    before(async () => {
        await mongoose.connect(dbUriTest, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        let result = await createMockAccount();
        accountId = result._id;
    })

    // delete all collection test data
    // disconnect from database
    after(async () => {
        await Payment.deleteMany({})
        await Account.deleteMany({})
        await mongoose.disconnect()
    })
    // use account to make payment
    // retrieve payment and check against the properties
    // ensure that there is only one payment made to account
    it('Create payment and retrieve account', async () => {
        let result = await createPayment(mockUserId, mockName, accountId, mockAccountName, 20, new Date());
        let account = await retrieveAccountById(accountId);
        let payments = await paymentService.getAllPayments(mockUserId);
        expect(payments.length).equals(1);
    })

    it('Check if the remaining balance of paid account is correct - should be $980', async () => {
        let account = await retrieveAccountById(accountId);
        expect(account.balance).equals(980);
    })


    // helpers
    async function createMockAccount() {

        return new Promise(async (resolve, reject) => {
            try {
                let account = new Account({
                    userId: mockUserId,
                    name: mockName,
                    balance: 1000,
                    accountName: mockAccountName,
                    accountDueDay: 12,
                })
                let result = await account.save();
                return resolve(result)
            } catch (err) {
                return reject(err)
            }
        })
    }

    async function createPayment(userId, name, accountId, accountName, amountPaid, paymentDate) {
        return new Promise((resolve, reject) => {
            paymentService.createPayment(userId, name, accountId, accountName, amountPaid, paymentDate, (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            })
        })
    }

    async function retrieveAccountById(id) {
        return await Account.findById(mongoose.Types.ObjectId(id));
    }

})