import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications } from "./services";
import api from "@/lib/axios";
import { toast } from "sonner";

export function useNotifs(){

    const notificationsQuery = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
        staleTime: 1000 * 60 * 5,
    });

    return {notificationsQuery};
}

export function useMarkAllRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await api.put("/analytics/notifications/read-all");
      return res.data;
    },

    onSuccess: () => {
      toast.success("All notifications marked as read");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },

    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Unable to mark notifications as read.";
      toast.error(message);
    },
  });
}
