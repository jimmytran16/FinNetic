const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  accountName: { type: String, required: true },
  amountPaid: { type: Number, required: true },
  paymentDate: { type: Date, required: false }
});

const Payment = mongoose.model('accounts', paymentSchema);

module.exports = Payment;