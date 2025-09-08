import words from '../5-letter-words.json' with { type: 'json' };

import * as UI from './ui.js';
import * as helpers from './helpers.js';
import * as elements from './elements.js';

let row, column, word, activeGame;

const state = {};

const init = function () {
  // Initial values
  row = 1;
  column = 1;
  activeGame = true;
  word = helpers.pickRandomWord();

  UI.resetGuessUI();
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

const guess = function (input) {
  UI.updateUI(row, column);

  // Adding letters
  if (column <= 5 && input !== 'backspace' && input !== 'enter') {
    if (UI.guessColumnEl.textContent == '')
      UI.guessColumnEl.append(input.toUpperCase());
    if (column <= 5) column++;
  }

  // Removing letters
  if (input === 'backspace' && column >= 1) {
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

  if (input === 'enter' && checkEmptyColumn) {
    // Checks if word exists
    if (!words.includes(rowToWord))
      elements.header.textContent = `${
        rowToWord[0].toUpperCase() + rowToWord.slice(1)
      } does not exist!`;
    else compareGuess(rowToArray);
  }
};

let preventDoubleClick = false;

// Clicking the keyboard on screen
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

  guess(letter);

  // Adds 50ms cooldown between each click - backspace keeps firing twice for some reason
  setTimeout(() => (preventDoubleClick = false), 50);
});

// Using your physical keyboard
document.addEventListener('keydown', (e) => {
  e.preventDefault();

  const key = e.key.toLowerCase();

  if (!UI.letters.includes(key) || !activeGame) return;

  guess(key);
});

elements.retryButton.addEventListener('click', init);
