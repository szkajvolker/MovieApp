import { useEffect, useState } from "react";
import {
  fetchMoviesData,
  handleShowDetails,
  getMovieActors,
} from "../API/tmdbapi";
import { getAllLikes, incrementLikes, updateSearchCount } from "../appwrite";
import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";
import Loader from "./Loader";

const Content = ({ searchTerm, currentPage }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      const data = await fetchMoviesData(searchTerm, currentPage);
      let moviesWithLikes = data.results || [];

      const likesData = await getAllLikes();
      if (likesData && Array.isArray(likesData)) {
        moviesWithLikes = moviesWithLikes.map((movie) => {
          const likeObj = likesData.find((l) => l.movie_id == movie.id);
          return { ...movie, likes: likeObj ? likeObj.likes : 0 };
        });
      }
      if (searchTerm && moviesWithLikes.length > 0) {
        updateSearchCount(searchTerm, moviesWithLikes[0]);
      }
      setMovies(moviesWithLikes);
      setLoading(false);
    };
    getMovies();
  }, [searchTerm, currentPage]);

  const sortedMoviesByLikes = [...movies].sort(
    (a, b) => (b.likes || 0) - (a.likes || 0),
  );

  const handleLike = async (movie) => {
    if (!movie.id) {
      return;
    }
    await incrementLikes(movie.id, movie);
    setMovies((prev) =>
      prev.map((m) =>
        m.id === movie.id ? { ...m, likes: (m.likes || 0) + 1 } : m,
      ),
    );
  };

  const handleDetails = async (id) => {
    const movie = await handleShowDetails(id);
    const actorData = await getMovieActors(id);
    setSelectedMovie(movie);
    setActors(actorData?.credits?.cast || []);
    setShowModal(true);
  };

  if (loading) {
    return <Loader />;
  }

  if (sortedMoviesByLikes.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <h3 className="text-white">No movies found with that name.</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 gap-5">
      {sortedMoviesByLikes.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => {
            handleDetails(movie.id);
          }}
          onLike={() => handleLike(movie)}
        />
      ))}
      {showModal && (
        <MovieDetails
          movie={selectedMovie}
          actors={actors}
          onClick={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Content;
