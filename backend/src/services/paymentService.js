const Payment = require('../models/payments')
const mongoose = require('mongoose')

module.exports = class PaymentService {

    constructor() { }

    async getAllPayments(userId,cb) {
        try {
            let result = await Payment.find({ userId: mongoose.Types.ObjectId(userId) })
            cb(null,result)
        } catch (err) {
            cb(err,null)
        }
    }

    async createPayment(userId, name, accountName, amountPaid, paymentDate, cb) {
        let payment = new Payment({
            userId: mongoose.Types.ObjectId(userId),
            name: name,
            accountName: accountName,
            amountPaid: amountPaid,
            paymentDate: new Date(paymentDate)
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