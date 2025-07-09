import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import Table from './TableComponent';

type EvolutionTrigger = {
  name: string;
  url: string;
};

const EvolutionTriggerTable = () => {
  const [data, setData] = useState<EvolutionTrigger[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  const pageCount = Math.ceil(totalCount / pageSize);

  // Fetch evolution triggers client-side
  useEffect(() => {
    const fetchData = async () => {
      const offset = (currentPage - 1) * pageSize;
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/evolution-trigger?limit=${pageSize}&offset=${offset}`);
        const json = await res.json();
        setData(json.results);
        setTotalCount(json.count);
      } catch (err) {
        console.error('Failed to fetch evolution triggers:', err);
      }
    };

    fetchData();
  }, [currentPage]);

  const columns = React.useMemo<ColumnDef<EvolutionTrigger>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Evolution Trigger',
        cell: (info) => <span className="capitalize">{info.getValue()}</span>,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      let nextPage = 0;
      if (typeof updater === 'function') {
        nextPage = updater(currentPage - 1);
      } else {
        nextPage = updater;
      }
      setCurrentPage(nextPage + 1);
    },
  });

  return (
    <div className="mt-6 flex flex-col max-h-[70vh]">
      <h2 className="text-xl font-semibold mb-3">Evolution Triggers</h2>
      <Table table={table} />

      <div className="mt-2 flex justify-end items-center space-x-4 text-sm text-gray-700">
        <span>
          Page <strong>{currentPage}</strong> of <strong>{pageCount}</strong>
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
          onClick={() => setCurrentPage((p) => p + 1)}
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
    </div>
  );
};

export default EvolutionTriggerTable;
