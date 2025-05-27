const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');

// สร้าง loan ใหม่
router.post('/create', async (req, res) => {
  const { borrowerName, amount, interestRate, termMonths } = req.body;
  console.log("DEBUG: req.body", req.body);
  const loan = new Loan({
    borrowerName,
    amount,
    interestRate,
    termMonths,
    startDate: new Date(),
    status: 'active',
    payments: []
  });

  await loan.save();
  res.json(loan);
});

// ดึง loan ทั้งหมด
router.get('/all', async (req, res) => {
  const loans = await Loan.find();
  res.json(loans);
});

// จ่ายเงิน
router.post('/pay/:id', async (req, res) => {
  const { amount } = req.body;
  const loan = await Loan.findById(req.params.id);
  if (!loan) return res.status(404).send('Loan not found');

  loan.payments.push({ amount });
  await loan.save();
  res.json(loan);
});

// สรุปยอด
router.get('/summary/:id', async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  if (!loan) return res.status(404).send('Loan not found');

  const now = new Date();
  const monthsElapsed = now.getMonth() - loan.startDate.getMonth() +
    12 * (now.getFullYear() - loan.startDate.getFullYear());

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
