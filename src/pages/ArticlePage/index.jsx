import { Link } from "react-router-dom";
import articles from "./article.json";

const ArticlePage = () => {
  return (
    <>
      <div>
        <h2 className="mb-6 text-3xl font-bold">Статьи</h2>
        <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li
              key={article.id}
              className="overflow-hidden bg-[var(--tertiary)] shadow-md"
            >
              <Link to={`/articles/${article.id}`} className="block">
                <img
                  src={article.image || ""}
                  alt={article.authorNickname || "автор"}
                  className="h-48 w-full object-cover"
                />
                <p className="mb-4 p-8">{article.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ArticlePage;
