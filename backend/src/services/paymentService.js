'use strict'
const Payment = require('../models/payments')
const AccountService = require('./accountService')
const moment = require('moment')
const mongoose = require('mongoose')

module.exports = class PaymentService {

    constructor() {
        this.accountService = new AccountService();
    }

    async getAllPayments(userId, cb) {
        try {
            let result = await Payment
                .find({ userId: mongoose.Types.ObjectId(userId) })
                .sort({ 'paymentDate': 'desc' });
            result = this._aggregatePaymentsByMonth(result);
            cb(null, result)
        } catch (err) {
            cb(err.toString(), null)
        }
    }

    async createPayment(userId, name, accountId, accountName, amountPaid, paymentDate, cb) {
        let payment = new Payment({
            userId: mongoose.Types.ObjectId(userId),
            accountId: mongoose.Types.ObjectId(accountId),
            name: name,
            accountName: accountName,
            amountPaid: amountPaid,
            paymentDate: new Date(paymentDate)
        })

        // Update the last payment to the account
        this.accountService.updateAccount({ _id: accountId }, { $set: { lastPayment: new Date(paymentDate) } }, (err, data) => {
            if (err) return cb(err, null);
        })

        try {
            let result = await payment.save()
            cb(null, result)
        } catch (err) {
            cb(err, null)
        }
    }

    async deletePayment(id, cb) {
        try {
            let result = await Payment.findByIdAndDelete(new mongoose.Types.ObjectId(id))
            cb(null, result)
        } catch (err) {
            cb(err, null)
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
                month:'',
                payments: []
            }
            monthPayments.month = monthToPayments;
            monthPayments.payments = objectOfMonthsToPayments[monthToPayments];
            arrayOfMonths.push(monthPayments);
        }
        return arrayOfMonths;
    }
}
