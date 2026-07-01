
const {z} = require("zod")

const courseSchema = z.object({
title: z.string().min(3),
description: z.string().min(5),
price: z.number(),
image : z.string(),   
})

module.exports = courseSchema;