import { IoIosHeart } from "react-icons/io";
import { IoMdHeartDislike } from "react-icons/io";

const MovieCard = ({
  onClick,
  onLike,
  movie: {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
    likes = 0,
  },
}) => {
  return (
    <div className="movie-card shadow-md shadow-gray-700/70">
      <div className="flex flex-row justify-end mb-2">
        <button onClick={onLike} className="like-btn cursor-pointer">
          {likes > 0 ? (
            <IoIosHeart className="text-red-500 text-2xl"></IoIosHeart>
          ) : (
            <IoMdHeartDislike className="text-gray-500 hover:text-gray-300 text-2xl"></IoMdHeartDislike>
          )}
        </button>
        <span className="ml-1 text-white">{likes}</span>
      </div>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/original/${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
      />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content justify-between">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p className="">{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            <span>•</span>
            <p className="lang">{original_language}</p>
            <span>•</span>
            <p className="year">
              {release_date ? release_date.split("-")[0] : "N/A"}
            </p>
          </div>
          <div className="">
            <button
              className="border-2 rounded-xl p-2  cursor-pointer bg-gray-800 hover:bg-gray-600 hover:text-white transition-all duration-300"
              onClick={onClick}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
