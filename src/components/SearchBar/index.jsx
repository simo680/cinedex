import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/search.svg";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (query.trim() || event.key === "Enter") {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <>
      <form className="flex items-center gap-5" onSubmit={handleSearchSubmit}>
        <button className="" type="submit">
          <img src={searchIcon} alt="Лупа поиска" />
        </button>
        <input
          className="focus:border-accent w-full border-b-0 hover:border-b-2 bg-transparent p-2 text-white placeholder-gray-400 outline-none md:w-64"
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Поиск"
        />
      </form>
    </>
  );
};

export default SearchBar;
