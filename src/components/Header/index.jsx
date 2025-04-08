import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";
import Logo from "../../assets/square.svg?react";
import clsx from "clsx";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="flex items-center justify-between bg-[var(--header-bg)] p-[20px] text-[12px] lg:text-[18px]">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-4">
            <Logo />
            <h1 className="text-xl">Cinedex</h1>
          </Link>
        </div>

        <div className="hidden md:block">
          <SearchBar />
        </div>

        {/* Основное меню для больших экранов */}
        <ul className="hidden space-x-6 md:flex">
          <li>
            <Link
              to="/movies"
              className={clsx("hover:text-gray-300", {
                "font-bold": isActive("/movies"),
              })}
              onClick={handleLinkClick}
            >
              Фильмы
            </Link>
          </li>
          <li>
            <Link
              to="/series"
              className={clsx("hover:text-gray-300", {
                "font-bold": isActive("/series"),
              })}
              onClick={handleLinkClick}
            >
              Сериалы
            </Link>
          </li>
          <li>
            <Link
              to="/watchlist"
              className={clsx("hover:text-gray-300", {
                "font-bold": isActive("/watchlist"),
              })}
              onClick={handleLinkClick}
            >
              Мой список
            </Link>
          </li>
          <li>
            <Link
              to="/articles"
              className={clsx("hover:text-gray-300", {
                "font-bold": isActive("/articles"),
              })}
              onClick={handleLinkClick}
            >
              Статьи
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={clsx("hover:text-gray-300", {
                "font-bold": isActive("/profile"),
              })}
              onClick={handleLinkClick}
            >
              Профиль
            </Link>
          </li>
        </ul>

        {/* Кнопка для мобильных устройств */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={clsx("text-white", { "font-bold": menuOpen })} // Кнопка тоже может быть жирной
          >
            Меню
          </button>
        </div>
      </header>

      {/* Мобильное меню */}
      <div
        className={clsx(
          "bg-opacity-50 fixed inset-0 z-10 bg-[var(--secondary)] md:hidden",
          { block: menuOpen, hidden: !menuOpen },
        )}
      >
        <div className="h-full w-64 bg-[var(--secondary)] p-6">
          <ul className="space-y-4 text-white">
            <li>
              <Link
                to="/movies"
                onClick={() => {
                  handleLinkClick();
                }}
                className={clsx({ "font-bold": isActive("/movies") })}
              >
                Фильмы
              </Link>
            </li>
            <li>
              <Link
                to="/series"
                onClick={() => {
                  handleLinkClick();
                }}
                className={clsx({ "font-bold": isActive("/series") })}
              >
                Сериалы
              </Link>
            </li>
            <li>
              <Link
                to="/watchlist"
                onClick={() => {
                  handleLinkClick();
                }}
                className={clsx({ "font-bold": isActive("/watchlist") })}
              >
                Мой список
              </Link>
            </li>
            <li>
              <Link
                to="/articles"
                onClick={() => {
                  handleLinkClick();
                }}
                className={clsx({ "font-bold": isActive("/articles") })}
              >
                Статьи
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                onClick={() => {
                  handleLinkClick();
                }}
                className={clsx({ "font-bold": isActive("/profile") })}
              >
                Профиль
              </Link>
            </li>
          </ul>
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white"
          >
            
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
