const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db.js')
const userRouter = require('./routes/userRoutes.js')
const resumeRouter = require('./routes/resumeRoute.js')
const aiRouter = require('./routes/aiRoutes.js')

const app = express()
const PORT = process.env.PORT || 5000

// Database Connection
connectDB()

// middlware
app.use(express.json())
app.use(cors())

// home route
app.get('/',(req,res)=>{
  res.send('Hello from backend 😑')
})

// user routes
app.use("/api/users" , userRouter)
app.use("/api/resumes" , resumeRouter)
// ai routes
app.use("/api/ai" , aiRouter)



// app.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`)
// })

module.exports = app