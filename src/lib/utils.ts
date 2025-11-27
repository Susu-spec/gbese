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

// Helper function to format date
export const formatDate = (dateValue: string | number | Date): string => {
  try {
    const date = new Date(dateValue);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    // Format options
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return date.toLocaleDateString('en-US', options);
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid Date';
  }
};

/**
 * Safely parse balance from API (handles string | number | null | undefined)
 * Prevents runtime crashes from unexpected API data types
 */
export function parseBalance(value: string | number | null | undefined): number {
  if (value === null || value === undefined || value === '') return 0;
  const parsed = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Transaction type mapping for consistent UI across features
 * Use this when teammates implement withdrawal, debt payments, etc.
 */
export const TRANSACTION_TYPES = {
  deposit: { label: 'Deposit', color: 'text-gbese-success' },
  withdrawal: { label: 'Withdrawal', color: 'text-gbese-warning' },
  debt_payment: { label: 'Debt Payment', color: 'text-primary-800' },
  transfer: { label: 'Transfer', color: 'text-primary-600' },
  refund: { label: 'Refund', color: 'text-gbese-success' },
} as const;

export type TransactionType = keyof typeof TRANSACTION_TYPES;
