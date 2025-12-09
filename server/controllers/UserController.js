const bcrypt = require('bcrypt')
const User = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const Resume = require('../models/ResumeModel');

// generate token
const generateToken = (userId) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'})
    return token
}

// controller for user registration
// POST : /api/users/register
const registerUser = async (req,res) =>{
    try{
        const {name,email,password} = req.body;
        // validate the request body
        if(!name || !email || !password){
            return res.status(400).json({success:false , message:"Please fill all the fields"})
        }
        // check if user already exists
        const userExsit = await User.findOne({email})
        if(userExsit){
            return res.status(400).json({success:false , message:"User already exists"})
        }

        // create new user
        const hashPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name,
            email,
            password:hashPassword
        })
        // save user to database
        const token = generateToken(user._id)
        user.password = undefined
        // return success response
        return res.status(201).json({success:true , message:"User registered successfully",token , newUser:user})

    }catch(err){
        return res.status(400).json({success:false , message:"User registration failed"})
    }
}

// controller for user login
// POST : /api/users/login
const loginUser = async (req,res) =>{
    try{
        const {email,password} = req.body;
        // validate the request body
        if(!email || !password){
            return res.status(400).json({success:false , message:"Please fill all the fields"})
        }
        // check if user already exists
        const userExsit = await User.findOne({email})
        if(!userExsit){
            return res.status(400).json({success:false , message:"User does not exist"})
        }
        // compare password
        const isPasswordMatch = await userExsit.comparePassword(password)
        if(!isPasswordMatch){
            return res.status(400).json({success:false , message:"Invalid password"})
        }

        const token = generateToken(userExsit._id)
        // remove password from response
        userExsit.password = undefined
        // return success response
        return res.status(200).json({success:true , message:"User logged in successfully",token , user:userExsit})
    }
    catch(err){
        return res.status(400).json({success:false , message:"User login failed"})
    }}

// controller for user login
// GET : /api/users/data
const getUserData = async (req,res) =>{
    try{
        // get user id from token
        const userId = req.userId
        // find user by id
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({success:false , message:"User not found"})
        }
        // return success response
        // remove password from response
        user.password = undefined
        return res.status(200).json({user})
    }catch(err){
        return res.status(400).json({success:false , message:"User data fetch failed"})
    }
}

// controller for user resume data
// GET : /api/users/resume/data
const getResumeData = async (req,res) =>{
    try{
        // get user id from token
        const userId = req.userId
        // find resume by user id
        const resumes = await Resume.find({userId})
        if(!resumes){
            return res.status(400).json({success:false , message:"Resume not found"})
        }
        // return success response
        return res.status(200).json({resumes})

    }catch(err){
        return res.status(400).json({success:false , message:"Resume not found"})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserData,
    getResumeData
}