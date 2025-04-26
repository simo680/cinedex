import { use, useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { Link, useLocation } from "react-router-dom";
import supabase from "../../services/supabase/supabase";
import WatchlistCard from "../../components/WatchlistCard";

function WatchlistPage() {
  const { user } = useAuth();
  const [statuses, setStatuses] = useState([]);
  const [filter, setFilter] = useState("буду смотреть");

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");

    if (status) {
      // Преобразуем статус из URL в нужное значение
      switch (status) {
        case "watching":
          setFilter("буду смотреть");
          break;
        case "watched":
          setFilter("просмотрено");
          break;
        case "abandoned":
          setFilter("заброшено");
          break;
        default:
          setFilter("буду смотреть");
      }
    }
  }, [location.search]);

  useEffect(() => {
    if (!user) return;

    const fetchStatuses = async () => {
      const { data, error } = await supabase
        .from("statuses")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Ошибка загрузки статусов:", error);
      } else {
        setStatuses(data);
      }
    };

    fetchStatuses();
  }, [user]);

  const filteredStatuses = statuses.filter((s) => s.status === filter);

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col items-start gap-4">
        <select
          className="rounded text-[28px]"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="буду смотреть" className="text-yellow-500">
            Буду смотреть
          </option>
          <option value="просмотрено" className="text-green-500">
            Просмотрено
          </option>
          <option value="заброшено" className="text-blue-500">
            Заброшено
          </option>
        </select>
      </div>

      {/* Список постеров */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {filteredStatuses.map((statusItem) => (
          <Link
            key={statusItem.id}
            to={`/${statusItem.type === "tv" ? "series" : "movies"}/${statusItem.tmdb_id || statusItem.movie_id}`}
          >
            <WatchlistCard id={statusItem.tmdb_id || statusItem.movie_id} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WatchlistPage;
