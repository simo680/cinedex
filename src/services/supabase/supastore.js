import supabase from "./supabase";



// Получение профиля пользователя
// export const handleUsernameBlur = async (setIsEditing) => {
//   setIsEditing(false);
//   if (!profile) return;

//   const { error } = await supabase
//     .from("profiles")
//     .update({ username: profile.username })
//     .eq("id", user.id);

//   if (error) console.error("Ошибка обновления имени:", error.message);
// };

// Загрузка нового аватара
export const uploadAvatar = async (file, user, setProfile) => {
  if (!file || !user) return;

  const fileExt = file.name.split(".").pop();
  const fileName = `${user.id}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    console.error("Ошибка загрузки аватара:", uploadError.message);
    return;
  }

  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  const publicUrl = publicUrlData.publicUrl;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id);

  if (updateError) {
    console.error("Ошибка обновления аватара:", updateError.message);
    return;
  }

  // Обновляем профиль в контексте
  setProfile((prev) => ({
    ...prev,
    avatar_url: publicUrl,
  }));
};

// Поиск фильмов в Supabase
export const searchMoviesInSupabase = async (query) => {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .ilike("title", `%${query}%`);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


