'use strict';

const guessesContainer = document.querySelector('.guesses-container');
const keyboard = document.querySelector('.keyboard');

const GUESS_ROWS = 6;
let row = 1;
let column = 1;

let guessRowEl, guessColumnEl;

const init = function () {
  let rowsString = '';

  // Dynamically generate 6 rows
  for (let i = 0; i < GUESS_ROWS; i++) {
    rowsString += `
        <div class="row-guesses row-${i + 1}">
            <div class="letter col-1"></div>
            <div class="letter col-2"></div>
            <div class="letter col-3"></div>
            <div class="letter col-4"></div>
            <div class="letter col-5"></div>
        </div>
    `;
  }

  guessesContainer.innerHTML = rowsString;
};

const updateUI = function () {
  guessRowEl = document.querySelector(`.row-${row}`);
  guessColumnEl = guessRowEl.children[column - 1];
};

init();

// TODO: Separate the guesses and adding/removing letters

let preventDoubleClick = false;

keyboard.addEventListener('click', (e) => {
  // debugger;
  e.preventDefault();

  if (preventDoubleClick) return;
  preventDoubleClick = true;

  const letterEl = e.target;
  const dataset = letterEl.dataset.letter;

  if (!letterEl.hasAttribute('data-letter')) return;

  updateUI();

  // Adding letters
  if (column <= 5 && dataset !== 'backspace' && dataset !== 'enter') {
    if (guessColumnEl.textContent == '')
      guessColumnEl.append(letterEl.textContent);
    if (column < 5) column++;
  }

  // Removing letters
  if (dataset === 'backspace' && column >= 1) {
    guessColumnEl.innerHTML = '';
    if (column > 1) column--;
  }

  // Add 100ms cooldown between each click, backspace keeps firing twice for some reason
  setTimeout(() => (preventDoubleClick = false), 100);
});
