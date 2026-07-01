const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const {
    signupSchema,
    signinSchema
} = require("../schemas/admin");
const Admin = require("../models/admin");
router.get("/",(req,res)=>{
    res.send("admin router")
})


router.post("/signup",async(req,res)=>{
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: result.error.issues
        });
    }
    const {name, email, password } = result.data;
    try{
        const existinguser = await Admin.findOne({email : email});
        if(existinguser){
           return res.status(409).json({
                message: "admin already exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Admin.create({
            name,
            email,
            password : hashedPassword
        });
        const token = jwt.sign(
            {
                userId: newUser._id
            },
            process.env.JWT_SECRET
        );
    res.status(201).json({
        message: "Admin signed up successfully",
        token
    })
    }catch(e){
      res.status(500).json({
        message : "internal server error"
    })
    }
})

router.post("/signin",async(req,res)=>{
    const result = signinSchema.safeParse(req.body);
    if(!result.success){
        return res.send("admin not found");
    }
    const {email , password} = result.data;
    try{
        const loginAdmin = await Admin.findOne({email:email})
        if(!loginAdmin){
           return res.send("admin not found")
        }
         const isMatch = await bcrypt.compare(
            password,
            loginAdmin.password
         );
         if(!isMatch){
            return res.send("password is incorrect");
         }
         const token = jwt.sign(
         {
             AdminId: loginAdmin._id
         },
         process.env.JWT_SECRET
         );      
         res.status(200).json({
             message: "user signed-in",
             token
         })
    }catch{
        return res.status(500).json({
        message: "Internal Server Error"
    });
    }
})


module.exports = router;