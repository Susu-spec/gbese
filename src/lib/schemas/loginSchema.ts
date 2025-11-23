import * as z from "zod";


export const loginSchema = z.object({
    email: z.email().min(1, { message: "Please input a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters"})
})