const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  balance: { type: Number, required: true },
  accountName: { type: String, required: true },
  accountDueDate: { type: Date, required: false },
  accountDueDay: { type: Number, required: true },
  lastPayment: { type: Date, required: false },
  scheduledToSend: { type: Boolean, required: false },
  createdOn: { type: Date, default: new Date() }
});

const Account = mongoose.model('accounts', accountSchema);
