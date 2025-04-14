import { useRef } from "react";

const MovieRow = ({ title, movies }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - clientWidth
            : scrollLeft + clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="mb-2 flex items-center">
          <h2 className="flex-grow text-xl font-bold">{title}</h2>
          <button onClick={() => scroll("left")} className="mr-2 text-2xl">
            ←
          </button>
          <button onClick={() => scroll("right")} className="ml-2 text-2xl">
            →
          </button>
        </div>
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth"
        >
          {movies.map((movie) => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-[150px] rounded transition-transform hover:scale-105"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieRow;
