import { useMarkAllRead, useNotifs } from "../hooks";
import NotificationCard from "./NotificationCard";
import type { NotificationProps } from "../../types";
import { Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ToWords } from "to-words";


const NotificationTable = () => {
    const toWords = new ToWords();

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
        <div className="bg-white rounded-xl flex flex-col">
            <div className="flex justify-between items-center p-8">
                <div className="flex flex-col gap-1 lg:gap-2">
                    <h2 className="font-sora text-base lg:text-2xl text-gbese-black font-semibold leading-9">
                        Notifications
                    </h2>
                    <p className="text-xs lg:text-lg leading-5.25 text-gbese-grey-600 ">
                        You have <span className="lowercase">
                            {toWords.convert(unreadNotifications.length)}
                        </span> unread notification(s)
                    </p>
                </div>
                <button 
                    onClick={() => markAllRead()} 
                    disabled={isPending} 
                    className="px-4 rounded-[5px] lg:rounded-xl py-2 border border-gbese-neutrals-200 text-xs lg:text-base leading-7.5"
                >
                    Mark all as read
                </button>
            </div>
            <Separator className="text-gbese-neutrals-200" />
            {!isLoading && !noNotifications ? (
                <div className="flex flex-col gap-4 lg:mt-10 px-2 lg:px-10">
                    {notifications.map((notification: NotificationProps) => (
                        <NotificationCard key={notification.id} notificationProps={notification} />
                    ))}
                </div>
            ) : (
                <div className="mx-auto mb-10 flex justify-center items-center flex-col text-center">
                    <Bell size={200} fill="#ccc0c0ff" stroke="#ccc0c0ff" className="rotate-45"/>
                    <p>No Notifications</p>
                </div>
            )}
        </div>
    )
}

export default NotificationTable;