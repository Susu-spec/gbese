import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from '@tanstack/react-table'
import { useUser } from "../hooks/useUser"
import { Skeleton } from "@/components/ui/skeleton"
import WalletSvg from "@/assets/images/rafiki.svg"
import type { TransactionData } from "../types"
import { formatDate } from "@/lib/utils"

// Define columns for your transactions
const columns: ColumnDef<TransactionData>[] = [
  {
    accessorKey: 'id',
    header: 'Transaction ID',
    cell: ({ row }) => {
      const id = row.getValue('id') as string;
      return <span title={id}>{id.length > 10 ? `${id.substring(0, 10)}...` : id}</span>;
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      return type.charAt(0).toUpperCase() + type.slice(1).split("_").join(" ");
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number;
      return `₦${amount.toLocaleString()}`;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = (row.getValue('status') as string).toLowerCase();
      return (
        <span className={`
          px-2 py-1 rounded-xl text-xs font-medium border capitalize
          ${status === 'completed' ? 'bg-gbese-success text-gbese-green' : ''}
          ${status === 'pending' ? 'bg-[#FFDE5B1A] text-[#F4B60B] border-[#F4B60B]' : ''}
          ${status === 'failed' ? 'bg-[#FF71711A] text-[#F65142] border-[#F65142]' : ''}
        `}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: 'completed_at',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('completed_at'));
      return formatDate(date);
    },
  },
]

export function TableData() {
  const { transactionQuery } = useUser();
  
  const transactions = transactionQuery.data?.data.transactions || [];
  const isLoading = transactionQuery.isPending;
  const isError = transactionQuery.isError;

  const table = useReactTable({ 
    data: transactions, 
    columns, 
    getCoreRowModel: getCoreRowModel() 
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center p-4 text-red-500">
        Failed to load transactions. Please try again.
      </div>
    );
  }

  // Empty state
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col text-center items-center justify-center">
            <img src={WalletSvg} alt="Wallet-svg" />
            <p className="xl:w-92 md:w-72 w-64 text-gbese-grey-100">No transactions yet. Once you start flipping gbese, your history will appear here.</p>
        </div>
    );
  }

  return (
    <Table className="border-separate border-spacing-y-8 border-spacing-x-2 rounded-md">
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        {table.getHeaderGroups().map((hg) => (
          <TableRow key={hg.id} className="hover:bg-inherit!">
            {hg.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.slice(0, 5).map((row) => (
          <TableRow key={row.id} className="border-0 hover:bg-inherit">
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}