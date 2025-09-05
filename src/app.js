import words from '../5-letter-words.json' with { type: 'json' };

import * as UI from './ui.js';
import * as helpers from './helpers.js';
import * as elements from './elements.js';

const GUESS_ROWS = 6;
const letters = [];

let row, column, word, activeGame;

const init = function () {
  // Initial values
  row = 1;
  column = 1;
  activeGame = true;
  word = helpers.pickRandomWord();

  elements.header.textContent = 'Welcome to wordle!';

  // Clear rows
  elements.guessesContainer.innerHTML = '';

  // Dynamically generate 6 rows
  let rowsString = '';

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

  elements.guessesContainer.innerHTML = rowsString;

  // Resets keyboard
  Array.from(Array.from(elements.keyboard.children)).forEach((row) =>
    Array.from(row.children).forEach((keyEl) => {
      // Make an array with all the possible inputs
      if (!letters.includes(keyEl.dataset.letter))
        letters.push(keyEl.dataset.letter);

      // Clear all styles on letters besides enter and backspace
      if (
        keyEl.dataset.letter === 'enter' ||
        keyEl.dataset.letter === 'backspace'
      )
        return;
      keyEl.className = '';
    })
  );
};

init();

const updateRow = function () {
  if (row <= 6) row++;
  column = 1;
};

const compareGuess = function (wordArr) {
  // Temp word
  const remaining = word.split('');

  // Correct guess: exists and in correct position
  for (let i = 0; i < word.length; i++) {
    const letter = wordArr[i].textContent.toLowerCase();

    if (word[i] == letter) {
      wordArr[i].classList.add('correct-letter');
      remaining[i] = null;

      UI.updateKeyColor(letter, 'correct');
    }
  }

  wordArr.map((el) => {
    const letterLowerCase = el.textContent.toLowerCase();

    // Correct guess: exists
    if (remaining.includes(letterLowerCase)) {
      el.classList.add('partial-correct');
      const index = remaining.indexOf(letterLowerCase);
      remaining[index] = null;

      UI.updateKeyColor(letterLowerCase, 'partial');
    }
    // Wrong guess: does not exist
    else {
      el.classList.add('wrong-letter');
      UI.updateKeyColor(letterLowerCase, 'wrong');
    }
  });

  const wordGuess = wordArr
    .map((el) => el.textContent)
    .join('')
    .toLowerCase();

  if (wordGuess === word) {
    elements.header.textContent = `You win! the word was ${word}`;
    activeGame = false;

    return;
  }

  if (row < 6) updateRow();
  else {
    elements.header.textContent = `You lost! the word was ${word}`;
    activeGame = false;
  }
};

let preventDoubleClick = false;

elements.keyboard.addEventListener('click', (e) => {
  e.preventDefault();

  const letterEl = e.target;
  const letter = letterEl.dataset.letter;

  if (
    !letterEl.hasAttribute('data-letter') ||
    !activeGame ||
    preventDoubleClick
  )
    return;
  preventDoubleClick = true;

  UI.updateUI(row, column);

  // Adding letters
  if (column <= 5 && letter !== 'backspace' && letter !== 'enter') {
    if (UI.guessColumnEl.textContent == '')
      UI.guessColumnEl.append(letterEl.textContent);
    if (column <= 5) column++;
  }

  // Removing letters
  if (letter === 'backspace' && column >= 1) {
    if (column > 1) column--;
    UI.updateUI(row, column);
    UI.guessColumnEl.innerHTML = '';
  }

  // Compare word and move onto next row
  const rowToArray = Array.from(UI.guessRowEl.children);
  const rowToWord = rowToArray
    .map((el) => el.textContent)
    .join('')
    .toLowerCase();
  const checkEmptyColumn = rowToArray.every((el) => el.textContent !== '');

  if (letter === 'enter' && checkEmptyColumn) {
    // Checks if word exists
    if (!words.includes(rowToWord))
      elements.header.textContent = `${
        rowToWord[0].toUpperCase() + rowToWord.slice(1)
      } does not exist!`;
    else compareGuess(rowToArray);
  }

  // Adds 50ms cooldown between each click - backspace keeps firing twice for some reason
  setTimeout(() => (preventDoubleClick = false), 50);
});

document.addEventListener('keydown', (e) => {
  e.preventDefault();

  const key = e.key.toLowerCase();

  if (!letters.includes(key) || !activeGame) return;

  UI.updateUI(row, column);

  // Adding letters
  if (column <= 5 && key !== 'backspace' && key !== 'enter') {
    if (UI.guessColumnEl.textContent == '')
      UI.guessColumnEl.append(key.toUpperCase());
    if (column <= 5) column++;
  }

  // Removing letters
  if (key === 'backspace' && column >= 1) {
    if (column > 1) column--;
    UI.updateUI(row, column);
    UI.guessColumnEl.innerHTML = '';
  }

  // Compare word and move onto next row
  const rowToArray = Array.from(UI.guessRowEl.children);
  const rowToWord = rowToArray
    .map((el) => el.textContent)
    .join('')
    .toLowerCase();
  const checkEmptyColumn = rowToArray.every((el) => el.textContent !== '');

  if (key === 'enter' && checkEmptyColumn) {
    // Checks if word exists
    if (!words.includes(rowToWord))
      elements.header.textContent = `${
        rowToWord[0].toUpperCase() + rowToWord.slice(1)
      } does not exist!`;
    else compareGuess(rowToArray);
  }
});

elements.retryButton.addEventListener('click', init);
console.log(letters);
