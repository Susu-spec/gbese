/**
 * Keeps track of all available steps
 * in the KYC flow
 */
export const kycSteps = [
    {
        id: "1",
        title: "Personal Info",
        path: "personal-info",
        description: "Enter your name, email and phone number."
    },
    {
        id: "2",
        title: "Identity Document",
        path: "upload-document",
        description: "Upload a valid government ID."
    }
]