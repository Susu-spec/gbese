import  { type ColumnFiltersState, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table"
import { useUser } from "../../dashboard/hooks/useUser"
import CustomTable from "@/components/shared/table/CustomTable";
import { AlertTriangle, LoaderIcon, PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FilterDialog } from "./FilterDialog";
import { TransactionColumns } from "./TransactionColumns";


export default function TransactionHistoryTable() {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [filters, setFilters] = useState({
        status: "all-status",
        category: "all_categories"
    });

    const { transactionQuery } = useUser();
    const { data, isError, isLoading, refetch } = transactionQuery;
    const transactions = data?.data.transactions || [];

    const table = useReactTable({
        data: transactions,
        columns: TransactionColumns,
        state: {
            columnFilters
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })



    const handleFilterChange = (filterType: "status" | "category", value: string) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
        
        const newFilters: ColumnFiltersState = [];
        const updatedFilters = { ...filters, [filterType]: value };

        if (updatedFilters.status !== "all-status") {
            newFilters.push({ id: "status", value: updatedFilters.status });
        }

        if (updatedFilters.category !== "all_categories") {
            newFilters.push({ id: "type", value: updatedFilters.category });
        }
        
        setColumnFilters(newFilters);
    };
    
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="bg-gbese-white py-5 px-4 flex flex-col gap-9 rounded-md">
                <div className="px-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-primary-950">
                        {new Date().toLocaleString("en-US", { month: "long" })}
                    </h1>

                    <FilterDialog
                        currentFilter={filters}
                        onFilterChange={handleFilterChange}
                    />
                </div>

                <div className="min-h-37.5 flex items-center justify-center">
                    {isLoading && (
                        <div className="py-10 w-full flex items-center justify-center">
                            <LoaderIcon className="size-8 animate-spin" />
                        </div>
                    )}

                    {isError && (
                        <div className="flex flex-col items-center gap-3 py-10">
                            <AlertTriangle className="text-red-500" size={32} />
                            <p className="text-sm text-gray-600">We couldn't load your data.</p>
                            <Button onClick={() => refetch()}>Tap to Retry</Button>
                        </div>
                    )}


                    {!isLoading &&
                    !isError &&
                    table.getFilteredRowModel().rows.length === 0 && (
                        <div className="flex flex-col items-center gap-3 py-10">
                            <PackageX size={32} className="text-primary-500" />
                            <p className="text-sm text-gray-600">
                                No transactions match your filters.
                            </p>
                        </div>
                    )}

                    {!isLoading &&
                    !isError &&
                    table.getFilteredRowModel().rows.length > 0 && (
                        <CustomTable table={table} />
                    )}
                </div>
            </div>
        </div>
    )
}