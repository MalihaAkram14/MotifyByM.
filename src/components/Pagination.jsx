import React from "react";

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  // if (totalPages <= 1) return null;

  const handlePrev = () => {
    const prevPage = currentPage - 1 < 1 ? totalPages : currentPage - 1;
    goToPage(prevPage);
  };

  const handleNext = () => {
    const nextPage = currentPage + 1 > totalPages ? 1 : currentPage + 1;
    goToPage(nextPage);
  };

  return (
    <div className="flex justify-center mt-6 gap-2 flex-wrap">
      <button
        className="px-3 py-1 border rounded hover:bg-gray-200"
        onClick={handlePrev}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => goToPage(index + 1)}
          className={`px-3 py-1 border rounded hover:bg-gray-200 ${
            currentPage === index + 1 ? "bg-black text-white" : "bg-white"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="px-3 py-1 border rounded hover:bg-gray-200"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
