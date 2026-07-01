const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
title :{
    type: String,
    required : true
},
description:{
type: String,
required : true
},
price:{
    type:Number,
    required: true
},
image:{
  type: String,
    default: ""
},
createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
},
isPublished: {
    type: Boolean,
    default: true
}

})

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;