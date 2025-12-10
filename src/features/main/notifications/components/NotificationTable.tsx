import { Button } from "@/components/ui/button"
import { useMarkAllRead, useNotifs } from "../hooks";
import NotificationCard from "./NotificationCard";
import type { NotificationProps } from "../../types";
import { Bell } from "lucide-react";


const NotificationTable = () => {
    const {notificationsQuery} = useNotifs()
    const { mutate: markAllRead, isPending } = useMarkAllRead();
    const isLoading = notificationsQuery.isLoading;
    const notifications = notificationsQuery.data?.data || [];

    const unreadNotifications = notifications.filter((n: NotificationProps) => !n.is_read);
    const readNotifications = notifications.filter((n: NotificationProps) => n.is_read);

    const noNotifications =
    notifications.length === 0 ||
    notifications.length === readNotifications.length;

    return (
        <div className="mt-6 bg-white rounded-xl p-4">
            <div className="flex justify-between items-center p-2">
                <div>
                    <h2 className="text-2xl text-gbese-black font-semibold">Notification Alert</h2>
                    <p>You have {unreadNotifications.length} unread notification</p>
                </div>
                <Button onClick={() => markAllRead()} disabled={isPending}>Mark all as read</Button>
            </div>
            {!isLoading && !noNotifications ? (
                <div className="flex flex-col gap-4">
                    {notifications.map((notification: NotificationProps) => (
                        <NotificationCard key={notification.id} notificationProps={notification} />
                    ))}
                </div>
            ) : (
                <div className="mx-auto flex justify-center items-center flex-col text-center">
                    <Bell size={200} fill="#ccc0c0ff" stroke="#ccc0c0ff" className="rotate-45"/>
                    <p>No Notifications</p>
                </div>
            )}
        </div>
    )
}

export default NotificationTable;