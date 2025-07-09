import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import {
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
} from 'lucide-react';
import Table from './TableComponent';

type Pokemon = {
    name: string;
    url: string;
}

type Props = {
  data: Pokemon[];
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isFiltered: boolean,
  onRowClick: (name: string) => void;
};

const PokemonTable = ({data, pageCount, currentPage, onPageChange, isFiltered, onRowClick}: Props) => {
    const [sorting, setSorting] = useState([]);

    const columns: ColumnDef<Pokemon, any>[] = React.useMemo(
        () => [
        {
            accessorKey: 'name',
            header:  ({ column }) => {
                const isSorted = column.getIsSorted();

                return (
                    <button
                    onClick={() => column.toggleSorting(isSorted === 'asc')}
                    className="flex items-center space-x-1 group text-sm font-medium"
                    >
                    <span className='font-bold'>Name</span>
                    {isSorted === 'asc' && <ArrowUp size={16} className="text-gray-600" />}
                    {isSorted === 'desc' && <ArrowDown size={16} className="text-gray-600" />}
                    {!isSorted && <ChevronsUpDown size={16} className="text-gray-400 group-hover:text-gray-600" />}
                    </button>
                );
                },
            cell: (info: any) => <span className="capitalize">{info.getValue()}</span>,
        }],
        []
    );

    const table = useReactTable({
        data, 
        columns, 
        pageCount, 
        state: {
            pagination: {
                pageIndex: currentPage-1,
                pageSize: 20
            },
            sorting,
        },
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onPaginationChange: (updater) => {
            let nextPage = 0;
            if(typeof updater === 'function') {
                nextPage = updater(currentPage-1);
            } else {
                nextPage = updater;
            }
            onPageChange(nextPage+1);
        }
    });

    return (
      <div className="flex flex-col max-h-[85vh]">
        {/* Table with fixed header and scrollable body */}
        <Table table={table} onRowClick={(row) => onRowClick(row.name)} />


        {/* Pagination Controls */}
        {!isFiltered && (
          <div className="mt-2 flex justify-end items-center space-x-4 text-sm text-gray-700">
            <span>
              Page <strong>{currentPage}</strong> of <strong>{pageCount}</strong>
            </span>

            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border ${
                currentPage === 1
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 hover:bg-blue-600 hover:text-white hover:font-bold'
              }`}
            >
              Prev
            </button>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === pageCount}
              className={`px-3 py-1 rounded border ${
                currentPage === pageCount
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 hover:bg-blue-600 hover:text-white hover:font-bold'
              }`}
            >
              Next
            </button>
          </div>
        )}
    </div>
  )
}

export default PokemonTable;