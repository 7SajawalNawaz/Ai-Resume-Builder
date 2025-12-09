const express = require("express")
const { registerUser, loginUser, getUserData, getResumeData } = require("../controllers/UserController")
const { protect } = require("../middleware/authMiddleware")

const userRouter = express.Router()

// user registration
userRouter.post("/register", registerUser)
// user login
userRouter.post("/login", loginUser)
// get user data
userRouter.get("/data" , protect , getUserData)
// get user resume data
userRouter.get("/resume/data" , protect , getResumeData)

module.exports = userRouter