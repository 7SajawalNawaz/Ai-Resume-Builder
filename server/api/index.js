const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('../config/db');
const userRouter = require('../routes/userRoutes');
const resumeRouter = require('../routes/resumeRoute');
const aiRouter = require('../routes/aiRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database **once at startup**
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Hello from backend 😑');
});

app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

module.exports = app;
