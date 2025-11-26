import { 
    BillPaymentsIcon, 
    CreditOptionsIcon, 
    DashboardIcon, 
    DebtRequestsIcon, 
    // FinancialHealthIcon, 
    FundWalletIcon, 
    MyDebtsIcon, 
    // RewardsIcon, 
    SchedulePaymentIcon, 
    TransactionHistoryIcon, 
    // WealthIndexIcon, 
    WithdrawFundsIcon 
} from "@/components/shared/sidebar-icons";
import type { AppRoute } from "@/utils/types";
import { Bell, User } from "lucide-react";

export const protectedRoutes: AppRoute[] = [
    { 
        path: "dashboard", 
        label: "Dashboard",
        icon: DashboardIcon,
        showInSidebar: true,
        async lazy() {
            const module = await import("@/pages/main/dashboard");
            return { Component: module.default }
        }
    },
    {
        path: "my-debts",
        label: "My Debts",
        icon: MyDebtsIcon,
        showInSidebar: true,
        async lazy() {
            const module = await import("@/pages/main/my-debts");
            return { Component: module.default }
        }
    },
    {
        path: "fund-wallet",
        label: "Fund Wallet",
        icon: FundWalletIcon,
        showInSidebar: true,
        async lazy() {
            const module = await import("@/pages/main/fund-wallet");
            return { Component: module.default }
        }
    },
    {
        path: "withdraw-funds",
        label: "Withdraw Funds",
        icon: WithdrawFundsIcon,
        showInSidebar: true,
        async lazy() {
            const module = await import("@/pages/main/withdraw-funds");
            return { Component: module.default }
        }
    },
    {
        path: "credit-options",
        label: "Credit Options",
        icon: CreditOptionsIcon,
        showInSidebar: true,
        async lazy() {
            const module = await import("@/pages/main/credit-options");
            return { Component: module.default }
        }
    },
    {
        path: "credit-options/apply/:providerId",
        showInSidebar: false,
        async lazy() {
            const module = await import("@/pages/main/credit-options/apply-loan");
            return { Component: module.default }
        }
    },
    {
        path: "bill-payment",
        label: "Bill Payment",
        icon: BillPaymentsIcon,
        showInSidebar: true,
        async lazy() {
            const module = await import("@/pages/main/bill-payment");
            return { Component: module.default }
        }
    },
    {
        path: "schedule-payment",
        label: "Schedule Payment",
        icon: SchedulePaymentIcon,
        showInSidebar: true,
        async lazy() {
            const module = await import("@/pages/main/schedule-payment");
            return { Component: module.default }
        }
    },
    {
        path: "transaction-history",
        label: "Transaction History",
        icon: TransactionHistoryIcon,
        showInSidebar: true,
        async lazy() {
            const module = await import("@/pages/main/transaction-history");
            return { Component: module.default }
        }
    },
    {
        path: "debt-requests",
        label: "Debt Requests",
        icon: DebtRequestsIcon,
        showInSidebar: true,
        async lazy() {
            const module = await import("@/pages/main/debt-requests");
            return { Component: module.default }
        }
    },
    // {
    //     path: "rewards",
    //     label: "Rewards",
    //     icon: RewardsIcon,
    //     async lazy() {
    //         const module = await import("@/pages/main/rewards");
    //         return { Component: module.default }
    //     }
    // },
    // {
    //     path: "financial-health",
    //     label: "Financial Health",
    //     icon: FinancialHealthIcon,
    //     async lazy() {
    //         const module = await import("@/pages/main/financial-health");
    //         return { Component: module.default }
    //     }
    // },
    // {
    //     path: "wealth-index",
    //     label: "Wealth Index",
    //     icon: WealthIndexIcon,
    //     async lazy() {
    //         const module = await import("@/pages/main/wealth-index");
    //         return { Component: module.default }
    //     }
    // },
    {
        path: "profile",
        label: "Profile",
        icon: User,
        showInSidebar: false,
        async lazy() {
            const module = await import("@/pages/main/profile");
            return {Component: module.default}
        }
    },
    {
        path: "notifications",
        label: "Notifications",
        icon: Bell,
        showInSidebar: false,
        async lazy() {
            const module = await import("@/pages/main/notifications");
            return {Component: module.default}
        }
    }
]