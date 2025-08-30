'use strict';

const guessesContainer = document.querySelector('.guesses-container');
const keyboard = document.querySelector('.keyboard');

const GUESS_ROWS = 6;
let row;
let column;

let guessRowEl, guessColumnEl;

const init = function () {
  row = 1;
  column = 1;

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

const updateRow = function () {
  if (row <= 6) row++;
  column = 1;
};

const compareGuess = function () {
  // Pass in both the player's guess and the word
  // Loop over player's guess array and compare each letter
  // 1. If the letter isn't in the word, give it the wrong-letter class
  // 2. If the letter is in the word but in the wrong position, give it the partial-correct class
  // 3. If the letter is in the word and in the correct position, give it the correct-letter class
};

init();

let preventDoubleClick = false;

keyboard.addEventListener('click', (e) => {
  // debugger;
  e.preventDefault();

  if (preventDoubleClick) return;
  preventDoubleClick = true;

  const letterEl = e.target;
  const letter = letterEl.dataset.letter;

  if (!letterEl.hasAttribute('data-letter')) return;

  updateUI();

  // Adding letters
  if (column <= 5 && letter !== 'backspace' && letter !== 'enter') {
    if (guessColumnEl.textContent == '')
      guessColumnEl.append(letterEl.textContent);
    if (column < 5) column++;
  }

  // Removing letters
  if (letter === 'backspace' && column >= 1) {
    guessColumnEl.innerHTML = '';
    if (column > 1) column--;
  }

  // Compare word and move onto next row
  const rowToArray = Array.from(guessRowEl.children);

  if (letter === 'enter' && rowToArray.every((el) => el.textContent !== '')) {
    // Working on this once I set up a word fetching system
    compareGuess(rowToArray);

    updateRow();
  }

  // Adds 100ms cooldown between each click, backspace keeps firing twice for some reason
  setTimeout(() => (preventDoubleClick = false), 100);
});
