const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const loanRoutes = require('./routes/loan');
app.use('/loan', loanRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(3000, () => {
    console.log('🚀 Server running on port 3000');
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
