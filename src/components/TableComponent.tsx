import React from 'react';
import {
  flexRender,
  Table as ReactTable,
} from '@tanstack/react-table';

type TableProps<T> = {
  table: ReactTable<T>;
  onRowClick?: (row: T) => void;
};

function TableComponent<T>({ table, onRowClick }: TableProps<T>) {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden flex-1 flex flex-col">
      <table className="min-w-full table-fixed">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b border-gray-300 p-2 text-left text-sm font-semibold"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
      </table>

      <div className="overflow-y-auto flex-1">
        <table className="min-w-full table-fixed">
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-200 hover:bg-gray-100 hover:font-bold cursor-pointer"
                onClick={() => onRowClick && onRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 text-sm">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableComponent;
