const {z} = require("zod")

const signupSchema = z.object({
    name: z.string().min(3),
email : z.string().email(),
password: z.string().min(4)
})

const signinSchema = z.object({
email : z.string().email(),
password: z.string().min(4)
})
module.exports = {
    signupSchema,
    signinSchema
};