import NotificationTable from "@/features/main/notifications/components/NotificationTable";
import { Bell } from "lucide-react";


const Notifications = () => {
    return (
        <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col gap-1.5 md:gap-2">
                <h1 className="font-sora text-primary-800 font-semibold text-xl md:text-3xl flex gap-2 items-center">
                    Notifications Alert(s) <Bell size={24} /> 
                </h1>
                <p className="text-sm md:text-base text-primary-950 leading-7.5">
                    Instant Alert for all your financial movements
                </p>
            </div>
            <div className="bg-gbese-neutrals-400 px-8 py-6 rounded-xl shadow-[0px_4px_10px_3px_#02134614] border border-[#5A78E180] flex flex-col gap-2.5">
                <p className="text-2xl leading-9 font-medium">Stay Updated</p>
                <p className="text-sm lg:text-xl leading-[140%] lg:leading-7.5 text-black">
                    Enable push notifications to get real-time alerts about your financial activities. 
                    We’ll notify you about upcoming payments, new debts, and important account activity.
                </p>
            </div>
            <NotificationTable />
        </div>
    )
}

export default Notifications;