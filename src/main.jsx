import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./app/App.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import HomePage from "./pages/HomePage/index.jsx";
import MoviesPage from "./pages/MoviesPage/index.jsx";
import SeriesPage from "./pages/SeriesPage/index.jsx";
import SearchPage from "./pages/SearchPage/index.jsx";
import ArticlePage from "./pages/ArticlePage/index.jsx";
import ArticleDetailPage from "./pages/ArticleDetailPage/index.jsx";
import ProfilePage from "./pages/ProfilePage/index.jsx";
import WatchlistPage from "./pages/WatchlistPage/index.jsx";
import ContentDetailPage from "./pages/ContentDetailPage/index.jsx";
import ErrorPage from "./pages/ErrorPage/index.jsx";
import CreateMoviePage from "./pages/CreateMoviePage/index.jsx";
import AuthProvider from "./context/authProvider.jsx";
import LoaderProvider from "./context/loaderProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movies",
        element: <MoviesPage />,
      },
      {
        path: "/movies/:id",
        element: <ContentDetailPage type="movie" />,
      },
      {
        path: "/series",
        element: <SeriesPage />,
      },
      {
        path: "/series/:id",
        element: <ContentDetailPage type="tv" />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/articles",
        element: <ArticlePage />,
      },
      {
        path: "/articles/:id",
        element: <ArticleDetailPage />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/watchlist",

        element: (
          <ProtectedRoute>
            <WatchlistPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-film",
        element: (
          <ProtectedRoute>
            <CreateMoviePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <LoaderProvider>
        <RouterProvider router={router} />
      </LoaderProvider>
    </AuthProvider>
  </StrictMode>,
);
