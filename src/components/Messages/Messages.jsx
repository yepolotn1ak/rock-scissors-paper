import "./Messages.scss";

export const Messages = ({ roundData }) => {
  const { count, message, finalReuslt } = roundData;

  return (
    <div className="messages">
      {count === 0 ? (
        <h2 className="messages__title">Розпочнімо гру</h2>
      ) : (
        <h2 className="messages__title">{`Раунд №${count}`}</h2>
      )}

      <h2 className="messages__message">{message}</h2>

      <h2 className="messages__title">Результат гри:</h2>

      <h2 className="messages__message">{finalReuslt}</h2>
    </div>
  );
};
