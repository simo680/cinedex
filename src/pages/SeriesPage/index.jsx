import { fetchDiscoverTvSeries } from "../../services/api/api";
import Discover from "../../components/Discover";

const SeriesPage = () => {
  return (
    <>
      <Discover fetchData={fetchDiscoverTvSeries} routePrefix="series" />
    </>
  );
};

export default SeriesPage;
