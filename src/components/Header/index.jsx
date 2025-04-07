import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

const Header = () => {
  return (
    <>
      <header className="">
        <SearchBar />
        <ul>
          <Link to="/movies">Фильмы</Link>
          <Link to="/series">Сериалы</Link>
          <Link to="/watchlist">Мой список</Link>
          <Link to="/articles">Статьи</Link>
          <Link to="/profile">
            <img src="" alt="" />
          </Link>
        </ul>
      </header>
    </>
  );
};

export default Header;
