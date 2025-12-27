const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database Connected Successfully 🔥");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Stop the server if DB fails
  }
};

module.exports = connectDB;
