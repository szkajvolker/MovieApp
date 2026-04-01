import { useEffect, useState, useRef } from "react";
import { fetchTopMovies } from "../API/tmdbapi";
import { getTrendingMovies, getTrendingMoviesByLikes } from "../appwrite";
import noMovie from "/no-movie.png";
import { gsap } from "gsap";

const Hero = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const carouselRef = useRef(null);
  const carouselTrackRef = useRef(null);

  useEffect(() => {
    const getTopMovies = async () => {
      const data = await fetchTopMovies();
      setTopMovies(data?.results || []);
    };
    getTopMovies();
    loadTrendingMovies();
    loadLikedMovies();
  }, []);

  useEffect(() => {
    if (topMovies.length > 0 && carouselTrackRef.current) {
      const track = carouselTrackRef.current;

      const images = track.querySelectorAll("img");
      let loadedImages = 0;
      let animation;

      const startAnimation = () => {
        const firstSlide = track.firstElementChild;
        if (!firstSlide) return;

        const slideWidth = firstSlide.offsetWidth + 16;
        const singleSetWidth = slideWidth * topMovies.length;

        gsap.set(track, { x: 0 });

        animation = gsap.to(track, {
          x: -singleSetWidth,
          duration: topMovies.length * 1.8,
          ease: "none",
          repeat: -1,
          repeatDelay: 0,
          onRepeat: () => {
            gsap.set(track, { x: 0 });
          },
        });

        const movieSlides = track.querySelectorAll(".movie-slide");
        const handleMouseEnter = () => animation && animation.pause();
        const handleMouseLeave = () => animation && animation.play();

        movieSlides.forEach((slide) => {
          slide.addEventListener("mouseenter", handleMouseEnter);
          slide.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
          if (animation) animation.kill();
          movieSlides.forEach((slide) => {
            slide.removeEventListener("mouseenter", handleMouseEnter);
            slide.removeEventListener("mouseleave", handleMouseLeave);
          });
        };
      };

      if (images.length === 0) {
        return startAnimation();
      } else {
        images.forEach((img) => {
          if (img.complete) {
            loadedImages++;
          } else {
            img.onload = () => {
              loadedImages++;
              if (loadedImages === images.length) {
                return startAnimation();
              }
            };
          }
        });

        if (loadedImages === images.length) {
          return startAnimation();
        }
      }
    }
  }, [topMovies]);

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
      <section className="netflix-carousel" ref={carouselRef}>
        <h2 className="bg-gray-800 rounded-xl p-2">
          <span className="text-gradient">Trending </span>movies{" "}
        </h2>
        {topMovies.length > 0 && (
          <div className="carousel-track" ref={carouselTrackRef}>
            {[...Array(3)].map((_, setIndex) =>
              topMovies.map((movie, i) => (
                <div
                  key={`set${setIndex}-${movie.id || i}`}
                  className="movie-slide"
                >
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
                </div>
              )),
            )}
          </div>
        )}
      </section>
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
