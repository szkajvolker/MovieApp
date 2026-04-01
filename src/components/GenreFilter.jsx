import genres from "../constants";

const GenreFilter = ({ onGenreSelect, selectedGenres }) => {
  const handleGenreClick = (genre) => {
    const isSelected = selectedGenres.includes(genre.id);
    const canAddMore = selectedGenres.length < 3;

    if (isSelected || canAddMore) {
      onGenreSelect(genre.id);
    }
  };

  return (
    <div className="genre-filter">
      <h3 className="genre-filter-title">
        Filter by Genre ({selectedGenres.length}/3)
      </h3>
      <div className="genre-buttons">
        <button
          className={`genre-btn ${selectedGenres.length === 0 ? "active" : ""}`}
          onClick={() => onGenreSelect(null)}
        >
          All
        </button>
        {genres.map((genre) => {
          const isSelected = selectedGenres.includes(genre.id);
          const canSelect = selectedGenres.length < 3 || isSelected;

          return (
            <button
              key={genre.id}
              className={`genre-btn ${isSelected ? "active" : ""} ${!canSelect ? "disabled" : ""}`}
              onClick={() => handleGenreClick(genre)}
              disabled={!canSelect}
            >
              {genre.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GenreFilter;
