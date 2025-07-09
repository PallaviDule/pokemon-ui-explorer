type PaginationButtonProps = {
  label: string;
  onClick: () => void;
  disabled: boolean;
};

const PaginationButton = ({ label, onClick, disabled }: PaginationButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1 rounded border ${
        disabled
          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
          : 'border-gray-300 hover:bg-blue-600 hover:text-white hover:font-bold'
      }`}
    >
      {label}
    </button>
  );
};

export default PaginationButton;
