import { useQuery } from "@tanstack/react-query";
import { getActiveDebts, getTransferredDebts } from "./services";

export function useDebt(){

    const acticeDebtsQuery = useQuery({
        queryKey: ["activeDebts"],
        queryFn: getActiveDebts,
        staleTime: 1000 * 60 * 5,
    });

    const transferredDebtsQuery = useQuery({
        queryKey: ["transferredDebts"],
        queryFn: getTransferredDebts,
        staleTime: 1000 * 60 * 5,
    });

    return {acticeDebtsQuery, transferredDebtsQuery};
}