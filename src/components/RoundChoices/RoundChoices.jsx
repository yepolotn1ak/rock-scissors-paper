import "./RoundChoices.scss";
import { images } from "../../imagesService/imagesService";

export const RoundChoices = ({ playersData, isAnimating }) => {
  return (
    <div className="roundChoices">
      {playersData.map(({ name, choice }) => (
        <img
          key={name}
          src={images[choice]}
          className={`roundChoices__${name} ${
            isAnimating && `roundChoices__${name}--animate`
          }`}
        />
      ))}
    </div>
  );
};
