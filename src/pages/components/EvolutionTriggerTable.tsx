import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import Table from './TableComponent';
import TableFooter from './TableFooter';

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

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-6 flex flex-col max-h-[70vh]">
      <h2 className="text-2xl font-bold mb-3 text-blue-700 text-center">Evolution Triggers</h2>
      <div className='border border-gray-300 rounded-md p-2'>
        <Table table={table} />
        <TableFooter
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default EvolutionTriggerTable;
