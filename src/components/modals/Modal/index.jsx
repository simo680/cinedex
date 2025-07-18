import { useEffect } from "react";
import { createPortal } from "react-dom";
// import CloseIcon from "../../../assets/close.svg?react";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-2 flex items-center justify-center bg-black/30 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-lg bg-[var(--tertiary)] p-10 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 cursor-pointer"
          onClick={onClose}
          aria-label="Закрыть модалку"
        >
          {/* <CloseIcon className="h-6 w-6" /> */}
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
