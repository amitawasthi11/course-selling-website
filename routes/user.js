const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Course = require("../models/course");
const {signupSchema, signinSchema} = require("../schemas/admin");
router.get("/",(req,res)=>{
    res.send("user router");
})

router.post("/signup", async(req, res) => {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: result.error.issues
        });
    }

    const { name, email, password } = result.data;

    // Next steps (we'll implement these later):
    // 1. Check if user already exists
   try{ 
    const existingUser = await User.findOne({ email: email })
    if(existingUser){
        return res.status(409).json({
           message: "user already exist"
    })
    }
    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // 3. Save user to database
    const newUser = await User.create({
        name,
        email,
        password : hashedPassword
    });
    // 4. Generate JWT
    const token = jwt.sign(
    {
        userId: newUser._id
    },
    process.env.JWT_SECRET

);
    res.status(201).json({
        message: "User signed up successfully",
        token
    })
   }catch(e){
    res.status(500).json({
        message : "internal server error"
    })
   }

});
router.post("/signin",async(req,res)=>{
    const result = signinSchema.safeParse(req.body);
     if (!result.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: result.error.issues
        });
    }

     const {email, password} = result.data;
     try{
        const loginUser =await User.findOne({email : email})
      if(!loginUser){
     res.send("user not found");
     return;
      }
    const isMatch = await bcrypt.compare(
    password,
    loginUser.password
     );
      if (!isMatch) {
    return res.status(401).json({
        message: "Invalid credentials"
    });
}
const token = jwt.sign(
{
    userId: loginUser._id
},
process.env.JWT_SECRET
);      
res.status(200).json({
    message: "user signed-in",
    token
})
}catch(e){
    return res.status(500).json({
        message: "Internal Server Error"
    });
}

})

router.get("/courses",async(req,res)=>{
    try{
const courses = await Course.find({
    isPublished : true
});
return res.status(200).json(courses) 
    }catch(e){
      return res.status(500).json({
            message: "Internal Server Error"
        });
    }
})

router.post("/purchase",(req,res)=>{


})
router.get("/purchases",(req,res)=>{

})
module.exports = router;