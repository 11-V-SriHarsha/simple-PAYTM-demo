const z = require('zod')

const usernameSchema = z.string().email() 

const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" });

const nameSchema = z.string()


const signUpSchema = z.object({
    username: usernameSchema,
    password: passwordSchema,
    firstName: nameSchema,
    lastName: nameSchema
})

const signInSchema = z.object({
    username: usernameSchema,
    password: passwordSchema
})

const updatedSchema = z.object({
    password: passwordSchema.optional(),
    firstName: nameSchema.optional(),
    lastName: nameSchema.optional()
}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided"
});

const transferSchema = z.object({
    to: z.string().min(1, "Recipient userId is required"),
    amount: z.number().positive("Amount must be greater than 0")
});

module.exports = {
    signUpSchema,
    signInSchema,
    updatedSchema,
    transferSchema
}