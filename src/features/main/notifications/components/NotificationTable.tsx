import { Button } from "@/components/ui/button"
import { useNotifs } from "../hooks";
import NotificationCard from "./NotificationCard";
import type { NotificationProps } from "../../types";


const NotificationTable = () => {
    const {notificationsQuery} = useNotifs()
    const isLoading = notificationsQuery.isLoading;
    const notifications = notificationsQuery.data?.data;

    return (
        <div className="mt-6 bg-white rounded-xl p-4">
            <div className="flex justify-between items-center p-2">
                <div>
                    <h2 className="text-2xl text-gbese-black font-semibold">Notification Alert</h2>
                    <p>You have one unread notification</p>
                </div>
                <Button>Mark all as read</Button>
            </div>
            {!isLoading && notifications.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {notifications.map((notification: NotificationProps) => (
                        <NotificationCard key={notification.id} notificationProps={notification} />
                    ))}
                </div>
            ) : (
                <p>Loading notifications...</p>
            )}
        </div>
    )
}

export default NotificationTable;