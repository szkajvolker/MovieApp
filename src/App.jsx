import { useState, useEffect } from "react";
import Search from "./components/Search.jsx";
import Notification from "./components/Notification.jsx";
import Loader from "./components/Loader.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";
import MovieDetails from "./components/MovieDetails.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [movies, setMovies] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  const fetchMoviesData = async (query = "") => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch(
        query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`,
        API_OPTIONS
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      } else {
        const data = await response.json();
        console.log(data.results);

        if (data.results === "false") {
          setErrorMsg("Failed to fetch movies");
          setMovies([]);
          return;
        }
        setMovies(data.results || []);
        if (query && data.results.length > 0) {
          await updateSearchCount(query, data.results[0]);
        }
      }
      console.log(movies);
    } catch (error) {
      setErrorMsg("Error fetching movies. Please try again later...");
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    setLoading(true);
    setError(false);
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      setError(true);
      console.error(`Error fetching trending movies: ${error}`);
      setErrorMsg("Error fetching trending movies.");
    } finally {
      setLoading(false);
      setError(false);
    }
  };

  const handleShowDetails = (id) => {
    const movieToFind = movies.find((movie) => movie.id === id);
    setSelectedMovie(movieToFind);
    setShowModal(true);
  };

  useEffect(() => {
    fetchMoviesData(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
        </header>
        {loading ? (
          <Loader />
        ) : error ? (
          <Notification textToShow={errorMsg} color={"red"}></Notification>
        ) : (
          trendingMovies.length > 0 && (
            <section className="trending">
              <h2>Trending Movies</h2>
              <ul>
                {trendingMovies.map((movie, i) => (
                  <li key={movie.$id}>
                    <p>{i + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))}
              </ul>
            </section>
          )
        )}
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <section className="all-movies">
          <h2>All Movies</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Notification textToShow={errorMsg} color={"red"}></Notification>
          ) : movies.length === 0 ? (
            <Notification textToShow={"Movie not found"} color={"orange"}></Notification>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleShowDetails(movie.id)}
                />
              ))}
            </ul>
          )}
        </section>
        {showModal && <MovieDetails movie={selectedMovie} />}
      </div>
    </main>
  );
}

export default App;
