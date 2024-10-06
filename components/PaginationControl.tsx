import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControl: React.FC<PaginationControlProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePreviousClick = () => {
    if (currentPage > 0) {
      onPageChange(currentPage);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 2);
    }
  };

  return (
    <div className="mt-4 flex justify-center">
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={handlePreviousClick}
              aria-disabled={currentPage === 0}
              className="disabled:hidden font-semibold text-greenr"
            />
          </PaginationItem>

          {Array.from({ length: totalPages || 0 }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === index}
                onClick={() => onPageChange(index + 1)} // Tambahkan 1 untuk frontend
                className="font-semibold text-greenr">
                {index + 1} {/* Tampilkan halaman sebagai 1-based */}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={handleNextClick}
              aria-disabled={currentPage === totalPages - 1}
              className="disabled:hidden font-semibold text-greenr"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControl;
