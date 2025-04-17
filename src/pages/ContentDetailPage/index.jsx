import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetails, fetchCredits, fetchImages } from "../../services/api";
import HorizontalScrollList from "../../components/HorizontalScrollList";
import ClockIcon from "../../assets/clock.svg?react";
import PauseIcon from "../../assets/pause.svg?react";
import SuccessIcon from "../../assets/success.svg?react";

function ContentDetailPage({ type }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [credits, setCredits] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const details = await fetchDetails(type, id);
      setData(details);

      const creditsData = await fetchCredits(type, id);
      setCredits(creditsData);

      const imagesData = await fetchImages(type, id);
      setImages(imagesData);
    };

    loadData();
  }, [id, type]);

  if (!data) return <div className="p-10 text-center">Загрузка...</div>;

  return (
    <>
      <div>
        <div className="flex flex-col gap-8 md:flex-col lg:flex-row lg:items-stretch">
          {/* Постер */}
          <div className="w-full lg:w-auto">
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title || data.name}
              className="mx-auto h-auto w-full max-w-[300px] rounded lg:mx-0"
            />
          </div>

          {/* Центральный блок */}
          <div className="flex h-full flex-1 flex-col justify-between space-y-4">
            <div>
              <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                {data.title || data.name}
              </h1>
              <ul className="mt-2 flex flex-wrap gap-4 text-[14px] sm:gap-6 sm:text-[16px] md:gap-8 md:text-[18px]">
                <li>{data.release_date || data.first_air_date}</li>
                <li>{data.runtime || data.episode_run_time?.[0]} мин</li>
                <li>{data.adult ? "18+" : "0+"}</li>
              </ul>

              {/* Жанры */}
              <div className="mt-4 flex flex-wrap gap-2">
                {data.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded bg-[var(--tertiary)] px-3 py-1 text-xs sm:text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Описание */}
              <div className="mt-4 text-sm sm:text-base">
                <p className="mt-2">{data.overview}</p>
              </div>
            </div>

            {/* Кнопки — снизу блока */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="cursor-pointer bg-yellow-500 px-2 py-1 text-sm hover:bg-yellow-600 sm:text-base">
                <ClockIcon />
              </button>
              <button className="cursor-pointer bg-green-600 px-2 py-1 text-sm hover:bg-green-700 sm:text-base">
                <SuccessIcon />
              </button>
              <button className="cursor-pointer bg-blue-600 px-2 py-1 text-sm hover:bg-blue-700 sm:text-base">
                <PauseIcon />
              </button>
              <button className="cursor-pointer bg-[var(--tertiary)] p-3 text-sm sm:p-4 sm:text-base">
                Поставить оценку
              </button>
            </div>
          </div>

          {/* Оценки */}
          <div className="flex max-w-full flex-row justify-between gap-2 lg:max-w-[148px] lg:flex-col lg:justify-start">
            <div className="w-full bg-[var(--tertiary)] px-6 py-3 text-center text-sm sm:text-base">
              <p className="text-[18px] sm:text-[20px] md:text-[23px]">
                {data.vote_average.toFixed(1)} / 10
              </p>
            </div>
            <div className="w-full bg-[var(--accent)] px-6 py-3 text-center text-sm sm:text-base">
              <p className="text-[18px] sm:text-[20px] md:text-[23px]">
                — / 10
              </p>
            </div>
          </div>
        </div>

        {/* Фото */}
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

        {/* Актеры */}
        <HorizontalScrollList
          title="Актеры"
          items={credits}
          renderItem={(actor) => (
            <div className="overflow-hidden shadow">
              {actor.profile_path && (
                <img
                  className="max-w-[300px] shadow"
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                />
              )}
            </div>
          )}
        />
      </div>
    </>
  );
}

export default ContentDetailPage;
