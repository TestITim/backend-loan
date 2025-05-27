const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const loanRoutes = require('./routes/loan');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/loan', loanRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/loan-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));