import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";
import Logo from "../../assets/square.svg?react";
import CloseIcon from "../../assets/close.svg?react";
import clsx from "clsx";
import AuthModal from "../AuthModal";

const Header = () => {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleLoginClick = () => setIsAuthOpen(true);
  const handleCloseAuthModal = () => setIsAuthOpen(false);

  const user = null;

  return (
    <>
      <header className="flex w-full items-center justify-between bg-[var(--header-bg)] p-[20px] text-center sm:text-[12px] md:text-[14px] lg:text-[18px]">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-4">
            <Logo className="h-[32px] w-[32px] sm:h-[36px] sm:w-[36px] md:h-[40px] md:w-[40px] lg:h-[43px] lg:w-[44px]" />
            <h1 className="font-[Fira_Code] sm:text-[14px] md:text-[18px] lg:text-[21px]">
              Cinedex
            </h1>
          </Link>
        </div>

        <div className="flex w-full max-w-[500px] flex-1 items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10">
          <SearchBar />
        </div>

        {/* Основное меню для больших экранов */}
        <ul className="align-center hidden items-center justify-center space-x-6 md:flex">
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
            {user ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-gray-300"
                onClick={handleLinkClick}
              >
                <img
                  src={user.avatar || "../default-avatar.png"}
                  alt="Аватар"
                  className="h-14 w-14 rounded-full object-cover"
                />
              </Link>
            ) : (
              <span
                onClick={handleLoginClick}
                className="cursor-pointer hover:text-gray-300"
              >
                Войти
              </span>
            )}
          </li>
        </ul>

        {/* Кнопка для мобильных устройств */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={clsx(
              "text-white",
              { "font-bold": menuOpen },
              "cursor-pointer",
            )}
          >
            Меню
          </button>
        </div>
      </header>

      {/* Мобильное меню */}
      <div
        className={clsx(
          "bg-opacity-50 fixed inset-0 z-1 bg-[var(--secondary)] md:hidden",
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
            className="absolute top-4 right-4 cursor-pointer"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={handleCloseAuthModal} />
    </>
  );
};

export default Header;
