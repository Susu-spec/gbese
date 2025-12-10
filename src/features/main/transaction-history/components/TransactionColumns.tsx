import { TransactionStatusMap } from "@/lib/utils";
import type { ColumnDef, Row } from "@tanstack/react-table";
import type { TransactionDataType } from "../../types";
import { DetailsDialog } from "./DetailsDialog";
import { format } from "date-fns";

export const TransactionColumns: ColumnDef<TransactionDataType>[] = [
    {
        accessorKey: "sender.name",
        header: "Name",
        cell: ({ row }: { row: Row<TransactionDataType> }) => <span className="capitalize">{row.original.sender?.name ?? "Account Name"}</span>
    },
     {
        accessorKey: "completed_at",
        header: "Date",
        cell: ({ row }: { row: Row<TransactionDataType> }) => <span>{format(new Date(row.original.completed_at), 'MM-dd-yyyy hh:mm a')}</span>
    },
     {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }: { row: Row<TransactionDataType> }) => <span>{`N${(+row.original.amount).toLocaleString()}`}</span>
    },
    {
        accessorKey: "type",
        header: "Category",
        cell: ({ row }: { row: Row<TransactionDataType> }) => <span>{row.original.type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</span>
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: Row<TransactionDataType> }) => {
            const status = row.getValue("status");
            const { text, color } = TransactionStatusMap[status as "completed" | "pending" | "failed" | "processing"]

            return (
                <span style={{ color: color }} className="text-xs">{text}</span>
            )
        }
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }: { row: Row<TransactionDataType> }) => <DetailsDialog referenceNumber={row.original.reference_number} />
    },
    
]