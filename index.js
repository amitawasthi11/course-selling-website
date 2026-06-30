require("dotenv").config();
// const { log } = require("console");
const express = require("express");
const app = express();
const connectDB = require("./db")
connectDB();
app.use(express.json());

const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");

app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/user",userRouter);
app.use("/admin",adminRouter);



app.listen(3000,()=>{
    console.log("server is running at port 3000")
})