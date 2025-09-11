const MovieDetails = ({
  movie: {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
    genre_ids,
    overview,
    backdrop_path,
  },
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="flex justify-center items-center flex-col">
          <p>{title}</p>
          <p>{release_date}</p>
        </div>
        <div className="flex flex-row">
          <img
            alt={title}
            width={200}
            src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/no-movie.png"}
          />
          <div className="flex flex-col">
            <p>{overview}</p>
            <p>{vote_average}</p>
            <p>{original_language}</p>
            <p>{}</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
