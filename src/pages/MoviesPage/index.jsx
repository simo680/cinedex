import { useEffect, useState } from "react";
import { fetchCategoryMovies } from "../../services/api";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]); // Состояние для хранения фильмов
  const [loading, setLoading] = useState(false); // Состояние для отслеживания загрузки
  const [category, setCategory] = useState("popular"); // Состояние для выбранной категории

  // Функция для загрузки фильмов
  const loadMovies = async () => {
    setLoading(true);
    const newMovies = await fetchCategoryMovies(category); // Получаем фильмы по выбранной категории
    setMovies(newMovies); // Сохраняем фильмы
    setLoading(false);
  };

  // Эффект для начальной загрузки фильмов
  useEffect(() => { 
    loadMovies();
  }, [category]); // Загрузка фильмов при изменении категории

  return (
    <>
      <h1>Фильмы</h1>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={loading} // Отключаем селектор при загрузке
      >
        <option value="popular">Популярные</option>
        <option value="top_rated">Топ рейтинг</option>
      </select>

      <div>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </div>
          ))
        ) : (
          <p>Фильмы не найдены</p>
        )}
      </div>

      {loading && <div>Загрузка...</div>}
    </>
  );
};

export default MoviesPage;
