const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  accountId: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  accountName: { type: String, required: true },
  amountPaid: { type: Number, required: true },
  paymentDate: { type: Date, required: false },
  createdOn: { type: Date, default: new Date() }
});

const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;
