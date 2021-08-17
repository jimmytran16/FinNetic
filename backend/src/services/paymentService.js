const Payment = require('../models/payments')
const AccountService = require('./accountService')
const mongoose = require('mongoose')

module.exports = class PaymentService {

    constructor() {
        this.accountService = new AccountService();
    }

    async getAllPayments(userId,cb) {
        try {
            let result = await Payment.find({ userId: mongoose.Types.ObjectId(userId) })
            cb(null,result)
        } catch (err) {
            cb(err,null)
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
          if (err) return cb (err,null);
        })

        try {
            let result = await payment.save()
            cb(null,result)
        } catch (err) {
            cb(err,null)
        }
    }

    async deletePayment(id, cb) {
        try {
            let result = await Payment.findByIdAndDelete(new mongoose.Types.ObjectId(id))
            cb(null,result)
        } catch (err) {
            cb(err,null)
        }
    }

}
