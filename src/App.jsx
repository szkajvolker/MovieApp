import { useState, useEffect } from "react";
import Search from "./components/Search.jsx";
import Notification from "./components/Notification.jsx";
import Loader from "./components/Loader.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import {
  getAllLikes,
  getTrendingMovies,
  getTrendingMoviesByLikes,
  incrementLikes,
  updateSearchCount,
} from "./appwrite.js";
import MovieDetails from "./components/MovieDetails.jsx";
import Button from "./components/Button.jsx";
import noMovie from "/no-movie.png";

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
  const [actors, setActors] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    fetchMoviesData(debouncedSearchTerm, newPage);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      fetchMoviesData(debouncedSearchTerm, newPage);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  const fetchMoviesData = async (query = "", page = 1) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch(
        query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
              query
            )}&page=${page}&include_adult=false`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}&include_adult=true&certification_country=US&certification.lte=PG-13`,
        API_OPTIONS
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      } else {
        const data = await response.json();

        if (data.results === "false") {
          setErrorMsg("Failed to fetch movies");
          setMovies([]);
          return;
        }
        const likesDocs = await getAllLikes();
        const mergedMovies = (data.results || []).map((movie) => {
          const found = likesDocs.find((doc) => doc.movie_id === movie.id);
          return { ...movie, likes: found ? found.likes : 0 };
        });
        setMovies(mergedMovies);
        if (query && data.results.length > 0) {
          await updateSearchCount(query, data.results[0]);
        }
      }
    } catch (error) {
      setErrorMsg("Error fetching movies. Please try again later...");
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&vote_count.gte=1000",
        API_OPTIONS
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      } else {
        const data = await res.json();
        setTopMovies(data.results || []);
        console.log(data);
      }
    } catch (err) {
      setErrorMsg("Failed to get data", err);
    } finally {
      setLoading(false);
      setError(false);
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

  const loadLikedMovies = async () => {
    setLoading(true);
    setError(false);
    try {
      const movies = await getTrendingMoviesByLikes();
      setLikedMovies(movies);
    } catch (error) {
      console.error("Error fetching trending movies by likes", error);
      setErrorMsg("Error fetching movies");
    } finally {
      setLoading(false);
      setError(false);
    }
  };

  const handleShowDetails = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
        API_OPTIONS
      );
      if (!response.ok) throw new Error("Failed to fetch movie details");
      const data = await response.json();
      setSelectedMovie(data);
      setShowModal(true);
    } catch (error) {
      setErrorMsg("Error fetching movie details.", error);
    } finally {
      setLoading(false);
    }
  };

  const getActors = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits`,
        API_OPTIONS
      );
      if (!response.ok) throw new Error("Failed to fetch actors");
      const data = await response.json();
      setActors(data.credits.cast);
    } catch (error) {
      setErrorMsg("Failed to get actors.Please try again later!", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (movie) => {
    if (!movie.id) {
      console.log("No valid ID!", movie);
      return;
    }
    await incrementLikes(movie.id, movie);
    setMovies((prev) =>
      prev.map((m) => (m.id === movie.id ? { ...m, likes: (m.likes || 0) + 1 } : m))
    );
    await loadLikedMovies();
  };

  const top10Movies = [...topMovies]
    .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
    .slice(0, 10);

  useEffect(() => {
    fetchMoviesData(debouncedSearchTerm, 1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchMoviesData("", 1);
    loadTrendingMovies();
    loadLikedMovies();
    fetchTopMovies();
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
        )}
        {top10Movies.length > 0 && (
          <section className="trending">
            <h2 className="bg-gray-800 rounded-xl p-2">
              <span className="text-gradient">Top 10 </span>movies{" "}
              <span className="text-gradient"> by rating</span>
            </h2>
            <ul>
              {top10Movies.map((movie, i) => (
                <li key={movie.id || i}>
                  <p>{i + 1}</p>

                  <img
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
          </section>
        )}
        <section className="trending">
          <h2 className="bg-gray-800 rounded-xl p-2">Trending by likes</h2>
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

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <section className="all-movies">
          <h2>All Movies</h2>
          <div className="flex justify-center items-center gap-20">
            <Button toggle="prev" onClick={prevPage}>
              Prev
            </Button>
            <span className="text-white bg-gray-800 px-3 py-1 rounded">Page {currentPage}</span>
            <Button toggle="next" onClick={nextPage}>
              Next
            </Button>
          </div>
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
                  onClick={() => {
                    handleShowDetails(movie.id);
                    getActors(movie.id);
                  }}
                  onLike={() => handleLike(movie)}
                />
              ))}
            </ul>
          )}
        </section>
        {showModal && (
          <MovieDetails movie={selectedMovie} onClick={() => setShowModal(false)} actors={actors} />
        )}
        <div className="flex justify-center items-center gap-20 mt-5">
          <Button toggle="prev" onClick={prevPage}>
            Prev
          </Button>
          <p className="text-white bg-gray-800 px-3 py-1 rounded">Page {currentPage}</p>
          <Button toggle="next" onClick={nextPage}>
            Next
          </Button>
        </div>
      </div>
    </main>
  );
}

export default App;
