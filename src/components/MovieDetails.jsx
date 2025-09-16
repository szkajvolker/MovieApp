const MovieDetails = ({
  onClick,
  actors,
  movie: {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
    overview,
    backdrop_path,
    tagline,
    genres,
  },
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClick}>
          X
        </button>

        <div className="flex justify-center items-center flex-col">
          <h3 className="text-xl font-bold">{title}</h3>
          <p>{release_date}</p>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <img
            alt={title}
            width={200}
            src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/no-movie.png"}
            className="border-1 border-gray-500 rounded-xl mx-auto mb-4 md:mb-0"
          />
          <div className="flex flex-col bg-white/10 rounded-xl shadow items-center md:items-start md:pl-2">
            <h2 className="text-xl font-bold text-gray-200 mb-1 text-center">{tagline}</h2>
            <p className="text-gray-200 mb-2 max-w-xs mx-auto md:mx-0 text-center md:text-left">
              {overview}
            </p>
            <div className="flex items-center mb-2 gap-2">
              <span className="bg-red-100 text-yellow-700 px-2 py-1 rounded-full font-semibold text-xs uppercase">
                ⭐ {vote_average.toFixed(1)}
              </span>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium uppercase">
                {original_language}
              </span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                {release_date?.split("-")[0]}
              </span>
              {genres.map((genre) => (
                <span
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium uppercase"
                  key={genre.id}
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="overflow-x-auto whitespace-nowrap max-w-xs md:max-w-md lg:max-w-2xl">
              {actors.map((actor) => (
                <div key={actor.id} className="inline-block w-32 mr-4 text-center">
                  <img
                    className="w-full h-48 object-cover rounded-lg pointer-events-none"
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : "/no-image.jpg"
                    }
                    alt={actor.name}
                  />
                  <p className="mt-2 text-sm">{actor.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex max-w-sm p-2">
          <img
            alt={title}
            width={200}
            className="rounded-xl"
            src={
              backdrop_path ? `https://image.tmdb.org/t/p/w500/${backdrop_path}` : "/no-movie.png"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
