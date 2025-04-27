import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HorizontalScrollList from "../../components/HorizontalScrollList";
import { fetchCategoryMovies } from "../../services/api";
import { useLoader } from "../../context/loaderProvider"; 
import Loader from "../../components/ui/Loader";

const categories = [
  { title: "Популярное", type: "popular" },
  { title: "Топ рейтинг", type: "top_rated" },
  { title: "Сейчас смотрят", type: "now_playing" },
];

const HomePage = () => {
  const [data, setData] = useState({});
  const { showLoader, hideLoader, isLoading } = useLoader();

  useEffect(() => {
    const fetchData = async () => {
      showLoader();
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
      hideLoader();
    };

    fetchData();
  }, [showLoader, hideLoader]);

  if (isLoading) {
    return <Loader/>;
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
                  className="w-[150px] transition-transform hover:scale-105"
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
