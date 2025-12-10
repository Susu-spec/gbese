import type { NotificationProps } from "@/features/main/types";
import { timeAgo } from "@/lib/utils";
import { AlertCircle, ArrowUpRight } from "lucide-react";
import type { ElementType } from "react";

type AlertType = "system_announcement" | "payment_due" | "system_alert";

const typeConfig: Record<
  AlertType,
  { icon: ElementType; background: string, iconCol: string }
> = {
  system_alert: {
    icon: AlertCircle,
    background: "bg-[#FFF5D6]",
    iconCol: "text-[#9C6D00]",
  },
  payment_due: {
    icon: ArrowUpRight,
    background: "bg-[#E3F5E7]",
    iconCol: "text-gbese-success",
  },
  system_announcement: {
    icon: AlertCircle,
    background: "bg-[#FFF5D6]",
    iconCol: "text-[#9C6D00]",
  },
};

// fallback config for unknown types
const fallbackConfig = {
    icon: AlertCircle,
    background: "bg-white",
    iconCol: "text-gray-500",
};

const NotificationCard = ({
  notificationProps,
}: {
  notificationProps: NotificationProps;
}) => {
    const { type, title, message, created_at } = notificationProps;

    const config =
        typeConfig[type as AlertType] ?? fallbackConfig; 

    const Icon = config.icon;

    return (
        <div className="w-full">
            <div className={`p-3 rounded-lg flex items-center gap-3  `}>
                <div className={`p-2 ${config.background} rounded-full flex items-center justify-center`}>
                <Icon className={`w-8 h-8 ${config.iconCol}`} />
                </div>

                <div className="flex flex-col gap-6 w-full">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-2xl">{title}</h3>
                        <p>{timeAgo(created_at!)}</p>
                    </div>
                    
                    <p className="text-lg text-gray-600">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default NotificationCard;
