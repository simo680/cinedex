import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useState } from "react";

const CreateMoviePage = () => {
  const [isMovie, setIsMovie] = useState(true);

  const movieGenres = [
    { value: "Action", label: "Боевик" },
    { value: "Adventure", label: "Приключения" },
    { value: "Animation", label: "Анимация" },
    { value: "Comedy", label: "Комедия" },
    { value: "Crime", label: "Преступление" },
    { value: "Documentary", label: "Документальный" },
    { value: "Drama", label: "Драма" },
    { value: "Family", label: "Семейный" },
    { value: "Fantasy", label: "Фантастика" },
    { value: "History", label: "История" },
    { value: "Horror", label: "Ужасы" },
    { value: "Music", label: "Музыка" },
    { value: "Mystery", label: "Мистика" },
    { value: "Romance", label: "Романтика" },
    { value: "Science Fiction", label: "Научная фантастика" },
    { value: "TV Movie", label: "ТВ фильм" },
    { value: "Thriller", label: "Триллер" },
    { value: "War", label: "Война" },
    { value: "Western", label: "Вестерн" },
  ];

  // Жанры для сериалов на русском
  const tvGenres = [
    { value: "Action & Adventure", label: "Экшн и Приключения" },
    { value: "Animation", label: "Анимация" },
    { value: "Comedy", label: "Комедия" },
    { value: "Crime", label: "Преступление" },
    { value: "Documentary", label: "Документальный" },
    { value: "Drama", label: "Драма" },
    { value: "Family", label: "Семейный" },
    { value: "Kids", label: "Детский" },
    { value: "Mystery", label: "Мистика" },
    { value: "News", label: "Новости" },
    { value: "Reality", label: "Реалити-шоу" },
    { value: "Sci-Fi & Fantasy", label: "Научная фантастика и Фэнтези" },
    { value: "Soap", label: "Мыльная опера" },
    { value: "Talk", label: "Ток-шоу" },
    { value: "War & Politics", label: "Война и Политика" },
    { value: "Western", label: "Вестерн" },
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

  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
            name="type"
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
