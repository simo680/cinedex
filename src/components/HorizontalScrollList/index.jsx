import { useRef } from "react";
import LeftArrow from "../../assets/left-button.svg?react";
import RightArrow from "../../assets/right-button.svg?react";

const HorizontalScrollList = ({ title, items, renderItem, itemWidth = "150px" }) => {
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
    <div className="mb-8">
      {title && (
        <div className="mb-6 flex items-center">
          <h2 className="flex-grow text-3xl font-bold">{title}</h2>
          <button onClick={() => scroll("left")} className="mr-2">
            <LeftArrow className="transform cursor-pointer rounded-full transition-all hover:bg-red-500 hover:fill-white hover:text-white" />
          </button>
          <button onClick={() => scroll("right")} className="ml-2">
            <RightArrow className="transform cursor-pointer rounded-full transition-all hover:bg-red-500 hover:fill-white hover:text-white" />
          </button>
        </div>
      )}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth"
      >
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="shrink-0"
            style={{ minWidth: itemWidth }}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollList;
