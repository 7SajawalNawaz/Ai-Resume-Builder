const mongoose = require('mongoose');

const connectDB = async () =>{

    mongoose.connection.on('connected' , ()=>{
        console.log("Database Connected Successfully 🔥");
    })

    await mongoose.connect(process.env.MONGODB_URL)

}

module.exports = connectDB;