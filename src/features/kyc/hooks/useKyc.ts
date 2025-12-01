import type { PersonalInfoPayload } from "@/features/kyc/types";
import api from "@/lib/axios";
import { useAppDispatch } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { type AxiosError, type AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { completeStep1, completeStep2 } from "../kycSlice";

export function useKyc() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

     const uploadPersonalInformation = useMutation<
        AxiosResponse<any>,
        AxiosError,
        PersonalInfoPayload>
    ({
        mutationFn: (data) => api.post("/kyc/submit", data),
        onSuccess: () => {
            dispatch(completeStep1())
            toast.info("Saved!")
            navigate("/kyc/upload-document");
        },
        onError: (error: AxiosError) => {
            toast.error(error.message)
        }
    })

    const uploadDocument = useMutation<
        AxiosResponse<any>,
        AxiosError,
        FormData>
    ({
        mutationFn: (formData: FormData) => {
            return api.post("/kyc/document/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        },
        onSuccess: () => {
            dispatch(completeStep2())
            toast.success("KYC information uploaded successfully! Verification processing...")
            navigate("/dashboard")
        },
        onError: (error: AxiosError) => toast.error(error.message)
    })

    return {
        uploadDocument,
        uploadPersonalInformation
    }
    
}