import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useAuth } from "../../context/useAuth";
import { useState } from "react";
import supabase from "../../services/supabase/supabase";
const CreateMoviePage = () => {
  const { user } = useAuth();
  const [isMovie, setIsMovie] = useState(true);

  const movieGenres = [
    { value: "Боевик", label: "Боевик" },
    { value: "Приключение", label: "Приключения" },
    { value: "Анимация", label: "Анимация" },
    { value: "Комедия", label: "Комедия" },
    { value: "Преступление", label: "Преступление" },
    { value: "Документальный", label: "Документальный" },
    { value: "Драма", label: "Драма" },
    { value: "Семейный", label: "Семейный" },
    { value: "Фантастика", label: "Фантастика" },
    { value: "История", label: "История" },
    { value: "Ужасы", label: "Ужасы" },
    { value: "Музыка", label: "Музыка" },
    { value: "Мистика", label: "Мистика" },
    { value: "Романтика", label: "Романтика" },
    { value: "Научная Фантастика", label: "Научная фантастика" },
    { value: "ТВ фильм", label: "ТВ фильм" },
    { value: "Триллер", label: "Триллер" },
    { value: "Война", label: "Война" },
    { value: "Вестерн", label: "Вестерн" },
  ];

  // Жанры для сериалов на русском
  const tvGenres = [
    { value: "Экшн и Приключения", label: "Экшн и Приключения" },
    { value: "Анимация", label: "Анимация" },
    { value: "Комедия", label: "Комедия" },
    { value: "Преступление", label: "Преступление" },
    { value: "Документальный", label: "Документальный" },
    { value: "Драма", label: "Драма" },
    { value: "Семейный", label: "Семейный" },
    { value: "Детский", label: "Детский" },
    { value: "Мистика", label: "Мистика" },
    { value: "Новости", label: "Новости" },
    { value: "Реалити-шоу", label: "Реалити-шоу" },
    {
      value: "Научная фантастика и Фэнтези",
      label: "Научная фантастика и Фэнтези",
    },
    { value: "Мыльная опера", label: "Мыльная опера" },
    { value: "Ток-шоу", label: "Ток-шоу" },
    { value: "Война и Политика", label: "Война и Политика" },
    { value: "Война и Политика", label: "Вестерн" },
  ];

  const ageRatingOptions = [
    { value: "0+", label: "0+" },
    { value: "6+", label: "6+" },
    { value: "12+", label: "12+" },
    { value: "16+", label: "16+" },
    { value: "18+", label: "18+" },
  ];

  const monetizationOptions = [
    { value: "yes", label: "Да" },
    { value: "no", label: "Нет" },
  ];

  const { register, handleSubmit, control, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const {
        title,
        releaseDate,
        duration,
        ageRating,
        genres,
        monetization,
        description,
        poster,
        media_type,
      } = data;

      // 1. Обработка загрузки постера
      let posterUrl = null;
      const file = poster?.[0];

      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `posters/${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("posters") // Имя твоего bucket в Supabase Storage
          .upload(filePath, file);

        if (uploadError) {
          console.error("Ошибка при загрузке файла", uploadError.message);
          throw new Error("Ошибка при загрузке файла");
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("posters").getPublicUrl(filePath);

        posterUrl = publicUrl;
      }

      // 2. Добавление в таблицу movies
      const { error: insertError } = await supabase.from("movies").insert([
        {
          user_id: user.id,
          title,
          release_date: releaseDate,
          duration: parseInt(duration),
          age_rating: ageRating.value,
          genres: genres.map((genre) => genre.value),
          monetized: monetization?.value === "yes",
          description,
          poster_url: posterUrl,
          media_type: media_type.value,
        },
      ]);

      if (insertError) {
        console.error("Ошибка при добавлении фильма:", insertError.message);
        alert("Ошибка при добавлении фильма");
      } else {
        alert("Фильм успешно добавлен!");
        reset();
      }
    } catch (error) {
      console.error("Ошибка:", error.message);
      alert("Произошла ошибка при добавлении фильма");
    }
  };

  const customTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: "var(--muted)", // Цвет границы и фокуса
      neutral0: "var(--tertiary)", // Цвет фона
      neutral5: "var(--muted)", // Цвет границы
    },
  });

  // Объект со стилями
  const inputStyles = {
    base: "mt-1 w-full rounded border border-[var(--muted)] bg-[var(--tertiary)] p-2 outline-none",
    select: {
      control: (base) => ({
        ...base,
        marginTop: "0.25rem",
        width: "100%",
        cursor: "pointer",
        borderRadius: "0.25rem",
        border: "1px solid var(--muted)",
        backgroundColor: "var(--tertiary)",
        outline: "none",
      }),
      menu: (base) => ({
        ...base,
        backgroundColor: "var(--tertiary)",
        color: "var(--primary)",
        padding: "0.5rem",
      }),
      option: (base, state) => ({
        ...base,
        cursor: "pointer",
        color: "var(--primary)",
        backgroundColor: state.isFocused ? "var(--muted)" : "transparent",
      }),
      placeholder: (base) => ({
        ...base,
        color: "var(--primary)",
      }),
      singleValue: (base) => ({
        ...base,
        color: "var(--primary)",
      }),
      inputContainer: (base) => ({
        ...base,
        backgroundColor: "var(--primary)",
      }),
    },
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-xl space-y-4 p-6"
      >
        <h2 className="text-center text-2xl font-bold">
          Форма для добавления фильма/сериала
        </h2>

        <div>
          <label className="block">Тип</label>
          <Controller
            name="media_type"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "movie", label: "Фильм" },
                  { value: "tv", label: "Сериал" },
                ]}
                theme={customTheme}
                styles={inputStyles.select}
                placeholder="Выберите тип"
                isSearchable={false}
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                  setIsMovie(selectedOption.value === "movie");
                }}
              />
            )}
          />
        </div>

        <div>
          <label className="block">Название фильма/сериала</label>
          <input
            {...register("title", { required: true })}
            className={inputStyles.base}
            placeholder="Введите название фильма"
          />
        </div>

        <div>
          <label className="block">Дата выпуска</label>
          <input
            type="date"
            {...register("releaseDate", { required: true })}
            className={inputStyles.base}
          />
        </div>

        <div>
          <label className="block">Длительность фильма (в минутах)</label>
          <input
            type="number"
            {...register("duration", { required: true })}
            className={inputStyles.base}
          />
        </div>

        <div>
          <label className="block">Возрастной рейтинг</label>
          <Controller
            name="ageRating"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={ageRatingOptions}
                classNamePrefix="custom-select"
                theme={customTheme}
                styles={inputStyles.select}
                placeholder="Выберите рейтинг"
              />
            )}
          />
        </div>

        <div>
          <label className="block">Жанры</label>
          <Controller
            name="genres"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={isMovie ? movieGenres : tvGenres}
                isMulti
                classNamePrefix="custom-select"
                theme={customTheme}
                styles={inputStyles.select}
                placeholder="Выберите жанры"
              />
            )}
          />
        </div>

        <div>
          <label className="block">Монетизация</label>
          <Controller
            name="monetization"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={monetizationOptions}
                classNamePrefix="custom-select"
                theme={customTheme}
                styles={inputStyles.select}
                placeholder="Не выбрано"
              />
            )}
          />
        </div>

        <div>
          <label className="block">Описание фильма</label>
          <textarea
            {...register("description")}
            className={`${inputStyles.base} resize-none`}
            rows="6"
            placeholder="Введите краткое описание фильма"
          />
        </div>

        <div>
          <label className="block">Обложка фильма</label>
          <input
            type="file"
            {...register("poster")}
            className={inputStyles.base}
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded bg-red-700 py-2 text-white outline-none hover:bg-red-800"
        >
          Отправить
        </button>
      </form>
    </>
  );
};

export default CreateMoviePage;
