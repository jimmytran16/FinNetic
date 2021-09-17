'use strict'
const Payment = require('../models/payments')
const Account = require('../models/accounts')
const AccountService = require('./accountService')
const { DashboardUtil } = require('../utils/index')
const moment = require('moment')
const mongoose = require('mongoose')

module.exports = class PaymentService {

    constructor() { }

    async getAllPayments(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await Payment
                    .find({ userId: mongoose.Types.ObjectId(userId) })
                    .select('-userId')
                    .sort({ 'paymentDate': 'desc' });
                return resolve(result)
            } catch (err) {
                return reject(err.toString())
            }
        })
    }

    async createPayment(userId, name, accountId, accountName, amountPaid, paymentDate, cb) {
        var accountService = new AccountService();

        let payment = new Payment({
            userId: mongoose.Types.ObjectId(userId),
            accountId: mongoose.Types.ObjectId(accountId),
            name: name,
            accountName: accountName,
            amountPaid: amountPaid,
            paymentDate: new Date(paymentDate)
        })
        // if the current 'lastPayment' is the latest then, we don't want to update the new payment date
        accountService.getAccount(userId, accountId, (err, result) => {
            if (err) return cb(err, null)
            if (result.lastPayment < new Date(paymentDate) || result.lastPayment === null) {
                // Update the last payment to the account
                accountService.updateAccount({ _id: accountId }, { $set: { lastPayment: new Date(paymentDate) } }, (err, data) => {
                    if (err) return cb(err, null);
                })
            }
        })

        try {
            let result = await payment.save()
            // update new balance after payment is made
            await Account.updateOne({ _id: mongoose.Types.ObjectId(accountId) }, { $inc: { balance: -amountPaid } })
            return cb(null, result)
        } catch (err) {
            return cb(err, null)
        }
    }

    async deletePaymentById(id, cb) {
        // delete payment
        // add payment amount back to balance 
        try {
            let result = await Payment.findByIdAndDelete(new mongoose.Types.ObjectId(id));
            await Account.updateOne({ _id: mongoose.Types.ObjectId(result.accountId) }, { $inc: { balance: result.amountPaid } });
            return cb(null, 'Sucessfully deleted payment');
        } catch (err) {
            cb(err, null)
        }
    }

    async deletePaymentByAccountId(accountId, cb) {
        try {
            let result = await Payment.deleteMany({ accountId: mongoose.Types.ObjectId(accountId) })
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
            let allAccounts = await Account.find({ userId: mongoose.Types.ObjectId(userId) }).select('-userId');
            let accountData = DashboardUtil.getLatestDueDate(allAccounts);
            
            return cb(null, {
                defaultChart : DashboardUtil.parseAccountDataIntoChartData(accountData),
                averageChart : DashboardUtil.parsePaymentDataIntoChartData(averageData),
                remainingChart: DashboardUtil.parsePaymentAndAccountDataIntoChartData(paymentData, accountData),
                isDefaultData : accountData.length === 0 ? false : true,
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

                let result = await Payment
                    .aggregate([
                        {
                            // match
                            $match: {
                                "userId": mongoose.Types.ObjectId(userId), // filter by user id
                                "paymentDate": {
                                    $gte: new Date(sixMonthsBeforeCurrentMonth), $lte: new Date(currentMonth) // date range
                                }
                            }
                        },
                        {
                            // group by
                            $group: {
                                "_id": "$name",
                                "userId": { "$first": "$userId" }, // populate user id
                                "paymentDates": { "$push": "$$ROOT" } // populate arrays of payment date objects based on the _id = name
                            }
                        }
                    ]).exec()
                return resolve(result)
            } catch (err) {
                console.log('errrrrrrrrrr', err)
                return reject(err.toString())
            }
        })
    }

    async getAllPaymentsAndAggregateByMonth(userId, cb) {
        try {
            let result = await Payment
                .find({ userId: mongoose.Types.ObjectId(userId) })
                .select('-userId')
                .sort({ 'paymentDate': 'desc' });
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
