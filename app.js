const guessesContainer = document.querySelector('.guesses-container');
const keyboard = document.querySelector('.keyboard');

const GUESS_ROWS = 6;

let rowsString = '';

for (let i = 0; i < GUESS_ROWS; i++) {
  rowsString += `
        <div class="row-guesses row-${i + 1}">
          <div class="letter"></div>
          <div class="letter"></div>
          <div class="letter"></div>
          <div class="letter"></div>
          <div class="letter"></div>
        </div>
    `;
}

guessesContainer.innerHTML = rowsString;
