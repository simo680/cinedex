import { useParams, useNavigate } from "react-router-dom";
import articles from "../ArticlePage/article.json";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.id === parseInt(id));

  if (!article) {
    return <p className="text-center text-red-500">Статья не найдена.</p>;
  }

  return (
    <>
      <div className="relative min-h-screen">
        <button
          onClick={() => navigate(-1)}
          className="mt-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-red-500 text-red-500 transition hover:bg-red-500 hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 pt-8 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-3xl">
          <div className="mb-6 flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:gap-6">
              <div className="flex items-center gap-2">
                <img
                  src={article.authorLogo || "автор"}
                  alt=""
                  className="h-10 w-10 object-cover rounded-full"
                />
                <p>{article.authorNickname}</p>
              </div>
              <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
              <p>{article.genre}</p>
            </div>

            <h1 className="mb-4 text-3xl leading-tight font-bold sm:text-4xl">
              {article.title}
            </h1>

            <p className="text-lg leading-relaxed">{article.content}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetailPage;
