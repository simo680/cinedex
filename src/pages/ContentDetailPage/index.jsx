import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetails, fetchCredits, fetchImages } from "../../services/api/api";
import HorizontalScrollList from "../../components/ui/HorizontalScrollList";
import DonateModal from "../../components/modals/DonateModal";
import ClockIcon from "../../assets/clock.svg?react";
import PauseIcon from "../../assets/pause.svg?react";
import SuccessIcon from "../../assets/success.svg?react";
import RatingModal from "../../components/modals/RatingModal";
import supabase from "../../services/supabase/supabase";
import Loader from "../../components/ui/Loader";
import { useAuth } from "../../context/useAuth";

function ContentDetailPage({ type }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [credits, setCredits] = useState([]);
  const [images, setImages] = useState([]);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [isLocalMovie, setIsLocalMovie] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        const isUUID =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
            id,
          );

        let contentId;

        if (isUUID) {
          const { data: localMovie, error } = await supabase
            .from("movies")
            .select("*")
            .eq("id", id)
            .single();

          if (error) {
            console.error("Ошибка при получении фильма:", error.message);
          }

          if (localMovie) {
            setData(localMovie);
            setIsLocalMovie(true);
            contentId = localMovie.id;
          }
        }

        if (!contentId) {
          const details = await fetchDetails(type, id);
          const creditsData = await fetchCredits(type, id);
          const imagesData = await fetchImages(type, id);

          setData(details);
          setCredits(creditsData);
          setImages(imagesData);
          contentId = details.id;
        }

        if (!user || !contentId) return;

        // Загружаем рейтинг
        const { data: existingRating } = await supabase
          .from("ratings")
          .select("rating")
          .eq("user_id", user.id)
          .eq(isUUID ? "movie_id" : "tmdb_id", contentId)
          .single();

        if (existingRating) {
          setUserRating(existingRating.rating);
        }

        // Загружаем статус
        const { data: statusData } = await supabase
          .from("statuses")
          .select("status")
          .eq("user_id", user.id)
          .eq(isUUID ? "movie_id" : "tmdb_id", contentId)
          .single();

        if (statusData) {
          setUserStatus(statusData.status);
        }
      } catch (err) {
        console.error("Ошибка загрузки:", err);
      }
    };

    loadData();
  }, [id, type, user]);

  const saveRating = async (rating) => {
    if (!user) return console.error("Пользователь не авторизован");

    const { data: existingRating } = await supabase
      .from("ratings")
      .select("*")
      .eq("user_id", user.id)
      .eq(isLocalMovie ? "movie_id" : "tmdb_id", data.id)
      .single();

    const query = existingRating
      ? supabase
          .from("ratings")
          .update({ rating: rating })
          .eq("id", existingRating.id)
      : supabase.from("ratings").insert({
          user_id: user.id,
          rating: rating,
          ...(isLocalMovie ? { movie_id: data.id } : { tmdb_id: data.id }),
        });

    const { error } = await query;
    if (error) {
      console.error("Ошибка при сохранении рейтинга:", error);
    } else {
      setUserRating(rating);
    }
  };

  const saveStatus = async (status) => {
    if (!user) return console.error("Пользователь не авторизован");

    const { data: existingStatus } = await supabase
      .from("statuses")
      .select("*")
      .eq("user_id", user.id)
      .eq(isLocalMovie ? "movie_id" : "tmdb_id", data.id)
      .single();

    const query = existingStatus
      ? supabase
          .from("statuses")
          .update({ status: status })
          .eq("id", existingStatus.id)
      : supabase.from("statuses").insert({
          user_id: user.id,
          status: status,
          ...(isLocalMovie ? { movie_id: data.id } : { tmdb_id: data.id }),
        });

    const { error } = await query;
    if (error) {
      console.error("Ошибка при сохранении статуса:", error);
    } else {
      setUserStatus(status);
    }
  };

  if (!data) return <Loader/>

  const title = data.title || data.name;
  const releaseDate = data.release_date || data.first_air_date;
  const runtime = isLocalMovie
    ? data.duration
    : data.runtime || data.episode_run_time?.[0];
  const poster = isLocalMovie
    ? data.poster_url
    : `https://image.tmdb.org/t/p/w500${data.poster_path}`;

  return (
    <>
      <div>
        <div className="flex flex-col gap-8 md:flex-col lg:flex-row lg:items-stretch">
          <div className="w-full flex justify-center lg:w-auto lg:justify-start">
            <img
              src={poster}
              alt={title}
              className="mx-auto h-auto w-[300px] lg:mx-0"
            />
          </div>

          <div className="flex h-full flex-1 flex-col justify-between space-y-4">
            <div>
              <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                {title}
              </h1>
              <ul className="mt-2 flex flex-wrap gap-4 text-[14px] sm:gap-6 sm:text-[16px] md:gap-8 md:text-[18px]">
                <li>{releaseDate}</li>
                <li>{runtime} мин</li>
                <li>
                  {isLocalMovie
                    ? `${data.age_rating || "0"}`
                    : data.adult
                      ? "18+"
                      : "0+"}
                </li>
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {(data.genres || []).map((genre) => (
                  <span
                    key={genre.id || genre}
                    className="rounded bg-[var(--tertiary)] px-3 py-1 text-xs sm:text-sm"
                  >
                    {typeof genre === "string" ? genre : genre.name}
                  </span>
                ))}
              </div>

              <div className="mt-4 text-sm sm:text-base">
                <p className="mt-2">{data.overview || data.description}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <div className="flex justify-center gap-2 sm:justify-start">
                <button
                  className={`cursor-pointer px-2 py-1 text-sm hover:bg-yellow-600 sm:text-base ${
                    userStatus === "буду смотреть"
                      ? "bg-yellow-600"
                      : "bg-yellow-500"
                  }`}
                  onClick={() => saveStatus("буду смотреть")}
                >
                  <ClockIcon />
                </button>
                <button
                  className={`cursor-pointer px-2 py-1 text-sm hover:bg-green-700 sm:text-base ${
                    userStatus === "просмотрено"
                      ? "bg-green-700"
                      : "bg-green-600"
                  }`}
                  onClick={() => saveStatus("просмотрено")}
                >
                  <SuccessIcon />
                </button>
                <button
                  className={`cursor-pointer px-2 py-1 text-sm hover:bg-blue-700 sm:text-base ${
                    userStatus === "заброшено" ? "bg-blue-700" : "bg-blue-600"
                  }`}
                  onClick={() => saveStatus("заброшено")}
                >
                  <PauseIcon />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                <button
                  className="cursor-pointer bg-[var(--tertiary)] p-3 text-sm sm:p-4 sm:text-base"
                  onClick={() => setIsRatingModalOpen(true)}
                >
                  Поставить оценку
                </button>
                {isLocalMovie && data.monetized && (
                  <button
                    className="cursor-pointer bg-[var(--tertiary)] p-3 text-sm sm:p-4 sm:text-base"
                    onClick={() => setIsDonateOpen(true)}
                  >
                    Поддержать донатом
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex max-w-full flex-row justify-between gap-2 lg:max-w-[148px] lg:flex-col lg:justify-start">
            <div className="w-full bg-[var(--tertiary)] px-6 py-3 text-center text-sm sm:text-base">
              <p className="text-[18px] sm:text-[20px] md:text-[23px]">
                {data.vote_average?.toFixed?.(1) || "—"} / 10
              </p>
            </div>
            <div className="w-full bg-[var(--accent)] px-6 py-3 text-center text-sm sm:text-base">
              <p className="text-[18px] sm:text-[20px] md:text-[23px]">
                {userRating !== null && userRating !== undefined
                  ? `${userRating} / 10`
                  : "— / 10"}
              </p>
            </div>
          </div>
        </div>

        {!isLocalMovie && (
          <>
            <HorizontalScrollList
              title="Фотографии"
              items={images}
              itemWidth="10%"
              renderItem={(image, index) => (
                <img
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  alt={`moment-${index}`}
                  className="w-full shadow"
                />
              )}
            />
            <HorizontalScrollList
              title="Актеры"
              items={credits}
              renderItem={(actor) => (
                <div className="overflow-hidden shadow">
                  {actor.profile_path && (
                    <img
                      className="max-w-[200px] shadow"
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      alt={actor.name}
                    />
                  )}
                </div>
              )}
            />
          </>
        )}
      </div>

      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        initialRating={userRating}
        onSubmit={saveRating}
      />

      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
      />
    </>
  );
}

export default ContentDetailPage;
