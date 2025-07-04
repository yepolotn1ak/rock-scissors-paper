import { useEffect, useState } from "react";
import "./App.scss";

import player from "./images/player.svg";
import computer from "./images/computer.svg";
import rock from "./images/rock.svg";
import scissors from "./images/scissors.svg";
import paper from "./images/paper.svg";
import point_none from "./images/point-none.svg";
import point_active from "./images/point-active.svg";

const choices = ["rock", "scissors", "paper"];

const imagesMap = {
  rock,
  scissors,
  paper,
  "point-none": point_none,
  "point-active": point_active,
};

const initialPoints = {
  count: 0,
  list: Array.from({ length: 5 }, () => "none"),
};

const gameMessages = {
  playerPoint: "Гравець отримав очок!",
  computerPoint: "Комп`ютер отримав очок!",
  draw: "Нічия, ніхто не отримав очки!",
  start: "Оберіть хід, щоб почати перший раунд!",
  playerWin: "Гравець переміг!!!",
  computerWin: "Комп`ютер переміг!!!",
  notOver: "Гра ще триває!",
};

const initialRoundsData = {
  count: 0,
  message: gameMessages.start,
  finalReuslt: gameMessages.notOver,
};

const getDataForPlayer = (name) => ({
  name,
  points: initialPoints,
  choice: choices[0],
});

const getWinnerForRound = (choicesCombination) => {
  const preparedChoices = choicesCombination.join("-");
  const playerWinComb = ["rock-scissors", "scissors-paper", "paper-rock"];
  const computerWinComb = ["scissors-rock", "paper-scissors", "rock-paper"];

  if (playerWinComb.includes(preparedChoices)) {
    return "player";
  }

  if (computerWinComb.includes(preparedChoices)) {
    return "computer";
  }

  return "none";
};

const updatePlayerData = (currentData) => ({
  ...currentData,
  points: {
    count: currentData.points.count + 1,
    list: currentData.points.list.map((point, index) => {
      return index === currentData.points.count ? "active" : point;
    }),
  },
});

export const App = () => {
  const [playerData, setPlayerData] = useState(getDataForPlayer("player"));
  const [computerData, setComputerData] = useState(
    getDataForPlayer("computer")
  );
  const [roundData, setRoundData] = useState(initialRoundsData);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const handlePlayerChoice = (choice) => {
    setGameStarted(true);
    setIsAnimating(true);

    setTimeout(() => {
      setPlayerData((currentData) => ({ ...currentData, choice }));
      handleComputerChoice();
      setIsAnimating(false);
    }, 2000);
  };

  const handleComputerChoice = () => {
    setComputerData((currentData) => ({
      ...currentData,
      choice: choices[Math.floor(Math.random() * choices.length)],
    }));
  };

  const updateRoundData = (message) => {
    setRoundData((currentData) => ({
      ...currentData,
      count: currentData.count + 1,
      message,
    }));
  };

  useEffect(() => {
    const roundWinner = getWinnerForRound([
      playerData.choice,
      computerData.choice,
    ]);

    if (roundWinner === "player") {
      setPlayerData(updatePlayerData);
      updateRoundData(gameMessages.playerPoint);
    } else if (roundWinner === "computer") {
      setComputerData(updatePlayerData);
      updateRoundData(gameMessages.computerPoint);
    } else if (roundWinner === "none" && gameStarted) {
      updateRoundData(gameMessages.draw);
    }
  }, [computerData.choice, playerData.choice]);

  useEffect(() => {
    if (playerData.points.count === 5) {
      setGameFinished(true);
      setRoundData((currentData) => ({
        ...currentData,
        finalReuslt: gameMessages.playerWin,
      }));
    }

    if (computerData.points.count === 5) {
      setGameFinished(true);
      setRoundData((currentData) => ({
        ...currentData,
        finalReuslt: gameMessages.computerWin,
      }));
    }
  }, [computerData.points.count, playerData.points.count]);

  return (
    <div className="App">
      <h1 className="App__title">Камінь Ножиці Папір</h1>

      <div className="App__players">
        <div className="App__player">
          <div className="App__player--iconBlock">
            <img src={player} className="App__player--icon" />
          </div>

          <h2 className="App__player--name">Гравець</h2>

          <div className="App__player--pointsBlock">
            {playerData.points.list.map((name) => (
              <img
                key={Math.random()}
                src={imagesMap[`point-${name}`]}
                className="App__player--point"
              />
            ))}
          </div>
        </div>

        <div className="App__choiceBlock">
          <div className="App__choices">
            {[playerData, computerData].map(({ name, choice }) => (
              <img
                key={name}
                src={imagesMap[choice]}
                className={`App__choices--${name} ${
                  isAnimating && `App__choices--${name}-animate`
                }`}
              />
            ))}
          </div>

          <div className="App__messages">
            {roundData.count === 0 ? (
              <h2 className="App__messages--title">Розпочнімо гру</h2>
            ) : (
              <h2 className="App__messages--title">{`Раунд №${roundData.count}`}</h2>
            )}

            <h2 className="App__messages--message">{roundData.message}</h2>

            <h2 className="App__messages--title">Остаточно переміг:</h2>

            <h2 className="App__messages--message">{roundData.finalReuslt}</h2>
          </div>

          <div className="App__bottom">
            {!gameFinished && (
              <div className="App__buttons">
                {choices.map((choice) => (
                  <button
                    key={choice}
                    className="App__buttons--button"
                    onClick={() => handlePlayerChoice(choice)}
                    disabled={isAnimating}
                  >
                    <img
                      src={imagesMap[choice]}
                      className="App__buttons--image"
                    />
                  </button>
                ))}
              </div>
            )}

            {gameFinished && (
              <button
                className="App__restartButton"
                onClick={() => window.location.reload()}
              >
                Почати заново!
              </button>
            )}
          </div>
        </div>

        <div className="App__player">
          <div className="App__player--iconBlock">
            <img src={computer} className="App__player--icon" />
          </div>

          <h2 className="App__player--name">Комп`ютер</h2>

          <div className="App__player--pointsBlock">
            {computerData.points.list.map((name) => (
              <img
                key={Math.random()}
                src={imagesMap[`point-${name}`]}
                className="App__player--point"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
