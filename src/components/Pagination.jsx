const Pagination = ({ currentPage, onPrev, onNext, totalPages }) => {
  return (
    <div className="flex justify-center items-center gap-10 mt-5 mb-5">
      <button
        className="text-white font-bold border-2 border-gray-900 rounded-xl p-2 hover:bg-gray-800 cursor-pointer"
        toggle="prev"
        onClick={onPrev}
        disabled={currentPage <= 1}
      >
        Prev
      </button>
      <span className="text-white bg-gray-800 px-3 py-1 rounded">
        Page {currentPage}
      </span>
      <button
        className="text-white font-bold border-2 border-gray-900 rounded-xl p-2 hover:bg-gray-800 cursor-pointer"
        toggle="next"
        onClick={onNext}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
