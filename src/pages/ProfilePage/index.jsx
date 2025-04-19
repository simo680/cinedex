import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import  supabase  from "../../services/supabase/supabase"; // подключение клиента
import HorizontalScrollList from "../../components/HorizontalScrollList";

// Заглушки для фильмов, добавленных пользователем (только постеры)
const dummyMovies = [
  { id: 1, poster_path: "/path_to_poster1.jpg" },
  { id: 2, poster_path: "/path_to_poster2.jpg" },
  { id: 3, poster_path: "/path_to_poster3.jpg" },
];



const ProfilePage = () => {
  const [username, setUsername] = useState("username123");
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  // useEffect(() => {
  //   // Получение ID текущего пользователя (например, из авторизации)
  //   const fetchUser = async () => {
  //     const user = supabase.auth.user(); // Получаем текущего авторизованного пользователя
  //     if (user) {
  //       setUserId(user.id); // Сохраняем ID пользователя
  //     }
  //   };
  //   fetchUser();
  // }, []);

  // useEffect(() => {
  //   if (!userId) return; // Если ID пользователя нет, не запрашиваем фильмы

  //   const fetchMovies = async () => {
  //     const { data, error } = await supabase
  //       .from("movies")
  //       .select("id, poster_path")
  //       .eq("user_id", userId); // Запрос только фильмов, добавленных этим пользователем

  //     if (error) {
  //       console.error("Ошибка при загрузке фильмов:", error);
  //     } else {
  //       setMovies([
  //         { id: "addFilm", poster_path: "/add-film-icon.jpg" },
  //         ...data,
  //       ]);
  //     }
  //   };

  //   fetchMovies();
  // }, [userId]); // Запрашиваем фильмы, когда userId изменится

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="group relative h-[280px] w-[280px]">
          <img
            src={
              avatarFile
                ? URL.createObjectURL(avatarFile)
                : "/default-avatar.png"
            }
            alt="Аватар"
            className="h-full w-full rounded-full object-cover"
          />

          <label
            htmlFor="avatar-upload"
            className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 text-center text-2xl font-semibold opacity-0 transition-opacity group-hover:opacity-100"
          >
            Изменить фото
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <div className="ml-6 flex-1">
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setIsEditing(false)}
              autoFocus
              className="border-b border-gray-400 bg-transparent text-2xl font-semibold focus:border-red-500 focus:outline-none"
            />
          ) : (
            <h2
              className="cursor-pointer text-2xl font-semibold transition hover:text-red-500"
              onClick={() => setIsEditing(true)}
            >
              {username}
            </h2>
          )}
        </div>
        <div className="flex flex-col items-end justify-center">
          <button className="cursor-pointer bg-[var(--tertiary)] p-3 text-sm sm:px-20 sm:text-base">
            Выйти
          </button>
        </div>
      </div>
      {/* <HorizontalScrollList
        title="Мои фильмы"
        items={movies}
        renderItem={(item) =>
          item.id === "addFilm" ? (
            <Link to="/add-film">
              <div className="flex h-[225px] w-[150px] flex-col items-center justify-center rounded-xl bg-[var(--tertiary)]">
                <span className="text-[200px] leading-none">+</span>
                <span className="text-2xl">Добавить фильм</span>
              </div>
            </Link>
          ) : (
            <div key={item.id} className="shrink-0">
              <Link to={`/movies/${item.id}`}>
                <img
                  src={item.poster_path}
                  alt="Movie Poster"
                  className="h-[225px] w-[150px] rounded-xl transition-transform hover:scale-105"
                />
              </Link>
            </div>
          )
        }
        itemWidth="160px"
      /> */}
      <p className="text-center p-20">Горизонатальная прокрутка</p>
      <div className="flex justify-center gap-4">
        <Link to="/watchlist?status=watching">
          <img
            src="../frames/frame-watching.png"
            alt="Буду смотреть"
            className="cursor-pointer transition-transform hover:scale-105"
          />
        </Link>
        <Link to="/watchlist?status=watched">
          <img
            src="../frames/frame-watched.png"
            alt="Просмотрено"
            className="cursor-pointer transition-transform hover:scale-105"
          />
        </Link>
        <Link to="/watchlist?status=dropped">
          <img
            src="../frames/frame-dropped.png"
            alt="Заброшено"
            className="cursor-pointer transition-transform hover:scale-105"
          />
        </Link>
      </div>
    </>
  );
};

export default ProfilePage;
