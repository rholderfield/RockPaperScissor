"user strict";
const TOTALGAMES = 5;
let roundCounter = 1;

let userRoundWins = 0;
let computerRoundWins = 0;
let gameMoves = [];

const ROCK = [1, "ROCK"];
const PAPER = [2, "PAPER"];
const SCISSOR = [3, "SCISSOR"];

const PLAYERMESSAGE = "User Wins";
const COMPUTERMESSAGE = "PC Wins";
const DRAW = "DRAW";

let userSelection = document.getElementById("options");
let goButton = (document.getElementById("gameOn").onclick = function go() {
  playRound(userPlay(), computerPlay());
});

let reset = (document.getElementById("reset").onclick = function resetGame() {
  resetCounter();
  clearGame();
  document.getElementById("gameOn").disabled = false;
});

function resetCounter() {
  roundCounter = 1;
}

function clearGame() {
  let counter = 1;
  for (counter; counter <= TOTALGAMES; counter++) {
    document.querySelector(
      `body > div > div > main > div:nth-child(1) > div:nth-child(1) > table > tbody > tr:nth-child(${counter}) > td`
    ).innerText = null;

    document.querySelector(
      `body > div > div > main > div:nth-child(1) > div:nth-child(3) > table > tbody > tr:nth-child(${counter}) > td`
    ).innerText = null;

    document.querySelector(
      `body > div > div > main > div:nth-child(1) > div:nth-child(2) > table > tbody > tr:nth-child(${counter}) > td`
    ).innerText = null;
  }
}

function computerPlay() {
  min = Math.ceil(ROCK[0]);
  max = Math.floor(SCISSOR[0]);
  let computerMove = Math.floor(Math.random() * (max - min + 1)) + min;

  if (computerMove === ROCK[0]) {
    return ROCK;
  } else if (computerMove === PAPER[0]) {
    return PAPER;
  } else if (computerMove === SCISSOR[0]) {
    return SCISSOR;
  } else {
    console.log("Error");
  }
}

function userPlay() {
  let userMove = parseInt(userSelection.options.value);
  if (userMove === ROCK[0]) {
    return ROCK;
  } else if (userMove === PAPER[0]) {
    return PAPER;
  } else if (userMove === SCISSOR[0]) {
    return SCISSOR;
  } else {
    console.log("Error");
  }
}

function clearBoard() {
  gameMoves = [];
}

function playRound(playerSelection, computerSelection) {
  game(playerSelection, computerSelection);
  placeMatch(gameMoves);
  clearBoard();
  checkWinner();
  checkGameOver();
  roundCounter++;
}

function checkGameOver() {
  if (roundCounter === TOTALGAMES) {
    document.getElementById("gameOn").disabled = true;
    userRoundWins = 0;
    computerRoundWins = 0;
  }
}

function placeMatch(gameMoves) {
  if (roundCounter <= TOTALGAMES) {
    document.querySelector(
      `body > div > div > main > div:nth-child(1) > div:nth-child(1) > table > tbody > tr:nth-child(${roundCounter}) > td`
    ).innerText = gameMoves[0][1];
    document.querySelector(
      `body > div > div > main > div:nth-child(1) > div:nth-child(3) > table > tbody > tr:nth-child(${roundCounter}) > td`
    ).innerText = gameMoves[1][1];

    // need to code individual middle column entries with function check on winner
    if (gameMoves[2] === PLAYERMESSAGE) {
      document.querySelector(
        `body > div > div > main > div:nth-child(1) > div:nth-child(2) > table > tbody > tr:nth-child(${roundCounter}) > td`
      ).innerText = PLAYERMESSAGE;
    } else if (gameMoves[2] === COMPUTERMESSAGE) {
      document.querySelector(
        `body > div > div > main > div:nth-child(1) > div:nth-child(2) > table > tbody > tr:nth-child(${roundCounter}) > td`
      ).innerText = COMPUTERMESSAGE;
    } else if (gameMoves[2] === DRAW) {
      document.querySelector(
        `body > div > div > main > div:nth-child(1) > div:nth-child(2) > table > tbody > tr:nth-child(${roundCounter}) > td`
      ).innerText = DRAW;
    }
  }
}

function game(playerSelection, computerSelection) {
  if (playerSelection === ROCK && computerSelection === PAPER) {
    gameMoves.push(playerSelection, computerSelection, COMPUTERMESSAGE);
    computerRoundWins = computerRoundWins + 1;
    return;
  } else if (playerSelection === ROCK && computerSelection === SCISSOR) {
    gameMoves.push(playerSelection, computerSelection, PLAYERMESSAGE);
    userRoundWins = userRoundWins + 1;
    return;
  } else if (playerSelection === PAPER && computerSelection === SCISSOR) {
    gameMoves.push(playerSelection, computerSelection, COMPUTERMESSAGE);
    computerRoundWins = computerRoundWins + 1;
    return;
  } else if (computerSelection === ROCK && playerSelection === PAPER) {
    gameMoves.push(playerSelection, computerSelection, PLAYERMESSAGE);
    userRoundWins = userRoundWins + 1;
    return;
  } else if (computerSelection === ROCK && playerSelection === SCISSOR) {
    gameMoves.push(playerSelection, computerSelection, COMPUTERMESSAGE);
    computerRoundWins = computerRoundWins + 1;
    return;
  } else if (computerSelection === PAPER && playerSelection === SCISSOR) {
    gameMoves.push(playerSelection, computerSelection, PLAYERMESSAGE);
    userRoundWins = userRoundWins + 1;
    return;
  } else if (playerSelection === ROCK && computerSelection === ROCK) {
    gameMoves.push(playerSelection, computerSelection, DRAW);
  } else if (playerSelection === PAPER && computerSelection === PAPER) {
    gameMoves.push(playerSelection, computerSelection, DRAW);
  } else if (playerSelection === SCISSOR && computerSelection === SCISSOR) {
    gameMoves.push(playerSelection, computerSelection, DRAW);
  } else {
    console.log("Error");
  }
}

function checkWinner() {
  if (roundCounter === TOTALGAMES) {
    var snackbarContainer = document.querySelector("#game-announcer");
    var data = { message: "" };
    if (userRoundWins > computerRoundWins) {
      data.message = `${PLAYERMESSAGE} the Game! ${userRoundWins} out of ${computerRoundWins}`;
    } else if (computerRoundWins > userRoundWins) {
      data.message = `${COMPUTERMESSAGE} the Game! ${computerRoundWins} out of ${userRoundWins}`;
    } else if (computerRoundWins === userRoundWins) {
      data.message = `${DRAW}! ${userRoundWins} out of ${computerRoundWins}`;
    } else {
      data.message = "Error";
    }
    return snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }
}
