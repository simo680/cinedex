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
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-4">
          {/* Постер */}
          <div className="md:col-span-1">
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title || data.name}
            />
          </div>

          {/* Основная информация */}
          <div className="space-y-4 md:col-span-2">
            <h1 className="text-5xl font-bold">{data.title || data.name}</h1>
            <ul className="flex gap-16 text-[18px]">
              <li> {data.release_date || data.first_air_date} </li>
              <li>{data.runtime || data.episode_run_time?.[0]} мин</li>
              <li> {data.adult ? "18+" : "0+"}</li>
            </ul>

            {/* Жанры */}
            <div className="flex flex-wrap gap-2">
              {data.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Описание */}
            <div className="mt-4">
              <p className="mt-2">{data.overview}</p>
            </div>

            {/* Кнопки */}
            <div className="mt-2 flex gap-2">
              <button className="cursor-pointer bg-yellow-500 px-2 py-1 hover:bg-yellow-600">
                <ClockIcon />
              </button>
              <button className="cursor-pointer bg-green-600 px-2 py-1 hover:bg-green-700">
                <SuccessIcon />
              </button>
              <button className="cursor-pointer bg-blue-600 px-2 py-1 hover:bg-blue-700">
                <PauseIcon />
              </button>
              <button className="cursor-pointer bg-[var(--tertiary)] p-4">
                Поставить оценку
              </button>
              {/* <button className="">Поддержать донатом</button> */}
            </div>
          </div>

          {/* Оценки */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <div className="rounded-xl p-4 text-center shadow">
              <h3 className="text-lg">Оценка пользователей</h3>
              <p className="text-3xl font-bold">
                {data.vote_average.toFixed(1)} / 10
              </p>
            </div>
            <div className="rounded-xl p-4 text-center shadow">
              <h3 className="text-lg">Моя оценка</h3>
              <p className="text-3xl font-bold">— / 10</p>
              {/* Здесь можно будет внедрить позже пользовательскую оценку */}
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
              className="w-full rounded shadow"
            />
          )}
        />

        {/* Актеры */}
        <HorizontalScrollList
          title="Актеры"
          items={credits}
          itemWidth="150px"
          renderItem={(actor) => (
            <div className="overflow-hidden rounded shadow">
              {actor.profile_path && (
                <img
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
