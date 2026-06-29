const express = require("express");
const router = express.Router();
const signupSchema = require("../schemas/user");
const { error } = require("node:console");
router.get("/",(req,res)=>{
    res.send("user router");
})

router.post("/signup", (req, res) => {
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
    // 2. Hash the password
    // 3. Save user to database
    // 4. Generate JWT

    res.status(201).json({
        message: "User signed up successfully"
    });
});
router.post("/signin",(req,res)=>{

    res.send("user signed-in")
})

router.get("/courses",(req,res)=>{


})

router.post("/purchase",(req,res)=>{


})
router.get("/purchases",(req,res)=>{

})
module.exports = router;