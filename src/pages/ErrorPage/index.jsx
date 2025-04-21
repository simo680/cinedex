import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="p-0 text-[120px] leading-none font-bold text-[var(--accent)] md:text-[250px]">
        404
      </h1>
      <h2 className="mb-6 text-[24px] md:text-[32px]">Страница не найдена</h2>

      <Link
        to="/"
        className="inline-flex items-center justify-center bg-[var(--tertiary)] px-8 py-3 text-white transition hover:opacity-80 md:px-32 md:py-4"
      >
        Вернуться на главную
      </Link>
    </div>
  );
};

export default ErrorPage;
