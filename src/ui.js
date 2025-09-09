import * as elements from './elements.js';

const GUESS_ROWS = 6;

export const letters = [];
export let guessRowEl, guessColumnEl;

export const resetGuessUI = function () {
  elements.header.textContent = 'WORDLE';

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

export const updateUI = function (row, column) {
  guessRowEl = document.querySelector(`.row-${row}`);
  guessColumnEl = guessRowEl.children[column - 1];
};

export const updateKeyColor = function (letter, status) {
  const btn = document.querySelector(`[data-letter="${letter}"]`);

  switch (status) {
    case 'correct':
      btn.classList.add('correct-letter');
      break;
    case 'partial':
      btn.classList.add('partial-correct');
      break;
    case 'wrong':
      btn.classList.add('wrong-letter');
      break;
  }
};
