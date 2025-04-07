import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Поиск"
        />
        <button type="submit">Поиск</button>
      </form>
    </>
  );
};

export default SearchBar;
