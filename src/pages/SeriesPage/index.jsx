import { fetchDiscoverTvSeries } from "../../services/api"; // сделай эту функцию в api.js
import DiscoverPage from "../../components/Discover";

const SeriesPage = () => {
  return (
    <>
      <DiscoverPage
        fetchData={fetchDiscoverTvSeries}
        pageTitle="Сериалы"
        routePrefix="series"
      />
    </>
  );
};

export default SeriesPage;
