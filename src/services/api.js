export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

export const baseUrl = import.meta.env.VITE_TMDB_API_URL;
export const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const fetchCategoryMovies = async (categoryType) => {
  const url = `${baseUrl}/movie/${categoryType}?language=ru-RU&page=1`;
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

// MOVIES & SERIES - Details
export const fetchDetails = async (type, id) => {
  try {
    const url = `${baseUrl}/${type}/${id}?language=ru-RU`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching details:", error);
    return null;
  }
};

// MOVIES & SERIES - Credits
export const fetchCredits = async (type, id) => {
  try {
    const url = `${baseUrl}/${type}/${id}/credits?language=ru-RU`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const data = await res.json();
    return data.cast || [];
  } catch (error) {
    console.error("Error fetching credits:", error);
    return [];
  }
};

// MOVIES & SERIES - Images
export const fetchImages = async (type, id) => {
  try {
    const url = `${baseUrl}/${type}/${id}/images?`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const data = await res.json();
    return data.backdrops || [];
  } catch (error) {
    console.error("Error fetching movie moments:", error);
    return [];
  }
};

// DISCOVER - Movies
export const fetchDiscoverMovies = async (sortBy, page = 1) => {
  const url = `${baseUrl}/discover/movie?language=ru-RU&sort_by=${sortBy}&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching discover movies:", error);
    return { results: [], total_pages: 0 };
  }
};

// DISCOVER - TV Series
export const fetchDiscoverTvSeries = async (sortBy, page = 1) => {
  try {
    const res = await fetch(
      `${baseUrl}/discover/tv?sort_by=${sortBy}&page=${page}&language=ru-RU`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching tv series:", error);
    return null;
  }
};

// SEARCH
export const searchByTitle = async (query) => {
  try {
    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&page=1`; // Правильный URL
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching data:", error);
    return [];
  }
};
