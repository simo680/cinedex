import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const Discover = ({ fetchData, routePrefix }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchData(sortBy, page);

      if (res?.results?.length) {
        setItems((prev) => {
          const allItems = [...prev, ...res.results];
          const uniqueItems = Object.values(
            allItems.reduce((acc, item) => {
              acc[item.id] = item;
              return acc;
            }, {}),
          );
          return uniqueItems;
        });
        setHasMore(page < res.total_pages);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Ошибка при загрузке:", err);
    }
    setLoading(false);
  }, [sortBy, page, fetchData]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [sortBy]);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 },
    );
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [loading, hasMore]);

  return (
    <div>
      <div className="mb-6 flex flex-col items-start gap-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded text-[28px]"
        >
          <option value="popularity.desc">Популярные</option>
          <option value="vote_average.desc&vote_count.gte=1000">
            Топ рейтинг
          </option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((item) => (
          <Link key={item.id} to={`/${routePrefix}/${item.id}`}>
            <div className="overflow-hidden shadow">
              <img
                loading="lazy"
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                className="h-auto w-full"
              />
            </div>
          </Link>
        ))}
      </div>

      {loading && <p className="my-6 text-center">Загрузка...</p>}
      <div ref={loader} className="h-10"></div>
    </div>
  );
};

export default Discover;
