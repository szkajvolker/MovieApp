const Pagination = ({ currentPage, onPrev, onNext, totalPages, onKeyDown }) => {
  return (
    <div className="flex justify-center items-center gap-10 mt-5 mb-5">
      <button
        className={`text-white font-bold border-2 border-gray-900 rounded-xl p-2 ${currentPage !== 1 && "hover:bg-gray-800"} cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
        toggle="prev"
        onClick={onPrev}
        disabled={currentPage <= 1}
      >
        Prev
      </button>
      <span className="text-white bg-gray-800 px-3 py-1 rounded">
        Page {currentPage} / {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-white text-sm">Go to:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          onKeyDown={onKeyDown}
          defaultValue={currentPage}
          className="w-16 px-2 py-1 text-center text-black rounded border border-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <button
        className={`text-white font-bold border-2 border-gray-900 rounded-xl p-2 ${currentPage !== totalPages && "hover:bg-gray-800"} cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
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
