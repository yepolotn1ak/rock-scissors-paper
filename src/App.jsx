import "./App.scss";
import { useEffect, useState } from "react";
import { PlayerBlock } from "./components/PlayerBlock/PlayerBlock";
import { RoundChoices } from "./components/RoundChoices/RoundChoices";
import { Messages } from "./components/Messages/Messages";
import { ChoiceSelect } from "./components/ChoiceSelect/ChoiceSelect";
import { gameService } from "./gameService/gameService";
import {
  choices,
  gameMessages,
  pointsToWin,
} from "./constans/constans";

export const App = () => {
  const [playerData, setPlayerData] = useState(
    gameService.getDataFor("player", choices)
  );
  const [computerData, setComputerData] = useState(
    gameService.getDataFor("computer", choices)
  );
  const [roundData, setRoundData] = useState(gameService.getInitialRoundData);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const updateRoundData = (message) => {
    setRoundData((currentData) => ({
      ...currentData,
      count: currentData.count + 1,
      message,
    }));
  };

  const takeRockBeforeChoice = () => {
    setPlayerData((currentData) => ({ ...currentData, choice: choices[0] }));
    setComputerData((currentData) => ({ ...currentData, choice: choices[0] }));
  };

  const handlePlayerChoice = (choice) => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    takeRockBeforeChoice();
    setIsAnimating(true);

    setTimeout(() => {
      const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];

      setPlayerData((currentData) => ({ ...currentData, choice }));
      setComputerData((currentData) => ({
        ...currentData,
        choice: computerChoice,
      }));

      const roundWinner = gameService.getWinnerForRound([
        choice,
        computerChoice,
      ]);

      if (roundWinner === "player") {
        setPlayerData(gameService.updatePlayerData);
        updateRoundData(gameMessages.playerPoint);
      } else if (roundWinner === "computer") {
        setComputerData(gameService.updatePlayerData);
        updateRoundData(gameMessages.computerPoint);
      } else {
        updateRoundData(gameMessages.draw);
      }

      setIsAnimating(false);
    }, 2000);
  };

  useEffect(() => {
    if (playerData.points === pointsToWin) {
      setPlayerData(currentData => ({ ...currentData, isWin: true }))
      setGameFinished(true);
      setRoundData((currentData) => ({
        ...currentData,
        finalReuslt: gameMessages.playerWin,
      }));
    }

    if (computerData.points === pointsToWin) {
      setComputerData(currentData => ({ ...currentData, isWin: true }))
      setGameFinished(true);
      setRoundData((currentData) => ({
        ...currentData,
        finalReuslt: gameMessages.computerWin,
      }));
    }
  }, [computerData.points, playerData.points]);

  return (
    <div className="App">
      <h1 className="App__title">Камінь Ножиці Папір</h1>

      <div className="App__game">
        <PlayerBlock playerInfo={playerData} gameFinished={gameFinished} />

        <div className="App__choiceBlock">
          <RoundChoices
            playersData={[playerData, computerData]}
            isAnimating={isAnimating}
          />

          <Messages roundData={roundData} />

          <ChoiceSelect
            choices={choices}
            gameFinished={gameFinished}
            isAnimating={isAnimating}
            handlePlayerChoice={handlePlayerChoice}
          />
        </div>

        <PlayerBlock playerInfo={computerData} gameFinished={gameFinished}/>
      </div>
    </div>
  );
};
