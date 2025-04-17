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
      <form
        className="flex w-full items-center justify-center gap-4 sm:w-[80%] sm:gap-6 md:w-32 md:gap-7 lg:w-auto"
        onSubmit={handleSearchSubmit}
      >
        <button type="submit" aria-label="Поиск">
          <img
            src={searchIcon}
            alt="Иконка поиска"
            className="sm:h-6 sm:w-6 md:h-7 md:w-7"
          />
        </button>
        <input
          className="focus:border-accent w-full border-b-2 border-transparent bg-transparent px-2 py-1 text-sm text-white placeholder-gray-400 transition-all duration-200 outline-none hover:border-white sm:text-base md:text-lg"
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
