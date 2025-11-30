import z from "zod";

export const addressSchema = z.object({
    street: z.string().min(1, 'Street is required'),
    number: z.string().min(1, 'House number is required'),
    town: z.string().min(1, 'Town is required'),
    state: z.string().min(1, 'State is required'),
})


export const identityDocumentSchema = z.object({
  documentType: z.string().min(1, "Document type is required"),
  file: z
    .custom<File>()
    .refine((f) => f instanceof File, "A file is required")
})


export const personalInfoSchema = z.object({
    dob: z.date()
    .max(new Date(), "Date cannot be in the future")
    .nullable()
    .refine(
        (d) => d !== null,
            "Date of birth is required"
        ),
    country: z.string().min(1, "Country is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    state: z.string().min(1, "State is required"),
    gender: z.string().min(1, "Gender is required"),
    occupation: z.string().min(1, "Occupation is required")
})