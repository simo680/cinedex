import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../../services/supabase/supabase";
import { useAuth } from "../../context/useAuth";
import HorizontalScrollList from "../../components/HorizontalScrollList";

const ProfilePage = () => {
  const { user, setProfile } = useAuth();
  const [username, setUsername] = useState("Пользователь");
  const [avatarUrl, setAvatarUrl] = useState("/default-avatar.png");
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [movies, setMovies] = useState([]);

  // Загружаем профиль из Supabase
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Ошибка загрузки профиля:", error.message);
      } else {
        setUsername(data.username || "Пользователь");
        setAvatarUrl(data.avatar_url || "/default-avatar.png");
      }
    };

    fetchProfile();
  }, [user]);

  // Обновление имени пользователя
  const handleUsernameBlur = async () => {
    setIsEditing(false);
    const { error } = await supabase
      .from("profiles")
      .update({ username })
      .eq("id", user.id);
    if (error) console.error("Ошибка обновления имени:", error.message);
  };

  // Загрузка и обновление аватара
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        upsert: true,
      });

    if (uploadError) {
      console.error("Ошибка загрузки аватара:", uploadError.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    setAvatarUrl(publicUrl);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", user.id);

    if (!updateError) {
      // обновляем в контексте
      setProfile((prev) => ({
        ...prev,
        avatar_url: publicUrl,
      }));
    } else {
      console.error("Ошибка обновления аватара:", updateError.message);
    }

    if (updateError) {
      console.error("Ошибка обновления аватара:", updateError.message);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Ошибка выхода:", error.message);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="group relative h-[280px] w-[280px]">
          <img
            src={avatarFile ? URL.createObjectURL(avatarFile) : avatarUrl}
            alt="Аватар"
            className="h-full w-full rounded-full object-cover"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 text-2xl font-semibold opacity-0 transition-opacity group-hover:opacity-100"
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
              onBlur={handleUsernameBlur}
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

        <div className="flex flex-col items-end justify-center gap-3">
          <button
            onClick={logout}
            className="cursor-pointer bg-[var(--tertiary)] p-3 text-sm sm:px-20 sm:text-base"
          >
            Выйти
          </button>
          <button className="cursor-pointer bg-[var(--tertiary)] p-3 text-sm sm:px-20 sm:text-base">
            <Link to="/add-film">Добавить фильм</Link>
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-4 p-8">
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

//{
/* <HorizontalScrollList
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
      /> */
//}
