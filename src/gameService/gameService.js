import { gameMessages } from "../constans/constans";

export const gameService = {
  getDataFor: (name, choices) => ({
    name,
    points: 0,
    choice: choices[0],
  }),
  getInitialRoundData: () => ({
    count: 0,
    message: gameMessages.start,
    finalReuslt: gameMessages.notOver,
  }),
  getWinnerForRound: ([playerChoice, computerChoice]) => {
    if (playerChoice === computerChoice) {
      return "none";
    }

    const winComb = {
      rock: "scissors",
      scissors: "paper",
      paper: "rock",
    };

    return winComb[playerChoice] === computerChoice ? "player" : "computer";
  },
  updatePlayerData: (currentData) => ({
    ...currentData,
    points: currentData.points + 1,
  }),
};
