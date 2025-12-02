import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "./services";

export function useNotifs(){

    const notificationsQuery = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
        staleTime: 1000 * 60 * 5,
    });

    return {notificationsQuery};
}