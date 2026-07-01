const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const courseSchema = require("../schemas/course")
const Course = require("../models/course");
const {
    signupSchema,
    signinSchema
} = require("../schemas/admin");
const Admin = require("../models/admin");
const { safeParse } = require("../schemas/user");
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
             userId: loginAdmin._id
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

// creating course 
router.post("/create-course", adminAuth, async (req, res) => {

});

router.post("/create-course", authMiddleware,async(req,res)=>{
    const result =  courseSchema.safeParse(req.body);
    if(!result.success){
    return res.status(400).json({
    message: "Invalid input",
    errors: result.error.issues
});
    }
    const {title,description,price,image} = result.data;
    try{
      const course = await Course.create({
    title,
    description,
    price,
    image,
    createdBy: req.adminId
   });
    return res.status(201).json({
    message: "Course created successfully",
    course
     });

    }catch(e){
        return res.status(500).json({
       message: e.message
    });
    }
})


module.exports = router;