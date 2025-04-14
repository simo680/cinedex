export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

export const fetchCategoryMovies = async (categoryType) => {
  const url = `${baseUrl}/movie/${categoryType}?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    return json.results || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};




// POPULAR
export const fetchPopular = async () => {
  try {
    const res = await fetch(
      `${baseUrl}/movie/popular?api_key=${apiKey}&language=ru-RU`,
    );
    const data = await res.json();
    return data?.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
};

// TOP RATED
export const fetchTopRated = async () => {
  try {
    const res = await fetch(
      `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=ru-RU`,
    );
    const data = await res.json();
    return data?.results;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
  }
};

// NOW PLAYING
export const fetchNowPlaying = async () => {
  try {
    const res = await fetch(
      `${baseUrl}/movie/now_playing?api_key=${apiKey}&language=ru-RU`,
    );
    const data = await res.json();
    return data?.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
  }
};

// MOVIES & SERIES - Details
export const fetchDetails = async (type, id) => {
  try {
    const res = await fetch(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching details:", error);
  }
};

// MOVIES & SERIES - Credits
export const fetchCredits = async (type, id) => {
  try {
    const res = await fetch(
      `${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`,
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching credits:", error);
  }
};

// MOVIES & SERIES - Images (для моментов из фильма)
export const fetchMovieMoments = async (type, id) => {
  try {
    const res = await fetch(
      `${baseUrl}/${type}/${id}/images?api_key=${apiKey}`,
    );
    const data = await res.json();
    return data?.backdrops;
  } catch (error) {
    console.error("Error fetching movie moments:", error);
  }
};

// DISCOVER - Movies
export const fetchDiscoverMovies = async (sortBy) => {
  try {
    const res = await fetch(
      `${baseUrl}/discover/movie?api_key=${apiKey}&sort_by=${sortBy}`,
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

// DISCOVER - TV Series
export const fetchDiscoverTvSeries = async (sortBy) => {
  try {
    const res = await fetch(
      `${baseUrl}/discover/tv?api_key=${apiKey}&sort_by=${sortBy}`,
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching tv series:", error);
  }
};

// SEARCH
export const searchData = async (query) => {
  try {
    const res = await fetch(
      `${baseUrl}/search/multi?api_key=${apiKey}&query=${query}`,
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error searching data:", error);
  }
};
