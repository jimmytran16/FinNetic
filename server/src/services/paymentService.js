'use strict'
const Payment = require('../models/payments')
const Account = require('../models/accounts')
const AccountService = require('./accountService')
const DatabaseService = require('./databaseService')
const { DashboardUtil } = require('../utils/index')
const moment = require('moment')

module.exports = class PaymentService {

    constructor() { 
        this.db = new DatabaseService();
        this.accountService = new AccountService();
    }

    async getAllPayments(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                // let result = await Payment
                //     .find({ userId: mongoose.Types.ObjectId(userId) })
                //     .select('-userId')
                //     .sort({ 'paymentDate': 'desc' });
                let result = await this.db.query('SELECT * FROM Payments WHERE userId = ? ORDER BY id DESC;', [userId]);
                return resolve(result)
            } catch (err) {
                return reject(err.toString())
            }
        })
    }

    async createPayment(userId, name, accountId, accountName, amountPaid, paymentDate, cb) {
        // https://stackoverflow.com/questions/29631131/perform-two-or-more-queries-in-one-request-using-node-mysql-and-expressjs
        // 1. Need to find way to run 2 queries in parallel
        // 2. STEPS
            // - Save payment and update account balance (2 calls)

        // let payment = new Payment({
        //     userId: mongoose.Types.ObjectId(userId),
        //     accountId: mongoose.Types.ObjectId(accountId),
        //     name: name,
        //     accountName: accountName,
        //     amountPaid: amountPaid,
        //     paymentDate: new Date(paymentDate)
        // })

        var parsedPaymentDate = this.db.parseDateToSqlFormat(new Date(paymentDate));
        // if the current 'lastPayment' is the latest then, we don't want to update the new payment date
        try {
            accountService.getAccount(userId, accountId, async (err, result) => {
                var data = result;
                if (err) return cb(err, null)
                if (result.lastPayment === null || result.lastPayment < new Date(paymentDate)) {
                    // Update the last payment to the account
                    await this.db.query('UPDATE Accounts SET lastPayment = ? WHERE id = ?;', [this.db.parseDateToSqlFormat(new Date(paymentDate)), accountId]);
                    // accountService.updateAccount({ _id: accountId }, { $set: { lastPayment: new Date(paymentDate) } }, (err, data) => {
                    //     if (err) return cb(err, null);
                    // })
                }
            })
        }catch (err) {
            return cb(err,null);
        }

        try {

            await this.db.query('INSERT INTO Payments(userId, accountId, amountPaid, paymentDate) VALUES (?,?,?,?);', [userId, accountId, amountPaid, parsedPaymentDate]);
            // let result = await payment.save()
            // update new balance after payment is made
            var result = await this.db.query('UPDATE Accounts SET balance = balance - ? WHERE id = ?;', [amountPaid, accountId]);
            // await Account.updateOne({ _id: mongoose.Types.ObjectId(accountId) }, { $inc: { balance: -amountPaid } })
            return cb(null, result)
        } catch (err) {
            return cb(err, null)
        }
    }

    async deletePaymentById(id, cb) {
        // delete payment
        // add payment amount back to balance 
        try {
            // let result = await Payment.findByIdAndDelete(new mongoose.Types.ObjectId(id));
            
            // Delete the payment and then update the account balance
            let result = await this.db.query('SELECT FROM Payments WHERE id = ?;', [id]);
            await this.db.query('DELETE FROM Payments WHERE id = ?;', [id]);
            await this.db.query('UPDATE Accounts SET balance = balance + ? WHERE id = ?;', [result[0].amountPaid, accountId]);
            // await Account.updateOne({ _id: mongoose.Types.ObjectId(result.accountId) }, { $inc: { balance: result.amountPaid } });
            return cb(null, 'Sucessfully deleted payment');
        } catch (err) {
            cb(err, null)
        }
    }

    async deletePaymentByAccountId(accountId, cb) {
        try {
            // let result = await Payment.deleteMany({ accountId: mongoose.Types.ObjectId(accountId) })
            let result = await this.db.query('DELETE FROM Payments WHERE accountId = ?;', [accountId]);
            cb(null, result)
        } catch (err) {
            cb(err, null)
        }
    }

    // IMPROVEMENTS --- NEED TO CREATE SEPERATE SERVICE FOR CHART AGGEGRATION 
    async getChartDataByUser(userId, cb) {
        try {
            let paymentData = await this.getAllPayments(userId);
            let averageData = await this.getLastSixMonthsOfAccountPayments(userId);
            // let allAccounts = await Account.find({ userId: mongoose.Types.ObjectId(userId) }).select('-userId');
            let allAccounts = await this.accountService.getAllAccounts(userId);
            let formatedAccountData = DashboardUtil.getLatestDueDate(allAccounts);
            
            return cb(null, {
                defaultChart : DashboardUtil.parseAccountDataIntoChartData(accountData),
                averageChart : DashboardUtil.parsePaymentDataIntoChartData(averageData),
                remainingChart: DashboardUtil.parsePaymentAndAccountDataIntoChartData(paymentData, accountData),
                isDefaultData : formatedAccountData.length === 0 ? false : true,
                isAverageData : paymentData.length === 0 ? false: true,
                isRemainingData : paymentData.length === 0 ? false : true
            })
        } catch (err) {
            return cb(err.toString(), null);
        }
    }

    // function that will send back the last six months of payments made by user for all open accounts
    async getLastSixMonthsOfAccountPayments(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const currentMonth = moment().utc().endOf('month').toISOString();
                const sixMonthsBeforeCurrentMonth = moment().utc().subtract(5, 'months').startOf('month').toISOString();
                let result = await this.db.query('SELECT * FROM Payments WHERE PaymentDate BETWEEN ? AND ?', [sixMonthsBeforeCurrentMonth, currentMonth]);
                return resolve(result)
            } catch (err) {
                console.log('errrrrrrrrrr', err)
                return reject(err.toString())
            }
        })
    }

    async getAllPaymentsAndAggregateByMonth(userId, cb) {
        try {
            // let result =  await Payment
            //     .find({ userId: mongoose.Types.ObjectId(userId) })
            //     .select('-userId')
            //     .sort({ 'paymentDate': 'desc' });
            let result = await this.db.query('SELECT id, accountId, amountPaid, paymentDate, createdOn FROM Payments WHERE userId = ? ORDER BY paymentDate DESC;', [userId]);
            result = this._aggregatePaymentsByMonth(result);
            cb(null, result)
        } catch (err) {
            cb(err.toString(), null)
        }
    }

    // Will sort payment data to objects of array of payments that is mapped to respective month
    // [{ month: <month>, data: <paymentSet> }]
    _aggregatePaymentsByMonth(data) {
        let objectOfMonthsToPayments = {}

        for (var i in data) {
            let currentData = new Object(data[i]);
            let currentPaymentMonth = moment.utc(currentData.paymentDate).format("MMM YYYY")
            if (currentPaymentMonth in objectOfMonthsToPayments) {
                let x = objectOfMonthsToPayments[currentPaymentMonth]
                x.push(currentData)
                objectOfMonthsToPayments[currentPaymentMonth] = x;
            }
            else {
                let arr = [currentData];
                objectOfMonthsToPayments[currentPaymentMonth] = arr;
            }
        }

        let arrayOfMonths = []
        for (var monthToPayments in objectOfMonthsToPayments) {
            let monthPayments = {
                month: '',
                payments: []
            }
            monthPayments.month = monthToPayments;
            monthPayments.payments = objectOfMonthsToPayments[monthToPayments];
            arrayOfMonths.push(monthPayments);
        }
        return arrayOfMonths;
    }

}
