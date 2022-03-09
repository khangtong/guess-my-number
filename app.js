"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const body = $("body");
const number = $(".number");
const againBtn = $(".btn.again");
const checkBtn = $(".btn.check");
const inputGuess = $(".guess");
const message = $(".message");
const curScore = $(".score");
const highscore = $(".highscore");

let isSuccess = false;
let myNum = 0;
let score = 20;

window.addEventListener("load", function () {
  myNum += Math.ceil(Math.random() * 20);
});

// Change style of css when user check correct number
function changeStyleCSS() {
  if (isSuccess) {
    body.style.backgroundColor = "#60b347";
    number.style.width = "30rem";
  } else {
    body.style.backgroundColor = "#222";
    number.style.width = "15rem";
  }
}

// Display message on UI
function displayMessage(mess) {
  message.textContent = mess;
}

// Handle when user click check button
checkBtn.addEventListener("click", function () {
  const guessNum = Number(inputGuess.value);

  if (!guessNum) {
    isSuccess = false;
    displayMessage("⛔ No number!");
  } else if (guessNum !== myNum) {
    isSuccess = false;
    displayMessage(guessNum > myNum ? "📈 Too high!" : "📉 Too low!");
    handleScore();
  } else if (guessNum === myNum) {
    isSuccess = true;
    displayMessage("🎉 Correct number!");
    number.textContent = myNum;
    if (Number(score) > Number(highscore.innerHTML)) {
      highscore.innerHTML = score;
    }
  }

  changeStyleCSS();
});

// Handle when the score = 0
function handleScore() {
  score--;
  if (score === 0) {
    displayMessage("😑 Game over! please try again");
    checkBtn.disabled = true;
  }
  curScore.textContent = score;
}

// Handle when user click again button
againBtn.addEventListener("click", function () {
  isSuccess = false;
  myNum = 0;
  myNum += Math.ceil(Math.random() * 20);
  checkBtn.disabled = false;
  inputGuess.value = "";
  score = 20;
  number.textContent = "?";
  curScore.textContent = score;
  displayMessage("Start guessing...");
  changeStyleCSS();
});
