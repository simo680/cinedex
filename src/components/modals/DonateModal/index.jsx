import Modal from "../Modal";
import { useState } from "react";
import clsx from "clsx";

const DonateModal = ({ isOpen, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [thankYouShown, setThankYouShown] = useState(false);

  const handleDonate = () => {
    const amount = selectedAmount || Number(customAmount);
    if (amount > 0) {
      setThankYouShown(true);
      setTimeout(() => {
        setThankYouShown(false);
        setSelectedAmount(null);
        setCustomAmount("");
        onClose();
      }, 1000);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {thankYouShown ? (
        <div className="flex min-h-[200px] items-center justify-center text-center text-lg font-semibold">
          Спасибо за оплату!
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="mb-4 text-xl font-bold">Выберите сумму доната</h2>
          <div className="flex gap-4">
            {[50, 100, 500, 2000].map((amount) => (
              <button
                key={amount}
                className={clsx("cursor-pointer rounded px-4 py-2", {
                  "bg-[var(--accent)]": selectedAmount === amount,
                  "bg-[var(--secondary)]": selectedAmount !== amount,
                })}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount("");
                }}
              >
                {amount}₽
              </button>
            ))}
          </div>
          <input
            type="number"
            className="mt-4 w-full rounded border px-4 py-2 outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Введите другую сумму"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
          />
          <button
            className="mt-4 w-full cursor-pointer rounded bg-[var(--accent)] py-2"
            onClick={handleDonate}
          >
            Оплатить
          </button>
        </div>
      )}
    </Modal>
  );
};

export default DonateModal;
