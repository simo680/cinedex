import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HorizontalScrollList from "../../components/HorizontalScrollList";
import { fetchCategoryMovies } from "../../services/api";

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
    <>
      <div>
        {categories.map((cat) => (
          <HorizontalScrollList
            key={cat.type}
            title={cat.title}
            items={data[cat.type] || []}
            renderItem={(movie) => (
              <Link to={`/movies/${movie.id}`} key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-[150px] rounded-lg transition-transform hover:scale-105"
                />
              </Link>
            )}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
