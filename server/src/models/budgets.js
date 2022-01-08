const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    categories: { type: Array, required: true },
    budgets: { type: Array, required: true },
    spendings: { type: Array, required: true },
    monthlyIncome: { type: Number, required: true },
    currentMonth: { type: Date, required: true }
});

const Budget = mongoose.model('budgets', budgetSchema);
module.exports = Budget;