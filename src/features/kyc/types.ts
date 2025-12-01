
export interface PersonalInfoFormValues {
  dob: Date | null;
  country: string;
  city: string;
  state: string;
  occupation: string;
  gender: string;
  address: string;
  postalCode: string;
};


export interface IdentityDocumentFormValues {
  documentType: string;
  file: File | null;
}

export interface PersonalInfoPayload {
    date_of_birth: string;
    country: string;
    city: string;
    state: string;
    occupation: string;
    gender: string;
    address: string;
    postal_code: string;
}

export interface IdentityDocumentPayload {
  document_type: string;
  file: File | null;
}