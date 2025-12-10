import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
    flexRender,
    type Table as TableType,
} from "@tanstack/react-table";

export default function CustomTable({ table }: { table: TableType<any>}) {
    return (
        <div className="w-full flex flex-col gap-4">
            <Table className="border border-separate border-spacing-y-8 border-spacing-x-4 rounded-md">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow className="border-0! hover:bg-inherit" key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className="border-0 hover:bg-inherit"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="hover:bg-inherit">
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}