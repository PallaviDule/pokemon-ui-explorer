import PaginationButton from './PaginationButton';

type Props = {
  currentPage: number;
  pageCount: number;
  onPageChange: (newPage: number) => void;
};

const TableFooter = ({ currentPage, pageCount, onPageChange }: Props) => {
  return (
    <div className="mt-2 flex justify-end items-center space-x-4 text-sm text-gray-700">
      <span>
        Page <strong>{currentPage}</strong> of <strong>{pageCount}</strong>
      </span>

      <PaginationButton
        label="Prev"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      />

      <PaginationButton
        label="Next"
        onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}
        disabled={currentPage === pageCount}
      />
    </div>
  );
};

export default TableFooter;
