import { useEffect, useState } from "react";
import { fetchTopMovies } from "../API/tmdbapi";
import { getTrendingMovies, getTrendingMoviesByLikes } from "../appwrite";
import noMovie from "/no-movie.png";

const Hero = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getTopMovies = async () => {
      const data = await fetchTopMovies();
      setTopMovies(data?.results || []);
    };
    getTopMovies();
    loadTrendingMovies();
    loadLikedMovies();
  }, []);

  const loadTrendingMovies = async () => {
    setError(false);
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      setError(true);
      console.error(`Error fetching trending movies: ${error}`);
      setErrorMsg("Error fetching trending movies.");
    }
  };
  const loadLikedMovies = async () => {
    setError(false);
    try {
      const movies = await getTrendingMoviesByLikes();
      setLikedMovies(movies);
    } catch (error) {
      console.error("Error fetching trending movies by likes", error);
      setErrorMsg("Error fetching movies");
    }
  };

  if (error) {
    return <Notification color="red" textToShow={errorMsg} />;
  }

  return (
    <div>
      <header>
        <div className="relative">
          <img
            src="./herobg.png"
            alt="herobg"
            className="rounded-xl mt-15 mb-15 w-full"
          />
          <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:text-6xl w-full bg-gray-900/60 rounded-xl">
            Find <span className="text-gradient">Movies</span> You'll Enjoy{" "}
            <br />
            Without the Hassle
          </h1>
          <div className="absolute inset-0 backdrop-blur-none rounded-xl bg-black/10 flex items-center justify-center"></div>
        </div>
      </header>
      <section className="trending">
        <h2 className="bg-gray-800 rounded-xl p-2">Trending Movies</h2>
        {trendingMovies.length > 0 ? (
          <ul>
            {trendingMovies.map((movie, i) => (
              <li key={movie.$id || i}>
                <p>{i + 1}</p>
                <img src={movie.poster_url} alt={movie.title} />
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {Array.from({ length: 5 }, (_, i) => (
              <li key={i}>
                <p>{i + 1}</p>
                <img src={noMovie} alt="No movie available" />
              </li>
            ))}
          </ul>
        )}
      </section>
      <h2 className="bg-gray-800 justify-self-center rounded-xl">
        <span className="text-gradient">Trending </span>movies{" "}
      </h2>
      {topMovies.length > 0 && (
        <ul className="carousel">
          {topMovies.map((movie, i) => (
            <li key={movie.id || i} className="mt-2 mb-1 shrink-0 w-40">
              <img
                className="rounded-xl w-full pointer-events-none"
                src={
                  movie.poster_url ||
                  (movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "")
                }
                alt={movie.title || movie.name || "Movie"}
              />
            </li>
          ))}
        </ul>
      )}
      <section className="trending">
        <h2 className="bg-gray-800 rounded-xl p-2 mt-2">Trending by likes</h2>
        {likedMovies.length > 0 ? (
          <ul>
            {likedMovies.map((movie, i) => (
              <li key={movie.$id}>
                <p>{i + 1}</p>
                <img src={movie.poster_url} alt={movie.title} />
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {Array.from({ length: 5 }, (_, i) => (
              <li key={i}>
                <p>{i + 1}</p>
                <img src={noMovie} alt="No movie available" />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Hero;
