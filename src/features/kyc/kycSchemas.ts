import { phoneWithCountrySchema } from "@/lib/schemas";
import z from "zod";

export const addressSchema = z.object({
    street: z.string().min(1, 'Street is required'),
    number: z.string().min(1, 'House number is required'),
    town: z.string().min(1, 'Town is required'),
    state: z.string().min(1, 'State is required'),
})


export const identityDocumentSchema = z.object({
  documentType: z.string(),
  file: z
    .custom<File>()
    .refine((f) => f instanceof File, "A file is required")
    .nullable(),
})


export const personalInfoSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.email().min(1, 'Email is required'),
    dob: z.string().min(1, 'Date of Birth is required'),
    phoneNumber: phoneWithCountrySchema,
    address: addressSchema
})