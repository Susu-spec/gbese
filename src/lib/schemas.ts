import * as z from "zod"
import { isValidPhoneNumber, parsePhoneNumberWithError } from "libphonenumber-js";

export const phoneSchema = z.string()
    .refine((val) => isValidPhoneNumber(val), {
        message: "Invalid phone number"
    })
  .transform((val) => parsePhoneNumberWithError(val).formatInternational());


export const phoneWithCountrySchema = z.string()
  .refine((val) => isValidPhoneNumber(val, 'NG'), {
    message: "Enter phone number in this format, e.g., 234812345678"
});

