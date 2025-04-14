import { useEffect, useState } from "react";
import MovieRow from "../../components/MovieRow";
import { fetchCategoryMovies } from "../../services/api"; // Импортируем функцию из api.js

const categories = [
  { title: "Популярное", type: "popular" },
  { title: "Топ рейтинг", type: "top_rated" },
  { title: "Сейчас смотрят", type: "now_playing" },
];

const HomePage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const allMovies = await Promise.all(
        categories.map(async (cat) => {
          const movies = await fetchCategoryMovies(cat.type);
          return { [cat.type]: movies };
        }),
      );
      const movieData = allMovies.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        {},
      );
      setData(movieData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      {categories.map((cat) => (
        <MovieRow
          key={cat.type}
          title={cat.title}
          movies={data[cat.type] || []}
        />
      ))}
    </div>
  );
};

export default HomePage;
