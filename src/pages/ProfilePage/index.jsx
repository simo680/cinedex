import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { uploadAvatar } from "../../services/supabase/supastore";
import supabase from "../../services/supabase/supabase";
import Loader from "../../components/ui/Loader";

const ProfilePage = () => {
  const { user, profile, setProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleUsernameChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  };

  const handleUsernameBlur = async () => {
    setIsEditing(false);
    if (!profile) return;

    const { error } = await supabase
      .from("profiles")
      .update({ username: profile.username })
      .eq("id", user.id);

    if (error) console.error("Ошибка обновления имени:", error.message);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    uploadAvatar(file, user, setProfile);
  };

  const logout = () => {
    const { error } = supabase.auth.signOut();
    if (error) console.error("Ошибка выхода:", error.message);
  };

  if (!profile) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center gap-6 p-4 md:flex-row md:items-center md:justify-between">
        <div className="group relative h-[200px] w-[200px] sm:h-[240px] sm:w-[240px] md:h-[280px] md:w-[280px]">
          <img
            src={profile.avatar_url || "/default-avatar.png"}
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

        <div className="w-full text-center md:flex-1 md:text-left">
          {isEditing ? (
            <input
              type="text"
              value={profile.username || "Пользователь"}
              onChange={handleUsernameChange}
              onBlur={handleUsernameBlur}
              autoFocus
              className="w-full border-b border-gray-400 bg-transparent text-2xl font-semibold focus:border-red-500 focus:outline-none"
            />
          ) : (
            <h2
              className="cursor-pointer text-2xl font-semibold transition hover:text-red-500"
              onClick={() => setIsEditing(true)}
            >
              {profile.username || "Пользователь"}
            </h2>
          )}
        </div>

        <div className="flex w-full flex-col gap-3 sm:max-w-xs md:w-auto">
          <button
            onClick={logout}
            className="w-full bg-[var(--tertiary)] p-3 text-sm sm:px-20 sm:text-base"
          >
            Выйти
          </button>
          <button className="w-full bg-[var(--accent)] p-3 text-sm sm:px-20 sm:text-base">
            <Link to="/add-film" className="block w-full text-center">
              Добавить кино
            </Link>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 p-8 sm:flex-row sm:justify-center sm:gap-8">
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
        <Link to="/watchlist?status=abandoned">
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
