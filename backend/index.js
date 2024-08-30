const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGODB_URI);

app.use(express.json());
app.use(cors());

// Use routes
app.use('/api/auth', authRoutes);
// app.use('/api/quiz', quizRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
