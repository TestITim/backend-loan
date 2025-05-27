const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: Number,
  date: { type: Date, default: Date.now }
});

const loanSchema = new mongoose.Schema({
  borrowerName: String,
  amount: Number,
  interestRate: Number,
  termMonths: Number,
  startDate: { type: Date, default: Date.now },
  payments: [paymentSchema],
  status: { type: String, enum: ['active', 'closed'], default: 'active' }
});

module.exports = mongoose.model('Loan', loanSchema);