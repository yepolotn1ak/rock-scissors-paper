import "./ChoiceSelect.scss";
import { images } from "../../imagesService/imagesService";

export const ChoiceSelect = ({
  choices,
  gameFinished,
  isAnimating,
  handlePlayerChoice,
}) => {
  return (
    <div className="choiceSelect">
      {!gameFinished && (
        <div className="choiceSelect__buttons">
          {choices.map((choice) => (
            <button
              key={choice}
              className="choiceSelect__button"
              onClick={() => handlePlayerChoice(choice)}
              disabled={isAnimating}
            >
              <img
                src={images[choice]}
                className="choiceSelect__button--image"
              />
            </button>
          ))}
        </div>
      )}

      {gameFinished && (
        <button
          className="choiceSelect__restartButton"
          onClick={() => window.location.reload()}
        >
          Почати заново!
        </button>
      )}
    </div>
  );
};
