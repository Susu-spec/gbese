import api from "@/lib/axios";

export async function getActiveDebts() {
    const response = await api.get("/debt/obligations");
    return response.data;
}

export async function getTransferredDebts(){
    const response = await api.get("/dtp/requests/outgoing");
    return response.data;
}

