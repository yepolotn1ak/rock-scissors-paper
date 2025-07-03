import { useEffect, useState } from "react";
import "./App.scss";

const choices = ["rock", "scissors", "paper"];

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
  const [gameOver, setGameOver] = useState(false);

  const handlePlayerChoice = (choice) => {
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

  useEffect(() => {
    if (playerData.choice === computerData.choice) {
      setRoundData((currentData) => ({
        ...currentData,
        count: currentData.count + 1,
        message: gameMessages.draw,
      }));
      return;
    }

    const roundWinner = getWinnerForRound([
      playerData.choice,
      computerData.choice,
    ]);

    if (roundWinner === "player") {
      setPlayerData(updatePlayerData);
      setRoundData((currentData) => ({
        ...currentData,
        count: currentData.count + 1,
        message: gameMessages.playerPoint,
      }));
      return;
    }

    if (roundWinner === "computer") {
      setComputerData(updatePlayerData);
      setRoundData((currentData) => ({
        ...currentData,
        count: currentData.count + 1,
        message: gameMessages.computerPoint,
      }));
      return;
    }
  }, [computerData.choice, playerData.choice]);

  useEffect(() => {
    if (playerData.points.count === 5) {
      setGameOver(true);
      setRoundData((currentData) => ({
        ...currentData,
        finalReuslt: gameMessages.playerWin,
      }));
    }

    if (computerData.points.count === 5) {
      setGameOver(true);
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
            <img
              src="/images/player.svg"
              className="App__player--icon"
              alt="player icon"
            />
          </div>

          <h2 className="App__player--name">Гравець</h2>

          <div className="App__player--pointsBlock">
            {playerData.points.list.map((name) => (
              <img
                src={`/images/point-${name}.svg`}
                className="App__player--point"
              />
            ))}
          </div>
        </div>

        <div className="App__choiceBlock">
          <div className="App__choices">
            {[playerData, computerData].map(({ name, choice }) => (
              <img
                src={`/images/${choice}.svg`}
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
            {!gameOver && (
              <div className="App__buttons">
                {choices.map((choice) => (
                  <button
                    className="App__buttons--button"
                    onClick={() => handlePlayerChoice(choice)}
                    disabled={isAnimating}
                  >
                    <img
                      src={`/images/${choice}.svg`}
                      className="App__buttons--image"
                    />
                  </button>
                ))}
              </div>
            )}

            {gameOver && (
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
            <img
              src="/images/computer.svg"
              className="App__player--icon"
              alt="player icon"
            />
          </div>

          <h2 className="App__player--name">Комп`ютер</h2>

          <div className="App__player--pointsBlock">
            {computerData.points.list.map((name) => (
              <img
                src={`/images/point-${name}.svg`}
                className="App__player--point"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
