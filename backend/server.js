const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const loanRoutes = require('./routes/loan');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/loan', loanRoutes);

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
