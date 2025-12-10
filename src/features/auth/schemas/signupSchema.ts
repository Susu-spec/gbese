import { phoneWithCountrySchema } from "@/lib/schemas";
import * as z from "zod";

export const signupSchema = z.object({
    email: z.email().min(1, { message: "Please input a valid email address" }),
    firstName: z.string().min(1, { message: "Please input your first name" }),
    lastName: z.string().min(1, { message: "Please input your last name" }),
    phoneNumber: phoneWithCountrySchema,
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
        .regex(/^\S*$/, "Password cannot contain spaces")
})