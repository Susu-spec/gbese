import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleApiError(error: any) {
  const status = error?.response?.status;
  const message = error?.response?.data?.message;

  if (message) {
    toast.error(message);
    return;
  }

  switch (status) {
    case 400:
      toast.error("Invalid email or password");
      break;
    case 401:
      toast.error("Incorrect credentials");
      break;
    case 403:
      toast.error("Account locked");
      break;
    case 404:
      toast.error("Resource not found");
      break;
    case 500:
      toast.error("Server error. Please try again later");
      break;
    default:
      toast.error("Something went wrong");
      break;
  }
}
