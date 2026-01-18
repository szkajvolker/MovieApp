import { useState } from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  const [localSearchInput, setLocalSearchInput] = useState(searchTerm);
  return (
    <div className="search">
      <div>
        <input
          type="text"
          placeholder="Search trough movies from database"
          value={localSearchInput}
          onChange={(e) => setLocalSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchTerm(localSearchInput);
            }
          }}
        />
        <button
          onClick={() => {
            setSearchTerm(localSearchInput);
          }}
        >
          <img
            src="search.svg"
            alt="search"
            className="hover:scale-130 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default Search;
