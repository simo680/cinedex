import { useEffect, useState } from "react";
import ActiveHalfStar from "../../../assets/active-half-star.svg?react";
import ActiveStar from "../../../assets/active-star.svg?react";
import Star from "../../../assets/star.svg?react";
import Modal from "../Modal";

const RatingModal = ({ isOpen, onClose, initialRating = 0, onSubmit }) => {
  const [userRating, setUserRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(null);
  const [averageRating, setAverageRating] = useState(initialRating);
  const [lastClicked, setLastClicked] = useState(null);

  useEffect(() => {
    setUserRating(initialRating);
    setAverageRating(initialRating);
  }, [initialRating]);

  if (!isOpen) return null;

  const handleClick = (clickedRating) => {
    let newRating = averageRating;

    if (lastClicked === clickedRating) {
      newRating = clickedRating;
    } else {
      newRating = clickedRating - 0.5;
    }

    newRating = Math.max(0, Math.min(10, newRating));
    setUserRating(newRating);
    setAverageRating(parseFloat(newRating.toFixed(1)));
    setLastClicked(clickedRating);
    onSubmit?.(newRating);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-4 text-center text-2xl font-bold">
        Выставление оценки
      </h2>
      <p className="mb-2 text-center text-[120px] font-bold">
        {averageRating || 0}{" "}
      </p>

      <div className="mb-4 flex justify-center gap-1">
        {Array.from({ length: 10 }, (_, i) => {
          const starValue = i + 1;

          let StarComponent = Star;

          const displayRating = hoverRating ?? userRating;

          if (displayRating !== null) {
            if (displayRating >= starValue) {
              StarComponent = ActiveStar;
            } else if (displayRating + 0.5 === starValue) {
              StarComponent = ActiveHalfStar;
            }
          }

          return (
            <StarComponent
              key={i}
              className="h-6 w-6 cursor-pointer transition-colors"
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => handleClick(starValue)}
            />
          );
        })}
      </div>
    </Modal>
  );
};

export default RatingModal;
