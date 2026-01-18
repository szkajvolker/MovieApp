const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
const API_BASE_URL = "https://api.themoviedb.org/3";

export const fetchTopMovies = async () => {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?",
      API_OPTIONS,
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    } else {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.error("Failed to get data", err);
  }
};

export const fetchMoviesData = async (query = "", page = 1) => {
  const url = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}&include_adult=false`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}&include_adult=true&certification_country=US&certification.lte=PG-13`;

  const response = await fetch(url, API_OPTIONS);
  if (!response.ok) throw new Error("Failed to fetch movies");
  const data = await response.json();
  return data;
};

export const getMovieActors = async (id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits`,
      API_OPTIONS,
    );
    if (!response.ok) throw new Error("Failed to fetch actors");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to get actors.Please try again later!", error);
  }
};

export const handleShowDetails = async (id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
      API_OPTIONS,
    );
    if (!response.ok) throw new Error("Failed to fetch movie details");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details.", error);
  }
};
