import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { searchByTitle } from "../../services/api";
import supabase from "../../services/supabase/supabase"; // импортируем supabase

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q");

    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Поиск по TMDb (если нужно)
        const tmdbResults = await searchByTitle(query);
        console.log("Результаты поиска TMDb:", tmdbResults);

        // 2. Поиск по локальной базе данных (Supabase)
        const { data: supabaseMovies, error: supabaseError } = await supabase
          .from("movies")
          .select("*")
          .ilike("title", `%${query}%`);
        console.log("Результаты поиска Supabase:", supabaseMovies);
        if (supabaseError) {
          throw new Error(supabaseError.message);
        }

        // 3. Объединяем результаты
        const combinedResults = [...tmdbResults, ...supabaseMovies];
        setResults(combinedResults);
      } catch (err) {
        console.error("Ошибка при поиске:", err);
        setError("Произошла ошибка при поиске.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  if (loading) return <div className="p-4">Загрузка...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="search-page p-4">
      {results.length === 0 ? (
        <p>Ничего не найдено</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((item) => {
            const isMovie =
              item.media_type === "movie" || item.media_type === undefined; // Для фильмов, добавленных в Supabase
            const isTV = item.media_type === "tv";

            if (!isMovie && !isTV) return null;

            const path = isMovie ? `/movies/${item.id}` : `/series/${item.id}`;
            const title = item.title || item.name;

            // Проверка на наличие постера для TMDb (если есть, то формируем URL)
            const posterUrl = item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : item.poster_url;

            return (
              <Link key={item.id} to={path} className="movie-card">
                {posterUrl ? (
                  <img
                    src={posterUrl} // Используем правильный источник для постеров
                    alt={title}
                    className="h-[412px] w-full shadow"
                  />
                ) : (
                  <div className="text-center">Нет постера</div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
