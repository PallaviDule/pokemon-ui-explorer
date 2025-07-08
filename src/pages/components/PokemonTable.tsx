import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import PokemonModal from './PokemonModel';

type Pokemon = {
    name: string;
    url: string;
}

type Props = {
  data: Pokemon[];
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isFiltered: boolean
};

const PokemonModelNew = ({data, pageCount, currentPage, onPageChange, isFiltered}: Props) => {
    const [modalData, setModalData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [sorting, setSorting] = useState([]);

    const columns: ColumnDef<Pokemon, any>[] = React.useMemo(
        () => [
        {
            accessorKey: 'name',
            header:  ({ column }) => (
                <button
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="flex items-center space-x-1"
                >
                <span>Name</span>
                {{
                    asc: '↑',
                    desc: '↓',
                }[column.getIsSorted() as string] ?? '⇅'}
                </button>
            ),
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



    const handleRowClick = async (name: string) => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await res.json();
            setModalData(data);
            setModalOpen(true);
        } catch (err) {
            console.error('Failed to fetch Pokémon details:', err);
        }
    };

    return (
    <div>
        <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <th
                    key={header.id}
                    className="border-b border-gray-300 p-2 text-left text-sm font-semibold"
                    >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map((row) => (
                <tr
                key={row.id}
                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(row.original.name)}
                >
                {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>

        {/* Pagination Controls */}
        { !isFiltered && <div className="mt-4 flex justify-end items-center space-x-4 text-sm text-gray-700">
            {/* Page info */}
            <span>
                Page <strong>{currentPage}</strong> of <strong>{pageCount}</strong>
            </span>

            {/* Prev Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border ${
                currentPage === 1
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
            >
                Prev
            </button>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === pageCount}
                className={`px-3 py-1 rounded border ${
                currentPage === pageCount
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
            >
                Next
            </button>
        </div>}
        {modalData && <PokemonModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            pokemon={modalData}
        />}
    </div>
  );
}

export default PokemonModelNew;