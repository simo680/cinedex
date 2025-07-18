import Modal from "../Modal";

const AgreementModal = ({ isOpen, onAccept, onDecline }) => {
  return (
    <Modal isOpen={isOpen} onClose={onDecline}>
      <div className="max-h-[60vh] space-y-4 overflow-y-auto">
        <h2 className="text-xl font-semibold">Пользовательское соглашение</h2>
        <p className="text-sm leading-relaxed">
          Настоящее соглашение регулирует условия использования функций донатов.
          Все пожертвования осуществляются добровольно, возврат средств не
          предусмотрен. Нажимая "Принимаю", вы подтверждаете согласие с этими
          условиями.
        </p>

        <div className="flex justify-center gap-2 pt-4">
          <button
            onClick={onDecline}
            className="cursor-pointer rounded border border-gray-400 px-4 py-2 hover:brightness-90"
          >
            Не принимаю
          </button>
          <button
            onClick={onAccept}
            className="cursor-pointer rounded bg-[var(--accent)] px-4 py-2 hover:brightness-90"
          >
            Принимаю
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AgreementModal;
