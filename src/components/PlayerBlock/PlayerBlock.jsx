import "./PlayerBlock.scss";
import { images } from "../../imagesService/imagesService";
import { pointsToWin } from "../../constans/constans";

export const PlayerBlock = ({ playerInfo, gameFinished }) => {
  const { name, points, isWin } = playerInfo;
  const playerNameTitle = name === "player" ? "Гравець" : "Комп’ютер";

  return (
    <div
      className={`player ${
        gameFinished && (isWin ? "player--win" : "player--lose")
      }`}
    >
      <div className="player__iconBlock">
        <img src={images[name]} className="player__icon" alt={name} />
      </div>

      <h2 className="player__name">{playerNameTitle}</h2>

      <div className="player__pointsBlock">
        {Array.from({ length: pointsToWin })
          .map((_, index) => (
            <img
              key={index}
              src={
                points >= index + 1 ? images.point_active : images.point_none
              }
              className="player__point"
              alt="point"
            />
          ))
          .reverse()}
      </div>
    </div>
  );
};
