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
    runtime,
  },
}) => {
  const formatTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}:${m}m`;
  };
  return (
    <div className="modal mt-10">
      <div
        className="modal-content bg-cover bg-center"
        style={{
          backgroundImage: backdrop_path
            ? `url(https://image.tmdb.org/t/p/original/${backdrop_path})`
            : "none",
          backgroundColor: !backdrop_path ? "#1f2937" : undefined,
        }}
      >
        <div className="w-full flex flex-row p-4">
          <button className="close-btn ml-auto justify-end" onClick={onClick}>
            X
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 w-full max-w-full">
          <div className="flex flex-col">
            <div className="flex justify-self-center items-center flex-col">
              <h3 className="text-xl font-bold">{title}</h3>
              <p>{release_date}</p>
            </div>
            <img
              alt={title}
              width={200}
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/original/${poster_path}`
                  : "/no-movie.png"
              }
              className=" rounded-xl mx-auto mb-4 w-full max-w-50 sm:max-w-50"
            />
          </div>
          <div className="flex flex-col bg-gray-900/90 rounded-xl shadow justify-center items-center w-full max-w-full mb-20">
            <h2 className="text-xl font-bold text-gray-200 mb-1 p-2 text-center">
              {tagline}
            </h2>
            <p className="text-gray-300 max-w-4xl text-center md:text-left mb-5">
              {overview}
            </p>
            <div className="flex flex-col md:flex-row items-center mb-2 gap-2 w-full max-w-full justify-center">
              <div className="flex gap-2">
                <span className="bg-red-100 text-yellow-700 px-2 py-1 rounded-full font-semibold text-xs uppercase">
                  ⭐ {vote_average.toFixed(1)}
                </span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium uppercase">
                  {original_language}
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                  {release_date?.split("-")[0]}
                </span>
              </div>
              <ul className="flex flex-row gap-2">
                {genres.map((genre) => (
                  <li
                    className="bg-gray-200 text-gray-700 px-2 py-2 rounded text-xs font-medium uppercase"
                    key={genre.id}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
              <div className="flex flex-row">
                <p className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                  runtime:
                  <span>{formatTime(runtime)}</span>
                </p>
              </div>
            </div>

            {actors.length > 0 && (
              <div className="w-full flex justify-center">
                <ul className="carousel flex overflow-x-auto whitespace-nowrap gap-2 max-w-4xl py-2">
                  {actors.map((actor) => (
                    <li key={actor.id} className="w-40 shrink-0">
                      <img
                        className="w-auto h-48 rounded-lg pointer-events-none"
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                            : "/noimage.png"
                        }
                        alt={actor.name}
                      />
                      <p className="mt-2 text-sm text-center">{actor.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
