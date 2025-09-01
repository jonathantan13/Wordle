import words from './words.json' with { type: 'json' };

const guessesContainer = document.querySelector('.guesses-container');
const keyboard = document.querySelector('.keyboard');
const header = document.querySelector('.header');
const retryButton = document.querySelector('.retry-btn');

const GUESS_ROWS = 6;
const API_URL = '';

let row, column, guessRowEl, guessColumnEl, activeGame;

const init = function () {
  // Initial values
  row = 1;
  column = 1;
  activeGame = true;

  header.textContent = 'Welcome to wordle!';

  // Clear rows
  guessesContainer.innerHTML = '';

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

  guessesContainer.innerHTML = rowsString;

  Array.from(Array.from(keyboard.children)).forEach((row) =>
    Array.from(row.children).forEach((keyEl) => {
      if (
        keyEl.dataset.letter === 'enter' ||
        keyEl.dataset.letter === 'backspace'
      )
        return;
      keyEl.className = '';
    })
  );
};

const updateUI = function (row, column) {
  guessRowEl = document.querySelector(`.row-${row}`);
  guessColumnEl = guessRowEl.children[column - 1];
};

const updateRow = function () {
  if (row <= 6) row++;
  column = 1;
};

const updateKeyColor = function (letter, status) {
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

const compareGuess = function (wordArr) {
  // Temp word
  let word = 'blaze';
  const wordToArray = word.split('');
  const remaining = [...wordToArray];

  // Correct guess: exists and in correct position
  for (let i = 0; i < word.length; i++) {
    const letter = wordArr[i].textContent.toLowerCase()
    
    if (wordToArray[i] == letter) {
      wordArr[i].classList.add('correct-letter');
      remaining[i] = null;

      updateKeyColor(letter, 'correct');
    }
  }
  
  wordArr.map((el) => {
    const letterLowerCase = el.textContent.toLowerCase();
    
    // Correct guess: exists
    if (remaining.includes(letterLowerCase)) {
      el.classList.add('partial-correct');
      const index = remaining.indexOf(letterLowerCase);
      remaining[index] = null;

      updateKeyColor(letterLowerCase, 'partial');
    }
    // Wrong guess: does not exist
    else {
      el.classList.add('wrong-letter');
      updateKeyColor(letterLowerCase, 'wrong');
    }
  });

  if (
    wordArr
      .map((el) => el.textContent)
      .join('')
      .toLowerCase() === word
  ) {
    header.textContent = `You win! the word was ${word}`;
    activeGame = false;

    return;
  }

  if (row < 6) updateRow();
  else {
    header.textContent = `You lost! the word was ${word}`;
    activeGame = false;
  }
};

// const getWord = async function () {
//   try {
//     const res = await fetch(`${API_URL}/`);
//     const data = await res.json();

//     if (!res.ok) throw new Error();

//     return data;
//   } catch (err) {
//     console.error(err);
//   }
// };

init();

let preventDoubleClick = false;

keyboard.addEventListener('click', (e) => {
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

  updateUI(row, column);

  // Adding letters
  if (column <= 5 && letter !== 'backspace' && letter !== 'enter') {
    if (guessColumnEl.textContent == '')
      guessColumnEl.append(letterEl.textContent);
    if (column <= 5) column++;
  }

  // Removing letters
  if (letter === 'backspace' && column >= 1) {
    if (column > 1) column--;
    updateUI(row, column);
    guessColumnEl.innerHTML = '';
  }

  // Compare word and move onto next row
  const rowToArray = Array.from(guessRowEl.children);
  const rowToWord = rowToArray
    .map((el) => el.textContent)
    .join('')
    .toLowerCase();

  if (letter === 'enter' && rowToArray.every((el) => el.textContent !== '')) {
    // Checks if word exists
    if (!words.includes(rowToWord))
      header.textContent = `${
        rowToWord[0].toUpperCase() + rowToWord.slice(1)
      } does not exist!`;
    else compareGuess(rowToArray);
  }

  // Adds 100ms cooldown between each click; backspace keeps firing twice for some reason
  setTimeout(() => (preventDoubleClick = false), 100);
});

retryButton.addEventListener('click', init);
