import api from "@/lib/axios";

export async function getNotifications() {
    const response = await api.get("/analytics/notifications");
    return response.data;
}