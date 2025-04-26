import { apiKey } from "../../services/api";
import { useEffect, useState } from "react";
import supabase from "../../services/supabase/supabase";

function WatchlistCard({ id }) {
  const [posterUrl, setPosterUrl] = useState(null);

  useEffect(() => {
    const loadPoster = async () => {
      let poster = null;

      if (/^[0-9a-f-]{36}$/.test(id)) {
        // Это локальный фильм
        const { data, error } = await supabase
          .from("movies")
          .select("poster_url")
          .eq("id", id)
          .single();

        if (!error && data) {
          poster = data.poster_url;
        }
      } else {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=ru-RU`,
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
                accept: "application/json",
              },
            },
          );
          const movie = await response.json();
          if (movie.poster_path) {
            poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          }
        } catch (err) {
          console.error("Ошибка загрузки постера:", err);
        }
      }

      setPosterUrl(poster);
    };

    loadPoster();
  }, [id]);

  if (!posterUrl) {
    return <div className="h-[300px] w-full animate-pulse bg-gray-300" />;
  }

  return (
    <img
      src={posterUrl}
      alt="Постер"
      className="h-auto w-full object-cover shadow"
    />
  );
}

export default WatchlistCard;
