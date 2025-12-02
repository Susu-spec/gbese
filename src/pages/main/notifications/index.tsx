import NotificationTable from "@/features/main/notifications/components/NotificationTable";
import { Bell } from "lucide-react";


const Notifications = () => {
    return (
        <div>
            <div className="mb-4">
                <h2 className="flex gap-2 text-primary-800 text-4xl items-center">Notifications <Bell/> </h2>
                <p className="text-gbese-black">Instant Alert for all your financial movements</p>
            </div>
            <NotificationTable />
        </div>
    )
}

export default Notifications;