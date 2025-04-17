import { fetchDiscoverMovies } from "../../services/api";
import Discover from "../../components/Discover";

const MoviesPage = () => {
  return <Discover fetchData={fetchDiscoverMovies} routePrefix="movies" />;
};

export default MoviesPage;
