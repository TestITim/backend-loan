const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');

router.post('/create', async (req, res) => {
  const { borrowerName, amount, interestRate, termMonths } = req.body;

  const loan = new Loan({
    borrowerName,
    amount,
    interestRate,
    termMonths,
    status: 'active',
    payments: []
  });

router.get('/all', async (req, res) => {
  const loans = await Loan.find();
  res.json(loans);
});

router.post('/pay/:id', async (req, res) => {
  const { amount } = req.body;
  const loan = await Loan.findById(req.params.id);
  if (!loan) return res.status(404).send('Loan not found');
  loan.payments.push({ amount });
  await loan.save();
  res.json(loan);
});

router.get('/summary/:id', async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  if (!loan) return res.status(404).send('Loan not found');

  const monthsElapsed = new Date().getMonth() - loan.startDate.getMonth() +
    12 * (new Date().getFullYear() - loan.startDate.getFullYear());

  const interestTotal = loan.amount * (loan.interestRate / 100) * monthsElapsed;
  const totalDue = loan.amount + interestTotal;
  const totalPaid = loan.payments.reduce((sum, p) => sum + p.amount, 0);
  const balance = totalDue - totalPaid;

  res.json({
    borrower: loan.borrowerName,
    amount: loan.amount,
    interestRate: loan.interestRate,
    monthsElapsed,
    interestTotal,
    totalDue,
    totalPaid,
    balance
  });
});

module.exports = router;
