const express = require("express");
const router = express.Router();
const signupSchema = require("/schemas/user")
router.get("/",(req,res)=>{
    res.send("user router");
})

router.post("/signup",(req,res)=>{
    const {name,email,password} = req.body;
   const result =  signupSchema.safeParse(req.body);
   console.log(result);
//    if(result != true){
//     res.send("enter valid input");
//     return
//    }
    res.send("user signedup")
})
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