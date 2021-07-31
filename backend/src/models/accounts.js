const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  name: String,
  balance: Number,
  accountName: String
});

const Account = mongoose.model('accounts', accountSchema);

module.exports = Account;